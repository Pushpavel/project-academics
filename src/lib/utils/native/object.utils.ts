export function constructObject<K extends string, V>(keys: Readonly<K[]>, val: V) {
  return keys.reduce((obj, k) => {
    obj[k] = val;
    return obj;
  }, {} as any) as Record<K, V>;
}

export function switchKeyValue<K extends keyof any, V extends keyof any>(obj: Record<K, V>) {
  const switchedObj = {} as Record<V, K>;

  for (const key of Object.keys(obj) as K[])
    switchedObj[obj[key]] = key;

  return switchedObj;
}
