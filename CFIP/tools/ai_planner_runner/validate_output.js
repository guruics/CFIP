import fs from "fs";
import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true });


const schemaPath = path.resolve("./workflows/workflow_dsl_schema_v1.json");
console.log("Loading workflow schema from:");
console.log(schemaPath);


const raw  = fs.readFileSync(schemaPath, "utf8");


console.log("First 10 char codes:");
console.log([...raw.slice(0, 10)].map(c => c.charCodeAt(0)));


 //JSON.parse(
  //fs.readFileSync("./workflows/workflow_dsl_schema_v1.json", "utf-8")
//);

const validate = ajv.compile(workflowSchema);

export function validateWorkflow(workflow) {
  const valid = validate(workflow);
  return {
    valid,
    errors: validate.errors
  };
}