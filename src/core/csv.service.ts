import {Injectable} from '@angular/core';
import {MARK_DOCUMENT_IDS} from '../lib/constants/document.constants';
import {AttendanceEntryUI} from '../lib/models/document/attendance.model';
import {MarklistDocumentId, PublicDocumentId} from '../lib/models/document/document-base.model';
import {GradeEntryUI} from '../lib/models/document/grading.model';
import {MarklistEntryUI} from '../lib/models/document/marklist.model';
import {DocumentPath} from '../lib/models/path.model';
import {downloadFile} from '../lib/sheets/download-file';
import {getCsvString, HeaderLabels} from '../lib/sheets/get-csv-string';
import {constructObject} from '../lib/utils/native/object.utils';


@Injectable({
  providedIn: 'root'
})
export class CsvService {


  studentEntriesHeaders = [['rollNo', 'Roll No'], ['name', 'Name']] as const;

  headers: Headers = {
    ATTENDANCE: [...this.studentEntriesHeaders, ['attended', 'Attended']] as const,
    GRADES: [
      ...this.studentEntriesHeaders,
      ...MARK_DOCUMENT_IDS.map(id => [id, id] as const),// ['CT1','CT1'] ,...
      ['total', 'Total'], ['grade', 'Grade']
    ] as const,
    ...constructObject(MARK_DOCUMENT_IDS, [...this.studentEntriesHeaders, ['mark', 'Mark']] as const),
  };

  async downloadDocumentCSV<ID extends PublicDocumentId, T extends DocumentRowMap[ID]>(p: DocumentPath<ID>, rows: T[], total?: number) {
    const meta: any = {};
    if (total != null && p.documentId == 'ATTENDANCE')
      meta['No of Classes Conducted'] = total;
    else if (total != null)
      meta['Total Marks'] = total;


    const csvString = getCsvString<T>(rows, this.headers[p.documentId] as HeaderLabels<T>, meta);
    await downloadFile(csvString, p.documentId + '.csv');
  }
}

type DocumentRowMap = {
  'ATTENDANCE': AttendanceEntryUI,
  'GRADES': GradeEntryUI,
} & { [markId in MarklistDocumentId]: MarklistEntryUI }

type Headers = { [T in PublicDocumentId]: HeaderLabels<DocumentRowMap[T]> }
