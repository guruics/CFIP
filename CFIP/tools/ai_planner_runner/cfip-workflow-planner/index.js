import fs from "fs";
import path from "path";
import { runPrompt } from "./run_prompt.js";
import { validateWorkflow } from "./validate_output.js";

const PROMPT_FILE = "./prompts/medicaid_reconciliation_prompt.txt";
const OUTPUT_FILE = "./output/last_run.json";

async function main() {
  console.log("CFIP Workflow Planner\n");

  const userPrompt = fs.readFileSync(PROMPT_FILE, "utf-8");

  console.log("Running AI planner...");
  const workflowJson = await runPrompt(userPrompt);

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(workflowJson, null, 2));
  console.log(`Workflow written to ${OUTPUT_FILE}`);

  console.log("Validating workflow...");
  const result = validateWorkflow(workflowJson);

  if (!result.valid) {
    console.error("❌ WORKFLOW INVALID");
    console.error(result.errors);
    process.exit(1);
  }

  console.log("✅ WORKFLOW VALID (DSL v1)");
}

main().catch(err => {
  console.error("Planner failed:", err);
  process.exit(1);
});