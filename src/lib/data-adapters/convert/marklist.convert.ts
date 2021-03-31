import {converter} from '@lib/data-adapters/base/convert.default';
import {MarklistEntryRaw, MarklistEntryUI} from '@lib/models/marklist.model';

export const privateMarklistEntryConvert = (studentNames: Map<string, string>) =>
  converter<MarklistEntryUI>({
    fromFirestore(snap) {
      const data = snap.data() as MarklistEntryRaw;
      return {
        ...data,
        name: studentNames.get(data.rollNo) ?? 'Error'
      };
    }
  });
