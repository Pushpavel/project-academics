export interface MarklistEntryRaw {
  rollNo: string,
  mark: number,
}

export interface MarklistEntryUI extends MarklistEntryRaw {
  name: string,
}
