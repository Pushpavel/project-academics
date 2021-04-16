import {MarklistEntryRaw, MarklistEntryUI, ProtectedMarklistMetaRaw} from '@models/document/marklist.model';
import {mapObjectEntries} from '../../utils/native/map.utils';

export function marklistEntriesUIModel([entries, studentNames]: [MarklistEntryRaw[], Map<string, string>]): MarklistEntryUI[] {
  return entries.map(entry => ({
    ...entry,
    name: studentNames.get(entry.rollNo) ?? 'Error' // TODO: Handle this
  }));
}


export function marklistEntriesFromProtectedMeta(meta: ProtectedMarklistMetaRaw) {
  return mapObjectEntries(meta.entries,
    (rollNo, mark) => ({rollNo, mark})
  );
}
