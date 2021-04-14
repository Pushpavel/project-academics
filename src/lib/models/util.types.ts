export type Deletable<T, K extends keyof T> = Partial<T> & Omit<T, K>
