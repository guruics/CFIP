# =============================================
# CFIP Project Bootstrap Script (Fixed)
# Creates folder structure + placeholder files
# =============================================

$ProjectRoot = "CFIP"

# --- Folder structure ---
$folders = @(
    "$ProjectRoot\capabilities\quickbooks",
    "$ProjectRoot\capabilities\athena",
    "$ProjectRoot\rag\quickbooks\source_docs",
    "$ProjectRoot\rag\quickbooks\embeddings",
    "$ProjectRoot\workflows\patterns",
    "$ProjectRoot\policies",
    "$ProjectRoot\ui\ui_intent_schemas",
    "$ProjectRoot\docs"
)

# --- Create folders ---
foreach ($folder in $folders) {
    if (-not (Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
        Write-Host "Created folder: $folder"
    }
}

# --- Create files using HERE-STRINGS ---
$files = @{
    "$ProjectRoot\README.md" = @'
# Clinic Financial Intelligence Portal (CFIP)

Project root for CFIP.
'@

    "$ProjectRoot\capabilities\quickbooks\qb_capability_registry_v1.json" = @'
{
  "version": "v1",
  "system": "QuickBooks",
  "capabilities": []
}
'@

    "$ProjectRoot\capabilities\quickbooks\qb_prohibited_capabilities.json" = @'
{
  "prohibited": []
}
'@

    "$ProjectRoot\capabilities\quickbooks\qb_capability_notes.md" = @'
# QuickBooks Capability Notes

Design decisions and constraints.
'@

    "$ProjectRoot\capabilities\athena\athena_capability_registry_v1.json" = @'
{
  "version": "v1",
  "system": "Athena",
  "capabilities": []
}
'@

    "$ProjectRoot\rag\quickbooks\ingestion_config.yaml" = @'
source: quickbooks_docs
refresh_interval_days: 30
'@

    "$ProjectRoot\workflows\patterns\payer_reconciliation.json" = @'
{
  "workflow": "payer_reconciliation"
}
'@

    "$ProjectRoot\workflows\patterns\variance_detection.json" = @'
{
  "workflow": "variance_detection"
}
'@

    "$ProjectRoot\workflows\patterns\batch_close.json" = @'
{
  "workflow": "batch_close"
}
'@

    "$ProjectRoot\policies\data_flow_rules.md" = @'
# Data Flow Rules

Defines allowed data movement.
'@

    "$ProjectRoot\policies\approval_matrix.json" = @'
{
  "approvals": []
}
'@

    "$ProjectRoot\policies\ai_usage_constraints.md" = @'
# AI Usage Constraints

Rules that constrain AI behavior.
'@

    "$ProjectRoot\ui\component_registry.json" = @'
{
  "components": []
}
'@

    "$ProjectRoot\docs\architecture.md" = @'
# Architecture Overview

System architecture description.
'@

    "$ProjectRoot\docs\audit_rationale.md" = @'
# Audit Rationale

Why this architecture is audit safe.
'@
}

# --- Write files ---
foreach ($file in $files.Keys) {
    if (-not (Test-Path $file)) {
        $files[$file] | Set-Content -Path $file -Encoding UTF8
        Write-Host "Created file: $file"
    }
}

Write-Host "`n✅ CFIP project structure created successfully."