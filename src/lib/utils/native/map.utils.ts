export function mapMapEntries<K, V, K2, V2>(map: Map<K, V>, predicate: (key: K, val: V) => [K2, V2]) {
  return new Map([...map.entries()].map(entry => predicate(entry[0], entry[1])));
}

// TODO: move to object.utils.ts
export function mapObjectEntries<T, V>(obj: T, predicate: <K extends keyof T>(key: K, val: T[K]) => V) {
  return Object.keys(obj).map(key => predicate(key as keyof T, obj[key as keyof T]));
}

export function objectToMap<K extends keyof any, V>(obj: Record<K, V>): Map<K, V> {
  return new Map(mapObjectEntries(obj, (key, val) => [key, val] as [K, V]));
}

export function objectFromMap<K extends string, V>(map: Map<K, V>) {
  const obj = {} as Record<K, V>;
  for (const [key, value] of map.entries())
    obj[key] = value;
  return obj;
}

export function groupBy<K, V>(values: V[], predicate: (value: V) => K) {
  const map = new Map<K, V[]>();

  for (const val of values) {
    const key = predicate(val);
    const group = map.get(key) ?? [];
    group.push(val);
    map.set(key, group);
  }

  return map;
}
