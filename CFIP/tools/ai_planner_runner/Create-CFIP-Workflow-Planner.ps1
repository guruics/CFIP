# ============================================================
# CFIP Workflow Planner Bootstrap Script
# Creates Node.js planner harness folders & placeholder files
# ============================================================

$Root = "cfip-workflow-planner"

# -----------------------------
# Folder structure
# -----------------------------
$folders = @(
    "$Root",
    "$Root\config",
    "$Root\prompts",
    "$Root\schemas",
    "$Root\output",
    "$Root\test_cases"
)

foreach ($folder in $folders) {
    if (-not (Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
        Write-Host "Created folder: $folder"
    }
}

# -----------------------------
# Files with placeholder content
# -----------------------------
$files = @{

    "$Root\package.json" = @'
{
  "name": "cfip-workflow-planner",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "description": "AI planning harness for CFIP Workflow DSL",
  "scripts": {
    "run": "node index.js"
  },
  "dependencies": {
    "ajv": "^8.12.0",
    "dotenv": "^16.4.5",
    "openai": "^4.30.0"
  }
}
'@

    "$Root\index.js" = @'
console.log("CFIP Workflow Planner - index.js placeholder");
'@

    "$Root\run_prompt.js" = @'
export async function runPrompt(userPrompt) {
  throw new Error("run_prompt.js not implemented yet");
}
'@

    "$Root\validate_output.js" = @'
export function validateWorkflow(workflowJson) {
  return { valid: false, errors: ["validate_output.js not implemented yet"] };
}
'@

    "$Root\config\planner_config.json" = @'
{
  "model": "gpt-4.1-mini",
  "temperature": 0,
  "maxTokens": 1200
}
'@

    "$Root\prompts\medicaid_reconciliation_prompt.txt" = @'
Reconcile a Medicaid payment received in QuickBooks with corresponding claims in Athena and prepare adjustments if there are discrepancies.
'@

    "$Root\schemas\workflow_dsl_schema_v1.json" = @'
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Workflow DSL Schema v1",
  "type": "object"
}
'@

    "$Root\output\last_run.json" = @'
{}
'@

    "$Root\README.md" = @'
# CFIP Workflow Planner

This service is a lightweight AI planning harness that:
- Sends prompts to the CFIP AI Planner
- Receives Workflow DSL JSON
- Validates output against Workflow DSL Schema v1

This service does NOT:
- Execute workflows
- Call Athena or QuickBooks APIs
- Perform financial or clinical actions
'@
}

# -----------------------------
# Create files
# -----------------------------
foreach ($file in $files.Keys) {
    if (-not (Test-Path $file)) {
        $files[$file] | Set-Content -Path $file -Encoding UTF8
        Write-Host "Created file: $file"
    }
}

Write-Host "`n✅ CFIP Workflow Planner structure created successfully."
``node 