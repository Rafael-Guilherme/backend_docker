import { generateTable } from "./generateTable";
import { generateGraph } from "./generateGraph";

export async function generateChats(patient_id: string, test_id: string) {
  await Promise.all([
    generateTable(patient_id, test_id),
    generateGraph(patient_id, test_id),
  ]);
}
