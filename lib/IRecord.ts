import { DNI } from "./types";

export interface IRecord {
  findRecordByDNI(dni: DNI): Promise<void>;
}
