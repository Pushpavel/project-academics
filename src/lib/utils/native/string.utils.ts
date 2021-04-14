import {range} from '@utils/native/number.utils';

export function getStringSimilarities(ids: string[], minLength: number) {
  const groups: Record<string, string[]> = {};
  // Group Strings that starts with substring of length minLength
  for (const id of ids) {
    const substring = id.substr(0, minLength);
    groups[substring] = groups[substring] ?? [];
    groups[substring].push(id);
  }
  return new Map(
    Object.keys(groups).map(key => {
        // extra common characters after minLength
        const extraCommon = groups[key].reduce((extra, val) => {
          // find till which char strings are identical
          for (let j = 0; j < extra.length; j++)
            if (extra[j] !== val[minLength + j])
              return extra.substr(0, j);
          return extra;
        }, groups[key][0].substr(minLength));
        return [key + extraCommon, groups[key]] as const;
      }
    )
  );
}

export function divideString(str: string, segmentLength: number) {
  const noOfSegments = Math.ceil(str.length / segmentLength);
  return range(noOfSegments).map(i => str.slice(i * segmentLength, (i + 1) * segmentLength));
}


export function pascalCase(s: string) {
  return s.replace(/\w+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase());
}
