import {MarklistEntryRaw, MarklistEntryUI} from '@lib/models/document/marklist.model';

export function marklistEntriesUIModel([entries, studentNames]: [MarklistEntryRaw[], Map<string, string>]): MarklistEntryUI[] {
  return entries.map(entry => ({
    ...entry,
    name: studentNames.get(entry.rollNo) ?? 'Error' // TODO: Handle this
  }));
}
