import fs from "fs";
import path from "path";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

//const ROOT = process.cwd();
const ROOT = "F:\\guru\\ics\\ClinicalFinancialIntelligence\\CFIP\\CFIP";

function loadFile(label, filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${label} not found at ${filePath}`);
  }
  return fs.readFileSync(filePath, "utf-8");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT = loadFile(
  "AI Planner System Prompt",
  path.resolve(ROOT, "./ai/planner/ai_planner_system_prompt_v1.txt")
);

const QB_CAPABILITY_SCHEMA = loadFile(
  "QB Capability Schema",
  path.resolve(ROOT, "./capabilities/quickbooks/qb_capability_schema_v1.json")
);

const QB_CAPABILITY_REGISTRY = loadFile(
  "QB Capability Registry",
  path.resolve(ROOT, "./capabilities/quickbooks/qb_capability_registry_v1.json")
);

const ATH_CAPABILITY_SCHEMA = loadFile(
  "Athena Capability Schema",
  path.resolve(ROOT, "./capabilities/athena/athena_capability_schema_v1.json")
);

const ATH_CAPABILITY_REGISTRY = loadFile(
  "Athena Capability Registry",
  path.resolve(ROOT, "./capabilities/athena/athena_capability_registry_v1.json")
);

const CFIP_CAPABILITY_SCHEMA = loadFile(
  "CFIP Capability Schema",
  path.resolve(ROOT, "./capabilities/cfip/cfip_capability_schema_v1.json")
);

const CFIP_CAPABILITY_REGISTRY = loadFile(
  "CFIP Capability Registry",
  path.resolve(ROOT, "./capabilities/cfip/cfip_capability_registry_v1.json")
);

export async function runPrompt(userPrompt) {
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
   // { role: "system", content: "PLANNER MODE: DISCOVERY MODE" },

    { role: "system", content: "QuickBooks Capability Schema:" },
    { role: "system", content: QB_CAPABILITY_SCHEMA },
    { role: "system", content: "QuickBooks Capability Registry:" },
    { role: "system", content: QB_CAPABILITY_REGISTRY },

    { role: "system", content: "Athena Capability Schema:" },
    { role: "system", content: ATH_CAPABILITY_SCHEMA },
    { role: "system", content: "Athena Capability Registry:" },
    { role: "system", content: ATH_CAPABILITY_REGISTRY },

    { role: "system", content: "CFIP Internal Capability Schema:" },
    { role: "system", content: CFIP_CAPABILITY_SCHEMA },
    { role: "system", content: "CFIP Internal Capability Registry:" },
    { role: "system", content: CFIP_CAPABILITY_REGISTRY },

    { role: "user", content: userPrompt }
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    temperature: 0,
    messages
  });

  return JSON.parse(response.choices[0].message.content);
}