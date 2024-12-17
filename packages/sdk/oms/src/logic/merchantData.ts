export class MerchantData<T> {
  private _data: T | Record<string, any>;
  private readonly _templateKeys: Set<keyof T> | null;

  constructor(template?: T) {
    this._data = template ? { ...template } : {};
    this._templateKeys = template ? new Set<keyof T>(Object.keys(template) as (keyof T)[]) : null;
  }

  get data(): T | Record<string, any> {
    return this._data;
  }

  get isFlexible(): boolean {
    return this._templateKeys === null;
  }

  isKeyValid(key: keyof any): key is keyof T {
    return this._templateKeys ? this._templateKeys.has(key as keyof T) : true;
  }

  replaceData(newData: Partial<T>): void {
    if (this.isFlexible) {
      this._data = { ...this._data, ...newData };
    } else {
      const validData: Partial<T> = {};
      for (const key in newData) {
        if (this.isKeyValid(key)) {
          validData[key] = newData[key];
        } else {
          console.warn(`Key "${key}" is not in the original template and will be ignored.`);
        }
      }
      this._data = { ...this._data, ...validData } as T;
    }
  }
}
