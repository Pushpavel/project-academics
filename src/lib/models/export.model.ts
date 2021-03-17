export interface ExportJsonFormat {
  skipHeader?: boolean;
  header?: Array<string>;
  data: Array<any>;
  degree: string;
  year: number;
  semester: number;
}
