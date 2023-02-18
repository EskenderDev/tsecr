import { Browser, BrowserContext, chromium, Page } from "playwright";
import { DNI, Field, Record, TSEContext } from "@/types";
import { IRecord } from "./IRecord";

export default class TSERecord implements IRecord {
  private _browser: Browser;
  private _fields: Field[];
  private _record?: Record;
  private _page: Page;
  private _url: string;

  constructor(context: TSEContext) {
    const { url, fields, page, browser } = context;
    this._url = url;
    this._fields = fields;
    this._page = page;
    this._browser = browser;
  }
  public get record(): Record {
    return this._record as Record;
  }
  public get url(): string {
    return this._url;
  }
  public static async setup(url: string, fields: Field[]): Promise<TSERecord> {
    const browser: Browser = await chromium.launch();
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();

    await context.route("**.[png,jpg,jpeg,gif,do,ico,css]", (route) =>
      route.abort()
    );
    await page.goto(url);

    const record = new TSERecord({ browser, page, url, fields });

    return record;
  }

  public async findRecordByDNI(dni: DNI) {
    const inputDNI = await this._page?.getByPlaceholder(
      "Digite el número de cédula ahora"
    );

    await inputDNI?.fill(`${dni}`);
    await this._page?.getByRole("button").click();

    await this._page?.getByText("Ver Más Detalles").click();
    await this._page?.waitForNavigation();

    await this._getPageData(this._fields);

    this._close();
  }

  private _close() {
    this._browser.close();
  }

  private async _getPageData(fields: Field[]): Promise<void> {
    let data = await Promise.all(
      fields.map(async (field: Field) => {
        return [
          field.name,
          await this._page.locator(field.label).textContent(),
        ];
      })
    );

    this._record = Object.fromEntries(data);
  }
}
