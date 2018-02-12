import { Observable } from 'rxjs/Observable';
import { HomeHighlightsComponent } from './home-highlights.component';

export function main() {
  describe('Home Highlights Component', () => {
    let componentUnderTest: HomeHighlightsComponent;

    beforeEach(() => {
      componentUnderTest = new HomeHighlightsComponent();
    });
    it('Should remove any empty properties in the configurable search params incase HUMANS forgot to put them in there', () => {
      expect(componentUnderTest.buildSearchContext(JSON.stringify({ q: '', i: 0, n: 100 }))).toEqual({ i: 0, n: 100 });
    });
  });
}
