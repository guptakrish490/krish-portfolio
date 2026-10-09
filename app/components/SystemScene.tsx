"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const portalVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const portalFragment = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uPointer;
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  float fbm(vec2 p) {
    float value = 0.0, amplitude = 0.5;
    for (int i = 0; i < 4; i++) { value += noise(p) * amplitude; p *= 2.02; amplitude *= 0.5; }
    return value;
  }
  void main() {
    vec2 p = vec2((vUv.x - 0.5) * 0.94, (vUv.y - 0.51) * 1.08) - uPointer * 0.018;
    float radius = length(p);
    float time = uTime * 0.22;
    float twist = time * 0.9 + radius * 5.5;
    mat2 rotation = mat2(cos(twist), -sin(twist), sin(twist), cos(twist));
    vec2 flow = rotation * p;
    float cloud = fbm(flow * 13.0 + vec2(time * 0.7, -time * 0.42));
    float cloud2 = fbm(flow * 24.0 - vec2(time * 0.35, time * 0.58));
    float edge = 0.39 + (cloud - 0.48) * 0.07 + sin(p.x * 13.0 + p.y * 9.0 + time) * 0.009;
    float softHalo = exp(-pow((radius - edge) * 4.2, 2.0));
    float portalCloud = 1.0 - smoothstep(edge - 0.17, edge + 0.2, radius);
    float core = exp(-radius * radius * 8.0);
    vec3 deep = vec3(0.025, 0.09, 0.28);
    vec3 blue = vec3(0.04, 0.24, 0.58);
    vec3 cyan = vec3(0.11, 0.48, 0.72);
    vec3 color = mix(deep, blue, clamp(cloud * 1.5, 0.0, 1.0));
    color = mix(color, cyan, clamp(cloud2 * 0.35 + softHalo * 0.38, 0.0, 0.75));
    float alpha = clamp(portalCloud * (0.035 + cloud * 0.065) + softHalo * (0.035 + cloud2 * 0.045) + core * 0.055, 0.0, 0.18);
    gl_FragColor = vec4(color * alpha, alpha);
  }
`;

const sparkVertex = `
  attribute float aSize;
  attribute float aSeed;
  uniform float uTime;
  varying float vAlpha;
  varying float vSeed;
  void main() {
    vec3 p = position;
    float radius = length(p.xy);
    float angle = atan(p.y, p.x) + uTime * (0.13 + 0.23 / (radius + 0.22));
    p.xy = vec2(cos(angle), sin(angle)) * radius;
    p.y += sin(uTime * 0.55 + p.x * 2.8 + aSeed * 6.283) * 0.055;
    vec4 viewPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = aSize * (220.0 / -viewPosition.z);
    vAlpha = (0.3 + 0.7 * aSeed) * (0.58 + 0.42 * sin(uTime * (0.7 + aSeed) + aSeed * 24.0));
    vSeed = aSeed;
  }
`;

const sparkFragment = `
  varying float vAlpha;
  varying float vSeed;
  void main() {
    float distanceToCenter = length(gl_PointCoord - 0.5);
    float halo = exp(-distanceToCenter * distanceToCenter * 16.0) * 0.24;
    float core = 1.0 - smoothstep(0.04, 0.24, distanceToCenter);
    vec3 color = mix(vec3(0.20, 0.54, 1.0), vec3(0.48, 0.92, 1.0), vSeed);
    gl_FragColor = vec4(color, (halo + core * 0.62) * vAlpha);
  }
`;

function PortalVortex() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef(new THREE.Vector2());
  const reducedMotion = useRef(false);
  useEffect(() => {
    const onMove = (event: PointerEvent) => pointer.current.set(event.clientX / window.innerWidth * 2 - 1, 1 - event.clientY / window.innerHeight * 2);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = motion.matches;
    const onMotion = () => { reducedMotion.current = motion.matches; };
    window.addEventListener("pointermove", onMove, { passive: true });
    motion.addEventListener("change", onMotion);
    return () => { window.removeEventListener("pointermove", onMove); motion.removeEventListener("change", onMotion); };
  }, []);
  useFrame((state) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value = reducedMotion.current ? 0 : state.clock.elapsedTime;
    if (reducedMotion.current) pointer.current.set(0, 0);
    material.current.uniforms.uPointer.value.lerp(pointer.current, 0.025);
  });
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uPointer: { value: new THREE.Vector2() } }), []);
  return <mesh position={[0, 0, -0.2]}>
    <planeGeometry args={[5.1, 6.0]} />
    <shaderMaterial ref={material} vertexShader={portalVertex} fragmentShader={portalFragment} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
  </mesh>;
}

function GateSparks() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const reducedMotion = useRef(false);
  const geometry = useMemo(() => {
    const count = 960;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const random = (value: number) => {
        const sample = Math.sin(value * 127.1 + 311.7) * 43758.5453;
        return sample - Math.floor(sample);
      };
      const seed = random(i + 1);
      const seed2 = random(i + 97);
      const seed3 = random(i + 211);
      const followsSpiral = i < count * 0.78;
      const arm = i % 4;
      const progress = followsSpiral ? seed : seed2;
      const angle = followsSpiral
        ? progress * Math.PI * 3.8 + arm * Math.PI * 0.5 + (seed2 - 0.5) * 0.22
        : seed * Math.PI * 2;
      const radius = followsSpiral
        ? 0.18 + progress * 1.72 + (seed3 - 0.5) * 0.12
        : 0.65 + seed3 * 1.35;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 1.16;
      positions[i * 3 + 2] = (seed2 - 0.5) * 0.45;
      sizes[i] = 0.035 + seed3 * 0.075;
      seeds[i] = seed;
    }
    const result = new THREE.BufferGeometry();
    result.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    result.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    result.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    return result;
  }, []);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = motion.matches;
    const onMotion = () => { reducedMotion.current = motion.matches; };
    motion.addEventListener("change", onMotion);
    return () => motion.removeEventListener("change", onMotion);
  }, []);
  useFrame((state) => {
    if (material.current) material.current.uniforms.uTime.value = reducedMotion.current ? 0 : state.clock.elapsedTime;
  });
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  return <points geometry={geometry}>
    <shaderMaterial ref={material} vertexShader={sparkVertex} fragmentShader={sparkFragment} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
  </points>;
}

export function DungeonGate() {
  return <Canvas orthographic camera={{ position: [0, 0, 8], zoom: 100 }} dpr={[1, 1.4]} gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}>
    <PortalVortex />
    <GateSparks />
  </Canvas>;
}

const fogVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fogFragment = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uPointer;
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p); f = f*f*(3.0-2.0*f);
    return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),f.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),f.x),f.y);
  }
  float fbm(vec2 p) {
    float value = 0.0; float amplitude = 0.5;
    for (int i=0; i<5; i++) { value += noise(p)*amplitude; p *= 2.03; amplitude *= 0.5; }
    return value;
  }
  void main() {
    vec2 p = vUv;
    p.x *= 1.7;
    p += uPointer * 0.055;
    float time = uTime * 0.035;
    float n = fbm(p*3.0 + vec2(time,-time*0.7));
    float n2 = fbm(p*5.0 - vec2(time*0.5,time));
    float veil = smoothstep(0.40,0.82,n*0.72+n2*0.28);
    float left = exp(-dot((vUv-vec2(0.22,0.54))*vec2(1.0,1.35),(vUv-vec2(0.22,0.54))*vec2(1.0,1.35))*8.0);
    float right = exp(-dot((vUv-vec2(0.83,0.36))*vec2(1.0,1.2),(vUv-vec2(0.83,0.36))*vec2(1.0,1.2))*7.0);
    float cloud = veil * (left*0.8 + right*0.72) * 0.34;
    vec3 violet = vec3(0.20,0.13,0.48);
    vec3 cyan = vec3(0.08,0.30,0.34);
    vec3 color = mix(violet,cyan,clamp(vUv.x*0.85 + n*0.25,0.0,1.0));
    gl_FragColor = vec4(color,cloud);
  }
`;

function PointerFog() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef(new THREE.Vector2());
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.set(event.clientX / window.innerWidth * 2 - 1, 1 - event.clientY / window.innerHeight * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  useFrame((state) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value = state.clock.elapsedTime;
    material.current.uniforms.uPointer.value.lerp(pointer.current, 0.035);
  });
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uPointer: { value: new THREE.Vector2() } }), []);
  return <mesh position={[0,0,-8]}>
    <planeGeometry args={[32,20]}/>
    <shaderMaterial ref={material} vertexShader={fogVertex} fragmentShader={fogFragment} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending}/>
  </mesh>;
}

function WavingNet() {
  const mesh = useRef<THREE.LineSegments>(null);
  const pointer = useRef(new THREE.Vector2());
  const reducedMotion = useRef(false);
  const geometry = useMemo(() => {
    const columns=48, rows=30, width=26, height=16;
    const coords: number[]=[]; const indices: number[]=[];
    const random=(a:number,b:number)=>{const value=Math.sin(a*127.1+b*311.7)*43758.5453;return value-Math.floor(value);};
    for(let row=0;row<rows;row++) for(let col=0;col<columns;col++) {
      const u=col/(columns-1), v=row/(rows-1);
      const edge=col===0||row===0||col===columns-1||row===rows-1?0:1;
      const x=(u-.5)*width+Math.sin(v*7.4+u*1.6)*.12*edge+Math.sin(v*2.8-u*4.1)*.055*edge+(random(col,row)-.5)*.045*edge;
      const y=(v-.5)*height+Math.sin(u*6.8-v*1.3)*.11*edge+Math.cos(u*3.2+v*4.3)*.05*edge+(random(row+91,col+37)-.5)*.04*edge;
      coords.push(x,y,0);
    }
    for(let row=0;row<rows;row++) for(let col=0;col<columns;col++) {
      const a=row*columns+col;
      if(col<columns-1) indices.push(a,a+1);
      if(row<rows-1) indices.push(a,a+columns);
    }
    const geo=new THREE.BufferGeometry();
    geo.setAttribute("position",new THREE.Float32BufferAttribute(coords,3));
    geo.setIndex(indices);
    const positions = geo.attributes.position as THREE.BufferAttribute;
    const base = new Float32Array(positions.array as ArrayLike<number>);
    const colors: number[] = [];
    const violet = new THREE.Color("#806bdf");
    const aqua = new THREE.Color("#69cbd0");
    for (let i=0;i<positions.count;i++) {
      const mix = THREE.MathUtils.smoothstep(positions.getX(i),-12,12)*0.7 + (Math.sin(positions.getY(i)*0.42)+1)*0.12;
      const color = violet.clone().lerp(aqua,THREE.MathUtils.clamp(mix,0,1));
      colors.push(color.r,color.g,color.b);
    }
    geo.setAttribute("color",new THREE.Float32BufferAttribute(colors,3));
    geo.userData.basePositions = base;
    return geo;
  },[]);
  useEffect(() => {
    const onMove = (event: PointerEvent) => pointer.current.set(event.clientX/window.innerWidth*2-1,1-event.clientY/window.innerHeight*2);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = motion.matches;
    const onMotion = () => { reducedMotion.current = motion.matches; };
    window.addEventListener("pointermove",onMove,{passive:true});
    motion.addEventListener("change",onMotion);
    return () => { window.removeEventListener("pointermove",onMove); motion.removeEventListener("change",onMotion); };
  },[]);
  useFrame((state) => {
    if (!mesh.current) return;
    const positions = geometry.attributes.position as THREE.BufferAttribute;
    const base = geometry.userData.basePositions as Float32Array;
    const time = reducedMotion.current ? 0 : state.clock.elapsedTime;
    const px = pointer.current.x*12.2, py = pointer.current.y*7.2;
    for (let i=0;i<positions.count;i++) {
      const x=base[i*3], y=base[i*3+1];
      const distance=Math.hypot(x-px,y-py);
      const broadWarp=Math.sin(x*0.13-y*0.17+time*0.16)*0.9;
      const swellPhase=x*0.29+y*0.13+broadWarp-time*0.46;
      const crossPhase=y*0.38-x*0.19+Math.sin(x*0.12+time*0.12)*0.55+time*0.28;
      const diagonalPhase=(x+y)*0.22-Math.sin(y*0.18-time*0.14)*0.65-time*0.18;
      const swell=Math.sin(swellPhase)*0.72+Math.sin(crossPhase)*0.29+Math.sin(diagonalPhase)*0.17;
      const cursorRipple=Math.exp(-distance*0.14)*Math.sin(distance*1.18-time*1.1)*0.32;
      positions.setY(i,y+Math.sin(swellPhase)*0.17+Math.sin(crossPhase)*0.085);
      positions.setZ(i,swell+cursorRipple);
    }
    positions.needsUpdate=true;
    mesh.current.position.x=THREE.MathUtils.lerp(mesh.current.position.x,pointer.current.x*0.22,0.018);
    mesh.current.position.y=THREE.MathUtils.lerp(mesh.current.position.y,pointer.current.y*0.12,0.018);
  });
  return <lineSegments ref={mesh} geometry={geometry} position={[0,0,-3]}>
    <lineBasicMaterial vertexColors transparent opacity={0.27} depthWrite={false} blending={THREE.AdditiveBlending}/>
  </lineSegments>;
}

function StarField() {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(210*3);
    for(let i=0;i<210;i++) { values[i*3]=(Math.random()-.5)*25; values[i*3+1]=(Math.random()-.5)*15; values[i*3+2]=-1-Math.random()*5; }
    return values;
  },[]);
  useFrame((state,delta) => {
    if (!points.current) return;
    points.current.rotation.z=Math.sin(state.clock.elapsedTime*0.025)*0.015;
    points.current.position.y=Math.sin(state.clock.elapsedTime*0.12)*0.08;
    const material=points.current.material as THREE.PointsMaterial;
    material.opacity=0.3+Math.sin(state.clock.elapsedTime*0.45)*0.06;
  });
  return <points ref={points}>
    <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions,3]}/></bufferGeometry>
    <pointsMaterial color="#c0c7ff" size={0.035} transparent opacity={0.34} sizeAttenuation depthWrite={false}/>
  </points>;
}

export default function SystemScene() {
  return <Canvas className="global-scene" camera={{position:[0,0,10],fov:48}} dpr={[1,1.35]} gl={{antialias:true,alpha:true,powerPreference:"low-power"}}>
    <PointerFog/><WavingNet/><StarField/>
  </Canvas>;
}
