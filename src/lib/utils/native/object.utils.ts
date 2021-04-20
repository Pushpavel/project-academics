export function constructObject<K extends string, V>(keys: Readonly<K[]>, val: V) {
  return keys.reduce((obj, k) => {
    obj[k] = val;
    return obj;
  }, {} as any) as Record<K, V>;
}
