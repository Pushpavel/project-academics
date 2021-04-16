import {DOCUMENT_IDS} from '../../constants/document.constants';
import {DocumentId} from '../../models/document/document-base.model';
import {StatsDocumentRaw, StatsDocumentUI, StatsEntryRaw, StatsEntryUI} from '../../models/document/document-stat.model';


export function statsDocumentUIModel(data: StatsDocumentRaw): StatsDocumentUI {
  const entries = DOCUMENT_IDS.reduce((entries, id) => {
    entries[id] = statsEntryUIModel(id, entries[id]);
    return entries;
  }, {} as any);

  return {...data, entries};
}

function statsEntryUIModel<T extends DocumentId>(documentId: T, data?: StatsEntryRaw): StatsEntryUI<T> {
  return {
    status: 'private',
    documentId,
    ...(data ?? {})
  };
}
