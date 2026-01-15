# Workflow Automation Frontend

Frontend application for an AI-powered, no-code workflow automation platform.  
This repository contains the user interface for designing, managing, and monitoring automated workflows powered by AI agents and knowledge bases.

---

## Overview

The Workflow Automation Frontend enables business users and operators to:

- Design workflows using a visual, no-code editor
- Configure AI-powered workflow nodes (classification, routing, generation, decision-making)
- Manage knowledge base content used by AI agents
- Monitor workflow execution, status, and errors in real time
- Review and intervene in workflows when human escalation is required

This repository focuses **only on the frontend layer**. Workflow execution, AI orchestration, and data persistence are handled by backend services.

---

## Core Features (MVP)

### Workflow Builder
- Visual workflow editor (nodes, edges, gateways)
- Support for common workflow patterns (sequence, branching, parallel paths)
- Configurable node settings and parameters
- Workflow validation before publishing

### AI Agent Configuration
- UI for defining AI agent roles and instructions
- Prompt template configuration (static instructions)
- Confidence thresholds and escalation rules
- Structured output mapping to workflow variables

### Knowledge Base Management
- Create, edit, and organize knowledge base articles
- Metadata management (category, tags, version, owner)
- Access control indicators (public, restricted, internal)
- Optimized content preparation for AI retrieval (RAG)

### Workflow Monitoring
- Real-time workflow execution status
- Step-by-step execution visibility
- Error and exception visualization
- Manual intervention and retry actions

---

## Architecture Context

This frontend integrates with the following backend capabilities:

- **Workflow Engine**: Executes workflow definitions and manages state
- **AI Agent Service**: Handles LLM calls, prompts, and decision logic
- **Knowledge Base Service**: Stores documents and supports semantic retrieval (RAG)
- **Async Job Processing**: Executes long-running or delayed workflow steps
- **Real-Time Updates**: WebSockets or SSE for execution progress

---

## Tech Stack (Planned)

- **Framework**: React + TypeScript
- **Workflow Editor**: React Flow (or equivalent)
- **State Management**: Zustand / Redux Toolkit
- **API Layer**: REST / GraphQL
- **Real-Time**: WebSockets or Server-Sent Events
- **Styling**: Tailwind CSS
- **Build Tooling**: Vite or Next.js

Final selections may evolve during MVP development.

---

## Project Structure (High-Level)

```text
src/
├─ components/        # Reusable UI components
├─ features/          # Domain features (workflows, agents, KB)
├─ pages/             # Application pages/views
├─ services/          # API clients and integrations
├─ stores/            # Global state management
├─ utils/             # Helpers and utilities
├─ types/             # Shared TypeScript types
└─ hooks/             # Custom React hooks
