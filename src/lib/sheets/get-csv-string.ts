export type HeaderLabels<T> = Readonly<Readonly<[keyof T, string]>[]>

export function getCsvString<T>(rows: T[], headers: HeaderLabels<T>) {
  let csvString = '';

  for (const [, label] of headers)
    csvString += label + ',';
  csvString += '\n';

  for (const row of rows) {
    for (const [key] of headers)
      csvString += (row[key] ?? '') + ',';
    csvString += '\n';
  }

  return csvString;
}
