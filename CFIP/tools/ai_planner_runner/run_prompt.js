const QB_CAPABILITY_SCHEMA = loadFile(
  "QB Capability Schema",
  path.resolve(ROOT, "../capabilities/quickbooks/qb_capability_schema_v1.json")
);

const QB_CAPABILITY_REGISTRY = loadFile(
  "QB Capability Registry",
  path.resolve(ROOT, "../capabilities/quickbooks/qb_capability_registry_v1.json")
);

const ATH_CAPABILITY_SCHEMA = loadFile(
  "Athena Capability Schema",
  path.resolve(ROOT, "../capabilities/athena/athena_capability_schema_v1.json")
);

const ATH_CAPABILITY_REGISTRY = loadFile(
  "Athena Capability Registry",
  path.resolve(ROOT, "../capabilities/athena/athena_capability_registry_v1.json")
);

const CFIP_CAPABILITY_SCHEMA = loadFile(
  "CFIP Capability Schema",
  path.resolve(ROOT, "../capabilities/cfip/cfip_capability_schema_v1.json")
);

const CFIP_CAPABILITY_REGISTRY = loadFile(
  "CFIP Capability Registry",
  path.resolve(ROOT, "../capabilities/cfip/cfip_capability_registry_v1.json")
);

const messages = [
  // 1️⃣ Planner rules first
  { role: "system", content: SYSTEM_PROMPT },

  // 🔍 Discovery Mode flag (EXPLICIT, SAFE)
  { role: "system", content: "PLANNER MODE: DISCOVERY MODE" },

  // 2️⃣ QuickBooks (external cash system)
  { role: "system", content: "QuickBooks Capability Schema (authoritative):" },
  { role: "system", content: QB_CAPABILITY_SCHEMA },
  { role: "system", content: "QuickBooks Capability Registry (authoritative symbols):" },
  { role: "system", content: QB_CAPABILITY_REGISTRY },

  // 3️⃣ Athena (clinical / RCM system)
  { role: "system", content: "Athena Capability Schema (authoritative):" },
  { role: "system", content: ATH_CAPABILITY_SCHEMA },
  { role: "system", content: "Athena Capability Registry (authoritative symbols):" },
  { role: "system", content: ATH_CAPABILITY_REGISTRY },

  // 4️⃣ CFIP (internal reconciliation layer)
  {
    role: "system",
    content:
      "CFIP Internal Capability Schema and Registry. " +
      "These capabilities represent the ONLY legal internal reconciliation logic. " +
      "They are the ONLY allowed bridge between Athena and QuickBooks."
  },
  { role: "system", content: CFIP_CAPABILITY_SCHEMA },
  { role: "system", content: CFIP_CAPABILITY_REGISTRY },

  // 5️⃣ Workflow DSL grammar LAST
  { role: "system", content: "Workflow DSL Schema v1 (output MUST conform):" },
  { role: "system", content: WORKFLOW_DSL_SCHEMA },

  // 6️⃣ User intent LAST
  { role: "user", content: userPrompt }
];
