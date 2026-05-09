Medicaid Reconciliation – Engineering Documentation
Purpose
This document describes the technical implementation of the Medicaid remittance‑to‑deposit reconciliation workflow in CFIP, including:

The workflow DSL
Capability model and registries
Discovery vs Production planning modes
CFIP internal reconciliation capabilities
Validation and governance guarantees


Architecture Overview
CFIP operates as an intent‑to‑workflow compiler, not an execution engine.
Reconciliation is modeled as a pure planning artifact, expressed in Workflow DSL v1 and executed downstream by controlled systems.
Systems Involved





















LayerResponsibilityAthenaSystem of record for claims, remittancesQuickBooksSystem of record for cash, deposits, GLCFIPInternal reconciliation & reporting logic
No system violates its boundary.

Key Design Principle

Reconciliation is neither a clinical function nor a finance function alone.
It is an internal CFIP responsibility expressed through explicit capabilities.


Workflow DSL (v1) – Final Production Workflow
The final production‑validated workflow:
JSON{  "workflowId": "WF_REMITTANCE_DEPOSIT_RECONCILIATION_CFIP_QB_ATHENA",  "version": "v1",  "description": "Workflow to reconcile Athena remittance data with QuickBooks cash deposits, generate variance report, and enable review of reconciliation variances.",  "trigger": "MANUAL",  "steps": [    {      "stepId": "STEP_1",      "type": "CAPABILITY",      "capabilityId": "ATH_GET_REMITTANCE"    },    {      "stepId": "STEP_2",      "type": "CAPABILITY",      "capabilityId": "QB_GET_DEPOSITS"    },    {      "stepId": "STEP_3",      "type": "CAPABILITY",      "capabilityId": "CFIP_RECONCILE_REMITTANCE_TO_DEPOSIT"    },    {      "stepId": "STEP_4",      "type": "CAPABILITY",      "capabilityId": "CFIP_GENERATE_VARIANCE_REPORT"    },    {      "stepId": "STEP_5",      "type": "OUTPUT",      "output": "varianceReport"    }  ]}Show more lines
This workflow passes:

Schema validation
Capability registry validation
Production mode planner constraints


Capability Model
External Capabilities (Read‑Only)




















CapabilitySourcePurposeATH_GET_REMITTANCEAthenaRetrieve remittance dataQB_GET_DEPOSITSQuickBooksRetrieve deposit data

CFIP Internal Capabilities
These were identified using Discovery Mode and then formalized.
1. Reconciliation Capability
CFIP_RECONCILE_REMITTANCE_TO_DEPOSIT


INTERNAL
READ‑only
Joins Athena remittance totals with QuickBooks deposits
Produces variance data (payer / batch level)

2. Reporting Capability
CFIP_GENERATE_VARIANCE_REPORT


INTERNAL
READ‑only
Finalizes reconciliation results into an auditable artifact
Semantically “closes” the workflow intent


Discovery Mode vs Production Mode
Discovery Mode (Engineering Only)
Used to identify missing primitives.

Enabled via system message:
PLANNER MODE: DISCOVERY MODE


Allows PROPOSED_* capability IDs
Output is diagnostic and non‑executable

Discovery outputs are used to:

Identify missing abstractions
Create new CFIP capability registry entries


Production Mode (Default)

Discovery disabled
Only registered capability IDs allowed
Any PROPOSED_* capability causes rejection

This ensures zero hallucination in production.

Validation Guarantees
Each workflow is validated across three layers:

Workflow DSL Schema v1
Capability Registry Closure
Planner Mode Enforcement

Failures are deterministic and explainable.

Key Engineering Outcomes

Reconciliation logic is first‑class, not implicit
Capability discovery is systematic, not guessed
CFIP registry evolves through evidence
Production workflows are safe by construction


Design Pattern Established
This implementation establishes the standard pattern for future workflows:
External READs
→ CFIP Internal Correlation
→ CFIP Internal Finalization
→ OUTPUT

Any workflow that cannot satisfy this pattern enters failure mode by design.

Summary for Engineers

This milestone proves that CFIP can safely translate real financial intent into deterministic, audited workflow plans—while exposing capability gaps through discovery instead of hiding them.