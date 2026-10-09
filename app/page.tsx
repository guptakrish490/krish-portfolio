"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { ArrowUpRight, ChevronDown, Github, Linkedin, Menu, X, Code2, Mail, Download } from "lucide-react";
import { projects } from "./projects-data";
import "./refactor.css";
import "./atmosphere.css";
import "./scroll-traces.css";
import "./identity-scene.css";
import "./project-cards.css";
import "./portfolio-tweaks.css";

const SystemScene = dynamic(() => import("./components/SystemScene"), { ssr:false, loading:()=> <div className="scene-loading">CORE OFFLINE / INITIALIZING</div> });
const DungeonGate = dynamic(() => import("./components/SystemScene").then((module) => module.DungeonGate), { ssr:false });
const tracks = [
 {id:"BACKEND",title:"API DESIGN",detail:"Building maintainable APIs with TypeScript, Node.js, and Fastify."},
 {id:"DATA",title:"DATABASES",detail:"Working with PostgreSQL transactions and locking, alongside MongoDB-backed application data."},
 {id:"RELIABILITY",title:"WORKER SYSTEMS",detail:"Exploring retries, worker ownership, leases, and stale-job recovery through FlowForge."},
 {id:"FOUNDATIONS",title:"ENGINEERING FUNDAMENTALS",detail:"Strengthening data-structures and algorithms foundations and learning to reason about system design."}
];
const journey = [
 ["01","HTML, CSS & JAVASCRIPT","Started with the building blocks of the web: structuring pages, styling interfaces, and making them interactive."],
 ["02","MERN & CRUD APPLICATIONS","Moved into full-stack apps and learned how interfaces, APIs, and persistent data fit together."],
 ["03","DSA & PROGRAMMING","Built problem-solving fundamentals alongside application development."],
 ["04","TYPESCRIPT & SQL","Added type safety and relational data querying to the toolkit."],
 ["05","BACKEND ARCHITECTURE / FIRST PRINCIPLES","Started looking beneath frameworks at how backend components and data flows work."],
 ["06","BACKEND-FOCUSED PROJECTS","Applied that interest in projects involving APIs, databases, job processing, and worker reliability."],
 ["07","EXPLORING BACKEND / CURRENT","Continuing to explore backend topics through focused projects and deliberate study."]
];
const timelineEvents = [
 {date:"JAN–FEB 2026",title:"STUDYSHELF / FIRST WEB BUILD",detail:"Built a browser-based study-resource organizer with subject and category management, search, and localStorage persistence."},
 {date:"JUN–JUL 2026",title:"DEVTRACK PRO / FULL-STACK RELEASE",detail:"Shipped a developer productivity platform with 14+ REST APIs, authenticated goal/project/task workflows, activity tracking, and a deployed Vercel–Render–MongoDB Atlas stack."},
 {date:"SEP 2026",title:"COGNILAB / BIT N BUILD ’26",detail:"Built and deployed a psychology research platform with a team during a 6-hour hackathon. Participants join without accounts; browser calibration informs a reliability score and results use anonymous participant codes."},
 {date:"SEP–OCT 2026",title:"FLOWFORGE / SYSTEMS",detail:"Built a fault-tolerant async job processor using PostgreSQL locking, worker leases, and stale-job recovery. The resume benchmark records 5,000 jobs in ~12.04 seconds (~415 jobs/sec), versus a ~1,511.8-second single-worker baseline."},
 {date:"COMMUNITY",title:"OPEN SOURCE / IOTA",detail:"Merged a freeCodeCamp Node.js curriculum contribution clarifying globalThis; also contributed to the IOTA club website and its deployment."},
 {date:"ONGOING",title:"DSA / PRACTICE",detail:"Solved 210+ LeetCode problems. Currently learning Dynamic Programming and graph algorithms, alongside continued practice of core data structures and patterns."}
];

function useScrollProgress(id:string){
 const [progress,setProgress]=useState(0);
 useEffect(()=>{
   let frame=0;
   const update=()=>{
     cancelAnimationFrame(frame);
     frame=requestAnimationFrame(()=>{
       const element=document.getElementById(id); if(!element) return;
       const rect=element.getBoundingClientRect();
       const start=window.innerHeight*0.72;
       const endMargin=window.innerHeight*0.28;
       const total=rect.height+start-endMargin;
       const next=Math.max(0,Math.min(1,(start-rect.top)/total));
       setProgress(current=>Math.abs(current-next)<0.004?current:next);
     });
   };
   update(); window.addEventListener("scroll",update,{passive:true}); window.addEventListener("resize",update);
   return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",update);window.removeEventListener("resize",update);};
 },[id]);
 return progress;
}

export default function Home(){
 const [boot,setBoot]=useState(true),[menu,setMenu]=useState(false),[tab,setTab]=useState("featured"),[open,setOpen]=useState<string|null>(null);
 const journeyProgress=useScrollProgress("journey");
 const logProgress=useScrollProgress("log");
 useEffect(()=>{const t=setTimeout(()=>setBoot(false),2800);return()=>clearTimeout(t)},[]); const shown=projects.filter(p=>tab==="all"||p.type===tab);
 return <main className="refactor-shell"><div className="atmosphere-layer" aria-hidden="true"><SystemScene/></div>{boot&&<div className="cinematic-boot"><div className="boot-glyph">KG</div><p>PORTFOLIO LOADED / PROFILE READY</p><h2>KRISH GUPTA</h2><div className="boot-progress"><i/></div><small>SOFTWARE DEVELOPMENT · BACKEND ENGINEERING</small></div>}
 <nav className="fixed-nav"><a className="nav-name" href="#top">KRISH GUPTA<span> / SOFTWARE ENGINEERING</span></a><div className={menu?"nav-menu show":"nav-menu"}>{[["ABOUT","profile"],["JOURNEY","journey"],["PROJECTS","quests"],["SKILLS","arsenal"],["CONTACT","contact"]].map(([a,b])=><a href={`#${b}`} key={a} onClick={()=>setMenu(false)}>{a}</a>)}</div><button className="nav-mobile" onClick={()=>setMenu(!menu)} aria-label="Toggle navigation">{menu?<X/>:<Menu/>}</button></nav>
 <div className="edge-hud left">PORTFOLIO<br/><span>ONLINE</span></div><div className="edge-hud right">BACKEND<br/><span>ENGINEERING</span></div>
 <section className="hero-new" id="top"><div className="hero-new-copy"><div className="sys-label"><i/> PORTFOLIO LOADED / DEVELOPER PROFILE</div><div className="hero-identity">KRISH GUPTA</div><h1>Building systems.<br/><em>Making them reliable.</em></h1><p>Software developer focused on backend systems, dependable infrastructure, and thoughtful product engineering.</p><div className="hero-buttons"><a className="primary-button" href="#quests">EXPLORE MY WORK <ArrowUpRight size={15}/></a><a className="secondary-button resume-download" href="/Krish_Gupta_Resume.pdf" download="Krish_Gupta_Resume.pdf" type="application/pdf"><Download size={15}/> DOWNLOAD RESUME</a><a className="secondary-button" href="mailto:guptakrish490@gmail.com"><Mail size={15}/> CONTACT</a><a className="secondary-button" href="https://github.com/guptakrish490" target="_blank" rel="noreferrer">VIEW GITHUB <Github size={15}/></a></div><div className="hero-facts"><span><b>FOCUS</b>Backend &amp; systems</span><span><b>PROBLEM SOLVING</b><strong>210+ LEETCODE</strong></span></div></div><div className="hero-new-visual"><div className="figure-scene" aria-label="Krish Gupta standing before a luminous, particle-filled technical portal"><div className="figure-aura"/><div className="dungeon-gate" aria-hidden="true"><DungeonGate/></div><div className="figure-shadow"/><div className="stage-platform"><i/><i/><b/></div><Image className="awakened-portrait" src="/krish-awakened.png" width={1024} height={1024} priority sizes="(max-width: 520px) 90vw, (max-width: 850px) 70vw, 45vw" alt="Portrait of Krish Gupta"/><div className="identity-plaque"><span>DEVELOPER PROFILE</span><strong>KRISH GUPTA</strong></div><div className="visual-readout">BACKEND ENGINEERING<br/><span>TECHNICAL PROJECTS</span></div></div></div></section>
 <section className="profile-panel" id="profile"><div className="panel-title">01 / ABOUT</div><div className="profile-layout"><div><h2>Curious about what<br/><em>happens underneath.</em></h2><p>I began with web development and grew interested in the systems behind products: data, reliability, architecture and performance.</p><p>I build to understand how software behaves under real constraints, and I’m especially drawn to backend engineering and dependable systems.</p></div><div className="status-window"><div className="window-bar"><span>PROFILE / EDUCATION</span><b>● BUILDING</b></div><div className="profile-head"><Image src="/krish-gupta.jpg" width={54} height={54} sizes="54px" alt="Krish Gupta"/><div><strong>KRISH GUPTA</strong><small>SOFTWARE DEVELOPER</small></div></div>{[["EDUCATION","BTECH · COMPUTER SCIENCE"],["INSTITUTE","IIIT SRI CITY"],["CURRENT STANDING","3RD SEMESTER"],["CGPA","8.35 / 10"]].map(([a,b])=><div className="window-stat" key={a}><span>{a}</span><b>{b}</b></div>)}</div></div></section>
 <section className="journey-panel" id="journey"><div className="panel-title">02 / JOURNEY</div><div className="journey-intro"><h2>Progression is<br/><em>a practice.</em></h2><p>A vertical path from building interfaces to understanding the systems behind them.</p></div><div className="vertical-path" style={{"--journey-progress":journeyProgress} as CSSProperties}>{journey.map(([n,t,d],i)=><button className={`path-step ${journeyProgress>=i/journey.length?"lit":""}`} key={n}><i>{n}</i><span><strong>{t}</strong><small>{d}</small></span>{i<journey.length-1&&<b/>}</button>)}</div></section>
 <section className="quests-panel" id="quests"><div className="panel-title">03 / PROJECTS</div><div className="quests-head"><div><h2>Work with<br/><em>evidence.</em></h2><p>Featured systems first. Supporting builds below.</p></div><div className="quest-tabs"><button className={tab==="all"?"active":""} onClick={()=>setTab("all")}>VIEW ALL</button><button className={tab==="featured"?"active":""} onClick={()=>setTab("featured")}>FEATURED</button><button className={tab==="other"?"active":""} onClick={()=>setTab("other")}>OTHER PROJECTS</button><a className="all-projects-link" href="https://github.com/guptakrish490?tab=repositories" target="_blank" rel="noreferrer">ALL GITHUB PROJECTS <ArrowUpRight size={13}/></a></div></div><div className="quest-grid">{shown.map(p=><article className={`quest-card ${p.id==="01"?"featured-card":""}`} key={p.id}><div className="card-rank">PROJECT {p.id} <span>{p.rank}</span></div><h3>{p.name}</h3><h4>{p.sub}</h4><p>{p.text}</p><div className="tech-row">{p.tech.map(t=><span key={t}>{t}</span>)}</div><button className="dossier-button" onClick={()=>setOpen(open===p.id?null:p.id)}>{open===p.id?"CLOSE DETAILS":"VIEW DETAILS"}<ChevronDown className={open===p.id?"flip":""} size={15}/></button>{open===p.id&&<div className="dossier">{p.id==="01"&&<div className="flow-architecture" aria-label="FlowForge architecture: client sends jobs to the Fastify API, PostgreSQL holds queue state, and workers claim jobs and process them"><span>ARCHITECTURE OVERVIEW</span><div className="architecture-nodes"><b>CLIENT</b><i>→</i><b>FASTIFY API</b><i>→</i><b>POSTGRESQL JOB QUEUE</b><i>→</i><b>WORKER PROCESSES</b></div><small>Atomic claims · lease-based recovery · ownership-aware updates</small></div>}{p.detail.map(x=><p key={x}><i/> {x}</p>)}{p.benchmark&&<strong className="benchmark-line">{p.benchmark}</strong>}<div className="dossier-links"><a href={p.repo} target="_blank" rel="noreferrer">VIEW SOURCE <ArrowUpRight size={13}/></a>{p.demo&&<a href={p.demo} target="_blank" rel="noreferrer">LIVE DEMO <ArrowUpRight size={13}/></a>}</div></div>}</article>)}</div></section>
 <section className="arsenal-panel" id="arsenal"><div className="panel-title">04 / SKILLS</div><div className="arsenal-layout"><h2>Tools for<br/><em>thinking.</em></h2><div className="arsenal-groups">{[["LANGUAGES","C · C++ · JavaScript · TypeScript · SQL"],["FRONTEND","React · HTML5 · CSS3 · Tailwind CSS"],["BACKEND","Node.js · Fastify · Express · REST APIs"],["DATABASES","PostgreSQL · MongoDB"],["TOOLS","Git · GitHub · VS Code · Postman"]].map(([a,b])=><div key={a}><span>{a}</span><b>{b}</b></div>)}</div></div><div className="explore-meter"><span>AREAS I’M EXPLORING</span><b>BACKEND ARCHITECTURE / POSTGRESQL / CONCURRENCY / SYSTEM DESIGN</b></div></section>
 <section className="training-panel"><div className="panel-title">05 / PROBLEM SOLVING</div><div className="training-layout"><div><h2>Practice with<br/><em>purpose.</em></h2><p>Consistent algorithm practice sharpens the fundamentals behind good engineering.</p></div><div className="training-cards"><div><strong>210<span>+</span></strong><small>LEETCODE PROBLEMS SOLVED</small><a href="https://leetcode.com/u/MjsIZ2lfL7/" target="_blank" rel="noreferrer">OPEN PROFILE <ArrowUpRight size={12}/></a></div><div><strong>DP + GRAPH</strong><small>CURRENT LEARNING</small><span className="training-card-note">DYNAMIC PROGRAMMING &amp; GRAPH ALGORITHMS / PRACTICING</span></div></div></div><div className="dsa-categories">{[{name:"PROBLEM-SOLVING PATTERNS",topics:"Arrays · hashing · two pointers · sliding window · binary search",status:"COMFORTABLE"},{name:"DATA STRUCTURES",topics:"Linked lists · stacks · queues · trees",status:"COMFORTABLE"},{name:"CURRENT LEARNING",topics:"Dynamic Programming · graph algorithms · BFS · DFS · topological sorting",status:"PRACTICING"}].map(({name,topics,status})=><article key={name}><div><span>{name}</span><b>{status}</b></div><p>{topics}</p></article>)}</div></section>
 <section className="log-panel" id="log"><div className="panel-title">06 / DEVELOPMENT LOG</div><div className="log-window"><div className="log-scroll"><span>PROJECT LOG / CHECKPOINTS</span><div className="log-events" style={{"--trace-progress":logProgress} as CSSProperties}>{timelineEvents.map(({date,title,detail},i)=><article className={`log-event ${logProgress>=(i+1)/timelineEvents.length?"lit":""}`} key={title}><i/><small>{date} / {title}</small><p>{detail}</p></article>)}</div></div></div></section>
 <section className="current-panel" id="current"><div className="panel-title">07 / ENGINEERING FOCUS</div><div className="current-head"><h2>Build for<br/><em>the real world.</em></h2><span>AREAS OF FOCUS</span></div><div className="track-grid">{tracks.map(({id,title,detail})=><article className="quest-track" key={id}><div><small>{id}</small></div><h3>{title}</h3><p>{detail}</p></article>)}</div></section>
 <footer className="contact-panel" id="contact"><div className="panel-title">08 / CONTACT</div><div className="contact-layout"><div><h2>Let’s build<br/><em>something real.</em></h2><p>Open to conversations around backend engineering, systems, open source and interesting problems.</p></div><div className="contact-links"><a href="mailto:guptakrish490@gmail.com"><Mail/> EMAIL <span>CONTACT KRISH</span><ArrowUpRight/></a><a href="https://github.com/guptakrish490" target="_blank" rel="noreferrer"><Github/> GITHUB <span>@guptakrish490</span><ArrowUpRight/></a><a href="https://www.linkedin.com/in/krish-gupta-0a937a386" target="_blank" rel="noreferrer"><Linkedin/> LINKEDIN <span>CONNECT</span><ArrowUpRight/></a><a href="https://leetcode.com/u/MjsIZ2lfL7/" target="_blank" rel="noreferrer"><Code2/> LEETCODE <span>210+ PROBLEMS</span><ArrowUpRight/></a></div></div><div className="footer-line">KRISH GUPTA / SOFTWARE DEVELOPMENT / BUILD &gt; LEARN</div></footer>
 </main>
}
