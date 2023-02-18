import { beforeAll, describe, expectTypeOf, it } from "vitest";
import config from "@/config";
import { fields } from "@/config/fields";

import TSERecord from "@/TSERecord";
import { DNI, Record } from "./types";

describe("TSERecord", () => {
  const DNI_MOCK = "206450557";
  let tseRecord: TSERecord;
  let record: Record;

  beforeAll(async () => {
    const url = `${config.baseUrl}/${config.dniPathName}.aspx`;
    tseRecord = await TSERecord.setup(url, fields);
    await tseRecord.findRecordByDNI(DNI_MOCK);
    record = tseRecord.record;
  });

  it("Should be TSERecord type", () => {
    expectTypeOf<TSERecord>(tseRecord);
  });

  it("Some record fields should be a strings", async () => {
    expectTypeOf(record.nombre).toBeString();
    expectTypeOf(record.cc).toBeString();
    expectTypeOf(record.nacionalidad).toBeString();
  });

  it("Some record fields should be a DNI type", () => {
    expectTypeOf<DNI>(record.cedula);
  });
});
