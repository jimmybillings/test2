import { WzPaginationComponent } from './wz.pagination.component';

export function main() {
  let componentUnderTest: WzPaginationComponent;

  beforeEach(() => {
    componentUnderTest = new WzPaginationComponent(null);
  });

  describe('getPageNumber()', () => {
    beforeEach(() => {
      componentUnderTest.pagination = { numberOfPages: 3 };
      spyOn(componentUnderTest.getPage, 'emit');
    });

    it('emits a getPage event', () => {
      componentUnderTest.getPageNumber(2);
      expect(componentUnderTest.getPage.emit).toHaveBeenCalledWith(2);
    });

    it('should return the last page if a page higher than the numbeOfPages is entered', () => {
      componentUnderTest.getPageNumber(7);
      expect(componentUnderTest.getPage.emit).toHaveBeenCalledWith(3);
    });

    it('should return the first page if a page of 0 or lower is entered', () => {
      componentUnderTest.getPageNumber(-1);
      expect(componentUnderTest.getPage.emit).toHaveBeenCalledWith(1);
    });

    it('turns the input into an integer so a decimal input entered by a user is ok', () => {
      componentUnderTest.getPageNumber(1.2367485);
      expect(componentUnderTest.getPage.emit).toHaveBeenCalledWith(1);
    });

    it('turns the input into an integer so a letter input entered by a user is ok', () => {
      componentUnderTest.getPageNumber('adf');
      expect(componentUnderTest.getPage.emit).toHaveBeenCalledWith(1);
    });
  });

  describe('getCurrentPage()', () => {
    it('should return the page number if the number of pages is greater than 0', () => {
      componentUnderTest.pagination = { numberOfPages: 10, currentPage: 5 };
      expect(componentUnderTest.getCurrentPage()).toBe(5);
    });

    it('should return 0 if the the number of pages is 0 or less', () => {
      componentUnderTest.pagination = { numberOfPages: 0 };
      expect(componentUnderTest.getCurrentPage()).toBe(0);
    });
  });
}
