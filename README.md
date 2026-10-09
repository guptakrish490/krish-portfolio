# Krish Gupta — Developer Portfolio

> A backend-focused Computer Science student building practical software and exploring the engineering behind reliable systems.

**Portfolio:** [Live Website](https://krishgupta-portfolio.vercel.app) · **GitHub:** [@guptakrish490](https://github.com/guptakrish490)

---

## Overview

This repository contains my personal developer portfolio, built to showcase my projects, technical interests, problem-solving journey, and progression toward backend engineering.

My focus is on building beyond basic CRUD applications — understanding API design, database systems, authentication, concurrency, reliability, and the architectural decisions that make software maintainable.

The portfolio brings together my projects, technical skills, data structures and algorithms practice, and current learning journey in one place.

## Featured Projects

### 1. FlowForge

**A database-backed asynchronous job processing system**

A backend engineering project focused on understanding reliable job execution, worker coordination, failure recovery, and throughput.

**Tech stack:** TypeScript · Node.js · Fastify · PostgreSQL

Areas explored:

* Atomic job claiming using PostgreSQL transactions and row-level locking.
* Worker ownership and lease-based recovery of stale jobs.
* Ownership-aware job status updates.
* Job lifecycle tracking and processing latency measurement.
* Benchmarking job-processing throughput.

[View Repository](https://github.com/guptakrish490/FlowForge)

### 2. CogniLab

**A browser-based behavioral experiment platform**

A team project developed during BIT N BUILD '26, designed to help researchers create experiments and share public participation links.

**Tech stack:** React · Node.js · MongoDB · Browser APIs

Highlights:

* Public experiment participation links.
* Browser, device, and network calibration.
* Reliability scoring before participation.
* Anonymous participant identification and experiment result collection.

[View Repository](https://github.com/guptakrish490/CogniLab) · [Live Demo](https://cognilab-sage.vercel.app)

### 3. DevTrack Pro

**A full-stack developer productivity platform**

A MERN application for organizing goals, projects, tasks, and activity while tracking progress through a dashboard.

**Tech stack:** React · Express · MongoDB · JWT · Zod

Highlights:

* Authenticated goal, project, and task workflows.
* Search, filtering, and pagination.
* Refresh-token sessions and HTTP-only cookies.
* Input validation, protected routes, and rate limiting.
* Activity tracking and dashboard analytics.

[View Repository](https://github.com/guptakrish490/DevTrack-Pro) · [Live Demo](https://devtrackpro.vercel.app)

### 4. StudyShelf

**A lightweight study resource organizer**

A browser-based application for organizing notes, assignments, previous-year questions, and other academic resources.

**Tech stack:** HTML · CSS · JavaScript · Local Storage

Highlights:

* Organize resources by subject and custom category.
* Create, edit, delete, and search resource entries.
* Persist resources in browser storage.

[View Repository](https://github.com/guptakrish490/studyshelf) · [Live Demo](https://lnkd.in/d6bkT6ZC)

---

## Tech Stack

The technologies I use across my projects include:

| Area                        | Technologies                           |
| --------------------------- | -------------------------------------- |
| Languages                   | C, C++, JavaScript, TypeScript         |
| Frontend                    | HTML, CSS, React, Next.js              |
| Backend                     | Node.js, Express, Fastify, REST APIs   |
| Databases                   | MongoDB, PostgreSQL                    |
| Authentication & Validation | JWT, HTTP-only cookies, Zod            |
| Tools                       | Git, GitHub, VS Code, Postman          |
| Problem Solving             | Data Structures & Algorithms, LeetCode |

This list reflects technologies used across my work and learning. My depth of experience varies by technology.

## Problem Solving & DSA

I regularly practice data structures and algorithms to strengthen problem-solving ability, algorithmic thinking, and coding fundamentals.

My learning includes:

* Arrays, strings, hashing, and linked lists.
* Stacks, queues, trees, and graphs.
* Recursion and backtracking.
* Binary search, greedy algorithms, and dynamic programming.
* Complexity analysis and optimization.

I also practice through coding contests and continue working on improving my approach to unfamiliar problems.

## Engineering Journey

My progression so far:

**Web Fundamentals → MERN Stack → Data Structures & Algorithms → TypeScript & PostgreSQL → Backend Architecture → Job Processing & Concurrency → System Design**

The goal is to understand not only how to build an application, but also how its components behave under failure, load, and changing requirements.

## What I'm Learning

* Designing maintainable backend services.
* PostgreSQL transactions, indexing, and concurrency control.
* Asynchronous job processing and worker coordination.
* Failure handling, retries, and recovery strategies.
* TypeScript for safer and more maintainable application code.
* System design fundamentals and performance measurement.

## Running This Portfolio Locally

### Prerequisites

* Node.js compatible with the project's dependencies.
* npm.

### Installation

```bash
git clone https://github.com/guptakrish490/krish-portfolio.git
cd krish-portfolio
npm install
```

### Start the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Available scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

Run these commands to develop, build, serve, lint, and type-check the project, respectively. The lint and type-check commands depend on the scripts configured in `package.json`.

## Project Structure

```text
krish-portfolio/
├── app/
│   ├── components/       # Reusable visual components
│   ├── page.tsx          # Main portfolio page
│   ├── layout.tsx        # Application layout and metadata
│   └── globals.css       # Global styling
├── public/               # Static assets
├── package.json          # Dependencies and scripts
├── package-lock.json     # Dependency lockfile
├── tsconfig.json         # TypeScript configuration
└── README.md
```

The exact structure may evolve as the portfolio is refactored.

## Design Principles

* **Project-first:** Show practical work rather than relying on a long list of technologies.
* **Engineering-focused:** Explain the problems being explored and the decisions behind implementations.
* **Responsive:** Aim for a usable experience across desktop and mobile screens.
* **Accessible:** Respect reduced-motion preferences and prioritize readable content.
* **Honest representation:** Distinguish implemented features from experiments, ongoing work, and future plans.

## Connect

I'm interested in backend engineering, software development internships, open-source contributions, and opportunities to learn from engineers building reliable software.

* **GitHub:** [github.com/guptakrish490](https://github.com/guptakrish490)
* **Portfolio:** [View here](https://krishgupta-portfolio.vercel.app/)
* **LinkedIn:** [Connect](https://www.linkedin.com/in/krish-gupta-0a937a386)

---

*Built with curiosity, consistency, and a focus on understanding how software works under the hood.*
