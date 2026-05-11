# Clinical Financial Intelligence Platform (CFIP)

## Product Overview

The **Clinical Financial Intelligence Platform (CFIP)** is a governed planning and intelligence layer that sits between clinical revenue systems and financial accounting systems.

CFIP’s core responsibility is to **translate financial and revenue intent into auditable, governed workflow plans**—*without executing those workflows directly*.

CFIP acts as:
- A **planner**, not an executor
- A **compiler of intent**, not an automation script engine
- A **control plane** for cross-system financial operations

---

## The Problem CFIP Solves

Healthcare finance workflows span siloed systems:

- Clinical systems (e.g., Athena) record claims, remittances, and patient payments
- Accounting systems (e.g., QuickBooks, ERPs) record deposits, cash movements, and ledger activity
- Reconciliation and compliance logic often lives in spreadsheets, scripts, or institutional memory

This leads to:
- Manual and error-prone processes
- Implicit, undocumented business logic
- Weak audit trails
- High operational and compliance risk

CFIP replaces implicit reasoning with **explicit, governed financial intent**.

---

## What CFIP Is (and Is Not)

### CFIP *Is*
- A workflow **planning** engine
- A governance and guardrail platform
- A financial intelligence control layer
- A capability-driven architecture

### CFIP *Is Not*
- A direct API execution engine
- A data warehouse
- A rules engine
- A low-code workflow builder
- An autonomous agent acting without constraints

---

## Core Capabilities

### 1. Intent-to-Workflow Planning

CFIP converts high-level business intent (for example, *“reconcile Medicaid payments”*) into a **formal workflow plan** that:
- Is schema-validated
- References only approved system capabilities
- Enforces approvals and risk controls
- Is deterministic and auditable

---

### 2. Capability-Driven Architecture

All actions in CFIP are expressed as **registered capabilities**.

Each capability:
- Belongs to a specific system (Athena, QuickBooks, or CFIP)
- Has an explicit risk profile
- Encodes what actions are legally and operationally allowed
- Is versioned and governed

This prevents:
- API hallucination
- Cross-system contamination
- Undocumented behavior

---

### 3. CFIP Internal Intelligence Layer

CFIP introduces **internal capabilities** for logic that belongs in neither source systems nor accounting systems, such as:
- Reconciliation
- Correlation
- Variance analysis
- Reporting

This isolates financial intelligence from systems of record.

---

### 4. Dual-Mode Planning

CFIP supports two planning modes:

#### Production Mode (Default)
- Uses only registered capabilities
- Rejects undefined or speculative actions
- Produces execution-safe, auditable plans

#### Discovery Mode (Engineering Only)
- Allows *diagnostic* proposal of missing capabilities
- Emits `PROPOSED_*` capability identifiers
- Enables safe platform evolution without governance violations

Discovery mode output is **never executable**.

---

## Intended Audience

CFIP is designed for:

### Primary Users
- Revenue Cycle Operations
- Finance and Accounting leadership
- Compliance and Audit teams

### Secondary Users
- Platform Engineers
- Integration Engineers
- Data and Analytics teams

CFIP aligns these roles around **shared, explicit financial intent**.

---

## How CFIP Is Used

1. **Intent is expressed** by a human, system, or schedule
2. **CFIP produces a governed workflow plan**
3. **Downstream systems execute or review the plan**
4. **Artifacts are auditable and traceable**

CFIP never hides logic or makes silent decisions.

---

## Example Use Cases

CFIP supports workflows such as:
- Remittance-to-deposit reconciliation
- Payment variance analysis
- Approval-gated financial adjustments
- Scheduled payer reconciliation
- Revenue leakage detection
- Executive financial reporting

Individual workflows (such as Medicaid reconciliation) are **instances**, not the product itself.

---

## Strategic Importance

CFIP enables a new operating model:

| Traditional | CFIP |
|------------|------|
| Scripts & spreadsheets | Governed workflows |
| Implicit logic | Explicit planning |
| Human-dependent processes | Institutionalized knowledge |
| Post-hoc audits | Built-in auditability |
| Risky automation | Safe, staged automation |

CFIP is a **platform investment**, not a point solution.

---

## In One Sentence

**CFIP is the governed intelligence layer that converts complex clinical and financial intent into safe, auditable, production-ready workflows across healthcare systems.**
