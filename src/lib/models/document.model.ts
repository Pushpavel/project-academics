export enum DocStatus {PUBLIC, SUBMITTED, PRIVATE, REMARKED}

export interface DocMeta {
  status: DocStatus,
  timestamp: number
}

export interface DocumentStat {
  courseCode: string,
  id: string,
  name: string,
  status: DocStatus,
  timestamp: number,
}

