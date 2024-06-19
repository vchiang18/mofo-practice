import Dexie from "dexie";

const db = new Dexie("PracticeDatabase");

db.version(1).stores({
  practices:
    "++id, offensivePersonnel, formation, formationVariation, backfield, motion, fib, formationFamily, unbalanced , rep, period, practiceType, situation, practiceNo, practiceDate ",
  metricValues: "key, value",
  periodPairings: "++id, [period+practiceType+situation]",
  user: "stripeCustomerId",
});

db.open().catch((err) => {
  console.error("Failed to open db:", err.stack || err);
});

export default db;
