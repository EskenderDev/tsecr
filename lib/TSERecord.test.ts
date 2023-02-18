import { beforeAll, describe, expect, it } from "vitest";
import config from "@/config";
import { fields } from "@/config/fields";

import TSERecord from "@/TSERecord";
import { Record } from "./types";

describe("findRecord", () => {
  const DNI_MOCK = "206450557";
  let tseRecord: TSERecord;
  let record: Record;

  beforeAll(async () => {
    const url = `${config.baseUrl}/${config.dniPathName}.aspx`;
    tseRecord = await TSERecord.setup(url, fields);

    await tseRecord.findRecordByDNI(DNI_MOCK);
    record = tseRecord.record;
  }, 100000);

  it("should return a Record object", () => {
    expect(record).toBeTypeOf("object");
  });

  it("should contain the correct DNI", async () => {
    expect(record.cedula).toBe(DNI_MOCK);
  });

  it("should throw an error if DNI is invalid", async () => {
    try {
      await tseRecord.findRecordByDNI("000000000");
    } catch (error: any) {
      expect(error.name).toBe("Error");
    }
  });
});
