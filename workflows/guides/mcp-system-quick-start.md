# MCP System - Quick Start Guide

## System Overview
Centralized MCP management with one global .env file and simple profile switching.

## File Locations
- **Global credentials**: `~/.claude/.env.global` (ALL API keys here)
- **Profiles**: `~/.claude/mcp-profiles/` (basic, n8n, outreach, full)
- **Activator**: `~/.claude/activate-mcp-profile.py`

## Available API Keys
✅ OpenAI, Anthropic, N8N, Instantly (2), Apollo, LeadsRapidly, Airtable, Apify, Firecrawl, Twilio, Google Workspace

## Quick Activation Commands

### For AI Assistant:
- **"Enable N8N profile"** → `py ~/.claude/activate-mcp-profile.py n8n`
- **"Enable outreach profile"** → `py ~/.claude/activate-mcp-profile.py outreach`
- **"Enable basic profile"** → `py ~/.claude/activate-mcp-profile.py basic`
- **"Enable full profile"** → `py ~/.claude/activate-mcp-profile.py full`

### For User (double-click):
- `~/.claude/mcp-n8n.bat`
- `~/.claude/mcp-outreach.bat` 
- `~/.claude/mcp-basic.bat`
- `~/.claude/mcp-full.bat`

## Profile Contents
| Profile | MCP Servers | Best For |
|---------|-------------|----------|
| `basic` | Google + Obsidian | Daily work |
| `n8n` | N8N + Google + Obsidian | Automation |
| `outreach` | N8N + Google + Playwright | Cold outreach |
| `full` | All 7 servers | Everything |

## Auto-Detection Rules
- Cold Outreach project → Suggest outreach profile
- Automation project → Suggest n8n profile  
- Default → Suggest basic profile

## Quick Setup for New Projects
1. AI detects project type
2. AI runs: `py ~/.claude/activate-mcp-profile.py <profile>`
3. All credentials auto-loaded
4. MCP servers ready

**One command = full MCP setup with all your API keys ready.**