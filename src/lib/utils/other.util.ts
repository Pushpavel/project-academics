export function mapMapEntries<K, V, K2, V2>(map: Map<K, V>, predicate: (key: K, val: V) => [K2, V2]) {
  return new Map([...map.entries()].map(entry => predicate(entry[0], entry[1])));
}
