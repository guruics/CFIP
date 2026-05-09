import fs from "fs";
import Ajv from "ajv/dist/2020.js";

const ajv = new Ajv({
  allErrors: true,
  strict: false
});

const schema = JSON.parse(
  fs.readFileSync("./schemas/workflow_dsl_schema_v1.json", "utf-8")
);

const validate = ajv.compile(schema);

export function validateWorkflow(workflow) {
  const valid = validate(workflow);
  return {
    valid,
    errors: validate.errors
  };
}