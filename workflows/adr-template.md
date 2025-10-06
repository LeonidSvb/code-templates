---
description: Architectural Decision Records
globs:
alwaysApply: false
---

# Architecture Decision Log

<!--
ADR_AGENT_PROTOCOL v1.0

You (the agent) manage this file as the single source of truth for all ADRs.

INVARIANTS
- Keep this exact file structure and headings.
- All ADR entries use H2 headings: "## ADR-XXXX — <Title>" (4-digit zero-padded ID).
- Allowed Status values: Proposed | Accepted | Superseded
- Date format: YYYY-MM-DD
- New entries must be appended to the END of the file.
- The Index table between the INDEX markers must always reflect the latest state and be sorted by ID desc (newest on top).
- Each ADR MUST contain: Date, Status, Owner, Context, Decision, Consequences.
- Each ADR must include an explicit anchor `<a id="adr-XXXX"></a>` so links remain stable.

HOW TO ADD A NEW ADR
1) Read the whole file.
2) Compute next ID:
   - Scan for headings matching: ^## ADR-(\d{4}) — .+$
   - next_id = (max captured number) + 1, left-pad to 4 digits.
3) Create a new ADR section using the “New ADR Entry Template” below.
   - Place it AFTER the last ADR section in the file.
   - Add an `<a id="adr-XXXX"></a>` line immediately below the heading.
4) Update the Index (between the INDEX markers):
   - Insert/replace the row for this ADR keeping the table sorted by ID descending.
   - Title in the Index MUST link to the anchor: [<Title>](#adr-XXXX)
   - If this ADR supersedes another: set “Supersedes” in this row, and update that older ADR:
       a) Change its Status to “Superseded”
       b) Add “Superseded by: ADR-XXXX” in its Consequences block
       c) Update the older ADR’s Index row “Superseded by” column to ADR-XXXX
5) Validate before saving:
   - Exactly one heading exists for ADR-XXXX
   - All required fields are present and non-empty
   - Index contains a row for ADR-XXXX and remains properly sorted
6) Concurrency resolution:
   - If a merge conflict or duplicate ID is detected after reading: recompute next_id from the current file state, rename your heading, anchor, and Index row accordingly, and retry once.

COMMIT MESSAGE SUGGESTION
- "ADR-XXXX: <Short Title> — <Status>"

END ADR_AGENT_PROTOCOL
-->

## Index

<!-- BEGIN:ADR_INDEX -->

| ID   | Title                                                        | Date       | Status   | Supersedes | Superseded by |
| ---- | ------------------------------------------------------------ | ---------- | -------- | ---------- | ------------- |
| 0001 | [{{FIRST_ADR_TITLE}}](#adr-0001) | {{YYYY-MM-DD}} | Accepted | —          | —             |

<!-- END:ADR_INDEX -->

---

## New ADR Entry Template (copy for each new decision)

> Replace placeholders, keep section headers. Keep prose concise.

```

## ADR-XXXX — \<Short, specific title>

<a id="adr-XXXX"></a>
**Date**: YYYY-MM-DD
**Status**: Proposed | Accepted | Superseded
**Owner**: <Name>

### Context

<1–3 sentences: what changed or what forces drive this decision now>

### Alternatives

<Quick bullet list of alternatives considered, and why they were rejected.>

### Decision

\<Single clear decision in active voice; make it testable/verifiable>

### Consequences

* **Pros**: \<benefit 1>, \<benefit 2>
* **Cons / risks**: \<cost 1>, \<risk 1>
* **Supersedes**: ADR-NNNN (if any)
* **Superseded by**: ADR-MMMM (filled later if replaced)

### (Optional) Compliance / Verification

\<How we’ll check this is honored: tests, checks, fitness functions, runbooks>

```

---

## ADR-0001 — {{FIRST_ADR_TITLE}}

<a id="adr-0001"></a>
**Date**: {{YYYY-MM-DD}}
**Status**: {{STATUS}}  
**Owner**: {{OWNER_NAME}}

### Context

{{CONTEXT_DESCRIPTION}}

### Alternatives

- **{{ALTERNATIVE_1}}**: {{ALTERNATIVE_1_DESCRIPTION}}
- **{{ALTERNATIVE_2}}**: {{ALTERNATIVE_2_DESCRIPTION}}
- **{{ALTERNATIVE_3}}**: {{ALTERNATIVE_3_DESCRIPTION}}

### Decision

{{DECISION_DESCRIPTION}}

### Consequences

- **Pros**: {{PROS}}
- **Cons / risks**: {{CONS_AND_RISKS}}
- **Supersedes**: {{SUPERSEDES_ADR_OR_DASH}}
- **Superseded by**: {{SUPERSEDED_BY_ADR_OR_DASH}}

### Compliance / Verification

{{COMPLIANCE_VERIFICATION_DESCRIPTION}}

---

<!-- ADD MORE ADR ENTRIES HERE FOLLOWING THE SAME TEMPLATE PATTERN -->

---
