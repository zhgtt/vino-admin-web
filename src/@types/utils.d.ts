declare namespace TypeUtil {
  /** 数据类型 */
  interface DataType {
    number: number;
    string: string;
    boolean: boolean;
    null: null;
    undefined: undefined;
    symbol: symbol;
    bigInt: bigint;
    object: Record<string, any>;
    array: Array<any>;
    function: (...args: any[]) => any | void;
    date: Date;
    regExp: RegExp;
    promise: Promise<any>;
    set: Set<any>;
    map: Map<any, any>;
    file: File;
  }

  type DataTypeStringKey = keyof DataType;

  // Capitalize 将对应的字符串转成首字母大写
  type DataTypeString<T extends DataTypeStringKey = DataTypeStringKey> =
    `[object ${Capitalize<T>}]`;
}
