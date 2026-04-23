type ExtractParams<T extends string> = string extends T
  ? Record<string, string | number>
  : T extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractParams<`/${Rest}`>]: string | number }
    : T extends `${infer _Start}:${infer Param}`
      ? { [K in Param]: string | number }
      : Record<string, never>;

export function buildPath<T extends string>(path: T, params: ExtractParams<T>): string {
  return path.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
    const value = (params as any)[key];

    if (value == null) {
      // if (__DEV__) {
      //   throw new Error(`Missing param: ${key}`);
      // }
      return '';
    }

    return encodeURIComponent(String(value));
  });
}
