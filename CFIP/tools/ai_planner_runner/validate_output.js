import fs from "fs";
import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true });

const workflowSchema = JSON.parse(
  fs.readFileSync("./schemas/workflow_dsl_schema_v1.json", "utf-8")
);

const validate = ajv.compile(workflowSchema);

export function validateWorkflow(workflow) {
  const valid = validate(workflow);
  return {
    valid,
    errors: validate.errors
  };
}