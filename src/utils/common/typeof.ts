/**
 * 判断数据类型
 */
const dataTypeLabels: { [K in TypeUtil.DataTypeStringKey]: TypeUtil.DataTypeString<K> } = {
  number: '[object Number]',
  string: '[object String]',
  boolean: '[object Boolean]',
  undefined: '[object Undefined]',
  null: '[object Null]',
  symbol: '[object Symbol]',
  bigInt: '[object BigInt]',

  object: '[object Object]',
  array: '[object Array]',
  function: '[object Function]',
  date: '[object Date]',
  regExp: '[object RegExp]',
  promise: '[object Promise]',
  file: '[object File]',
  set: '[object Set]',
  map: '[object Map]',
};

const getDataTypeString = <K extends TypeUtil.DataTypeStringKey>(value: unknown) => {
  return Object.prototype.toString.call(value) as TypeUtil.DataTypeString<K>;
};

/** value is T 表示 value 参数包含在 T 类型中 */
export const isNumber = <T extends number>(value: T | unknown): value is T => {
  return getDataTypeString(value) === dataTypeLabels.number;
};

export const isString = <T extends string>(value: T | unknown): value is T => {
  return getDataTypeString(value) === dataTypeLabels.string;
};

export const isBoolean = <T extends boolean>(value: T | unknown): value is T => {
  return getDataTypeString(value) === dataTypeLabels.boolean;
};

export const isUndefined = <T extends undefined>(value: T | unknown): value is T => {
  return getDataTypeString(value) === dataTypeLabels.undefined;
};

export const isNull = <T extends null>(value: T | unknown): value is T => {
  return getDataTypeString(value) === dataTypeLabels.null;
};

export const isSymbol = <T extends symbol>(value: T | unknown): value is T => {
  return getDataTypeString(value) === dataTypeLabels.symbol;
};

export function isBigInt<T extends bigint>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.bigInt;
}

export function isObject<T extends Record<string, any>>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.object;
}

export function isArray<T extends any[]>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.array;
}

export function isFunction<T extends (...args: any[]) => any | void>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.function;
}

export function isDate<T extends Date>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.date;
}

export function isRegExp<T extends RegExp>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.regExp;
}

export function isPromise<T extends Promise<any>>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.promise;
}

export function isFile<T extends File>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.file;
}

export function isSet<T extends Set<any>>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.set;
}

export function isMap<T extends Map<any, any>>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.map;
}
