# {{PRODUCT_NAME}} - Product Requirements Document Template

{{TLDR_DESCRIPTION}}

<!-- Example with realistic mock data -->

# Task Management Dashboard

For busy project managers and team leads, build an integrated task management dashboard so they can track project progress, assign work, and meet deadlines efficiently.

---

## Users & Value

- **Primary user / persona:** Project managers and team leads in software companies (25-45 years old, managing 3-15 person teams)
- **Jobs-to-be-done (JTBD):**
  - When I start my workday, I want to see all critical tasks at a glance, so I can prioritize my team's daily activities.
  - When a project milestone approaches, I want to identify blocked tasks immediately, so I can resolve issues before they impact deadlines.

---

## Success Metrics

- **Primary Goal:** Reduce average project delivery time by 20% through better task visibility and coordination
- **Success Criteria:** Daily active users spend <5 minutes reviewing task status (target: 85% of users)

---

## Scope

| Must‑have (MVP) | Nice‑to‑have (Later) | Explicitly Out (Not now) |
| --------------- | -------------------- | ------------------------ |
| Task creation and assignment | Advanced reporting dashboard | Time tracking integration |
| Team member status updates | Custom workflow automation | Budget management |
| Project milestone tracking | Mobile app version | Client billing features |
| Basic notification system | Slack/Teams integration | Multi-company support |

- **Definition of Done (MVP):**
  - [ ] Users can create, assign, and update tasks with due dates
  - [ ] Project progress is visualized with completion percentages
  - [ ] Team members receive email notifications for new assignments

---

## Tech Stack

### Frontend:

- React 18 with TypeScript
- Material-UI for UI components  
- Tailwind CSS for styling
- Auth0 for user management

### Backend:

- Node.js Express API for task management
- SendGrid API for email notifications
- Redis for caching and session management
- AWS S3 for file attachments

### Database:

- PostgreSQL for user data and task metadata
- Redis cache for frequently accessed project data

<!-- Template structure for copying -->

---

## Template Structure

# {{PRODUCT_NAME}}

{{TLDR_DESCRIPTION}}

---

## Users & Value

- **Primary user / persona:** {{PRIMARY_USER_PERSONA}}
- **Jobs-to-be-done (JTBD):**
  - When {{SITUATION_1}}, I want {{MOTIVATION_1}}, so I can {{OUTCOME_1}}.
  - When {{SITUATION_2}}, I want {{MOTIVATION_2}}, so I can {{OUTCOME_2}}.

---

## Success Metrics

- **Primary Goal:** {{PRIMARY_GOAL}}
- **Success Criteria:** {{SUCCESS_CRITERIA}} (target: {{TARGET_VALUE}})

---

## Scope

| Must‑have (MVP) | Nice‑to‑have (Later) | Explicitly Out (Not now) |
| --------------- | -------------------- | ------------------------ |
| {{MVP_FEATURE_1}} | {{NICE_TO_HAVE_1}} | {{OUT_OF_SCOPE_1}} |
| {{MVP_FEATURE_2}} | {{NICE_TO_HAVE_2}} | {{OUT_OF_SCOPE_2}} |
| {{MVP_FEATURE_3}} | {{NICE_TO_HAVE_3}} | {{OUT_OF_SCOPE_3}} |

- **Definition of Done (MVP):**
  - [ ] {{ACCEPTANCE_CRITERION_1}}
  - [ ] {{ACCEPTANCE_CRITERION_2}}
  - [ ] {{ACCEPTANCE_CRITERION_3}}

---

## Tech Stack

### Frontend:

- {{FRONTEND_FRAMEWORK}} with {{FRONTEND_LANGUAGE}}
- {{UI_LIBRARY}} for UI components
- {{CSS_FRAMEWORK}} for styling
- {{AUTH_SERVICE}} for user management

### Backend:

- {{BACKEND_FRAMEWORK}} for {{BACKEND_PRIMARY_PURPOSE}}
- {{EXTERNAL_API_1}} for {{API_1_PURPOSE}}
- {{EXTERNAL_SERVICE_1}} for {{SERVICE_1_PURPOSE}}
- {{STORAGE_SERVICE}} for {{STORAGE_PURPOSE}}

### Database:

- {{DATABASE_TYPE}} for {{DATABASE_PRIMARY_DATA}}
- {{STORAGE_TYPE}} for {{STORAGE_SECONDARY_DATA}}