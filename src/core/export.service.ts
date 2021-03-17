import {Injectable} from '@angular/core';
import * as XLSX from 'xlsx';
import {ExportJsonFormat} from '@lib/models/export.model';

const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  public jsonToExcel(json: ExportJsonFormat): void {
    const options = {
      // Skipping header for now. If it exists then it should be Name | Grade of Course 1 | ... | GPA
      header: [],
      skipHeader: true,
      origin: -1,
    }

    const fileName = `PAC-${json.degree}-${json.year}-semester-${json.semester}`;

    // if (json.skipHeader) options.header = json.header;

    const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json.data, options);

    const workBook: XLSX.WorkBook = {Sheets: {Sheet1: workSheet}, SheetNames: ['PAC']};

    XLSX.writeFile(workBook, `${fileName}${EXCEL_EXTENSION}`);
  }

}
