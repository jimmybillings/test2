import { SearchResolver } from './search.resolver';

export function main() {
  describe('Search Resolver', () => {
    let resolverUnderTest: SearchResolver;

    beforeEach(() => {
      resolverUnderTest = new SearchResolver(null, null, null, null);
    });

    it('***** HASN\'T BEEN TESTED YET! *****', () => {
      expect(true).toBe(true);
    });
  });
};

