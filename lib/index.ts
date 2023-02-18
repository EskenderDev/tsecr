import config from "./config";
import TSERecord from "@/TSERecord";
import { DNI, Record } from "@/types";

export async function findRecord(dni: DNI): Promise<Record> {
  const url = `${config.baseUrl}/${config.dniPathName}.aspx`;
  const tseRecord = await TSERecord.setup(url, config.fields);
  await tseRecord.findRecordByDNI(dni);
  return await tseRecord.record;
}
