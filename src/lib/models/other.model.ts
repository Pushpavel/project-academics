export enum DocStatus {PUBLIC, SUBMITTED, PRIVATE, REMARKED}

export interface DocMeta {
  status: DocStatus,
  timestamp: number
}
