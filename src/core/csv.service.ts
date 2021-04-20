import {Injectable} from '@angular/core';
import {MARK_DOCUMENT_IDS} from '../lib/constants/document.constants';
import {AttendanceEntryUI} from '../lib/models/document/attendance.model';
import {MarklistDocumentId, PublicDocumentId} from '../lib/models/document/document-base.model';
import {GradeEntryUI} from '../lib/models/document/grading.model';
import {MarklistEntryUI} from '../lib/models/document/marklist.model';
import {DocumentPath} from '../lib/models/path.model';
import {downloadFile} from '../lib/sheets/download-file';
import {getCsvString, HeaderLabels} from '../lib/sheets/get-csv-string';


@Injectable({
  providedIn: 'root'
})
export class CsvService {


  studentEntriesHeaders = [['rollNo', 'Roll No'], ['name', 'Name']] as const;
  marklistHeaders = [...this.studentEntriesHeaders, ['mark', 'Mark']] as const;


  headers: HeaderLabelsDef = {
    ATTENDANCE: [...this.studentEntriesHeaders, ['attended', 'Attended']] as const,
    GRADES: [...this.studentEntriesHeaders],
    ...MARK_DOCUMENT_IDS.reduce((data, id) => {
      data[id] = this.marklistHeaders;
      return data;
    }, {} as any)
  };

  downloadDocumentCSV<ID extends PublicDocumentId, T extends DocumentRowMap[ID]>(p: DocumentPath<ID>, rows: T[]) {
    const csvString = getCsvString(rows, this.headers[p.documentId] as HeaderLabels<T>);
    downloadFile(csvString, p.documentId + '.csv');
  }
}

type DocumentRowMap = {
  'ATTENDANCE': AttendanceEntryUI,
  'GRADES': GradeEntryUI,
} & { [markId in MarklistDocumentId]: MarklistEntryUI }

type HeaderLabelsDef = {
  [id in PublicDocumentId]: HeaderLabels<DocumentRowMap[id]>
}
