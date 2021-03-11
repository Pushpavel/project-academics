import {getStringSimilarities} from '@lib/utils/string.utils';

describe('String Utils', () => {
  describe('getStringSimilarities', () => {
    it('Group Strings that starts with substring of length minLength', () => {
      const testData = ['CS19B1001', 'CS19B1042', 'CS19B1098', 'CS19B1048', 'ME12B1005', 'EC18B1004', 'ME12B1078', 'EC18B1073'];
      const result = getStringSimilarities(testData, 7);

      expect(new Set(Array.from(result.keys()))).toEqual(new Set(['CS19B10', 'ME12B10', 'EC18B10']));
      expect(new Set(result.get('CS19B10'))).toEqual(new Set(['CS19B1001', 'CS19B1042', 'CS19B1098', 'CS19B1048']));
      expect(new Set(result.get('ME12B10'))).toEqual(new Set(['ME12B1005', 'ME12B1078']));
      expect(new Set(result.get('EC18B10'))).toEqual(new Set(['EC18B1004', 'EC18B1073']));
    });

    it('Group Strings that starts with substring of length greater than minLength', () => {
      // ME12B1078 is key for this test
      const testData = ['CS19B1001', 'CS19B1042', 'CS19B1098', 'CS19B1048', 'ME12B107849', 'EC18B1004', 'ME12B107863'];
      const result = getStringSimilarities(testData, 7);

      expect(new Set(Array.from(result.keys()))).toEqual(new Set(['CS19B10', 'ME12B1078', 'EC18B1004']));
      expect(new Set(result.get('CS19B10'))).toEqual(new Set(['CS19B1001', 'CS19B1042', 'CS19B1098', 'CS19B1048']));
      expect(new Set(result.get('ME12B1078'))).toEqual(new Set(['ME12B107849', 'ME12B107863']));
      expect(new Set(result.get('EC18B1004'))).toEqual(new Set(['EC18B1004']));
    });
  });
});
