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

