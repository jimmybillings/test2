import { SearchHeaderComponent } from './search-header.component';

export function main() {
  describe('Search Header Component', () => {
    let componentUnderTest: SearchHeaderComponent;

    beforeEach(() => {
      componentUnderTest = new SearchHeaderComponent();
    });

    describe('get titleForAssetViewBtn()', () => {
      it('returns \'SEARCH.ASSET_VIEW_LIST_BTN_TITLE\' when assetView is \'grid\'', () => {
        componentUnderTest.assetView = 'grid';
        expect(componentUnderTest.titleForAssetViewBtn).toBe('SEARCH.ASSET_VIEW_LIST_BTN_TITLE');
      });

      it('returns \'SEARCH.ASSET_VIEW_GRID_BTN_TITLE\' when assetView is not \'grid\'', () => {
        componentUnderTest.assetView = 'list';
        expect(componentUnderTest.titleForAssetViewBtn).toBe('SEARCH.ASSET_VIEW_GRID_BTN_TITLE');
      });
    });

    describe('get iconForAssetViewBtn()', () => {
      it('returns \'view_list\' when assetView is \'grid\'', () => {
        componentUnderTest.assetView = 'grid';
        expect(componentUnderTest.iconForAssetViewBtn).toBe('view_list');
      });

      it('returns \'view_comfy\' when assetView is not \'grid\'', () => {
        componentUnderTest.assetView = 'list';
        expect(componentUnderTest.iconForAssetViewBtn).toBe('view_comfy');
      });
    });

    describe('onClickAssetViewBtn()', () => {
      beforeEach(() => {
        spyOn(componentUnderTest.onChangeAssetView, 'emit');
      });

      it('emits the event with \'list\' when the current assetView is \'grid\'', () => {
        componentUnderTest.assetView = 'grid';
        componentUnderTest.onClickAssetViewBtn();
        expect(componentUnderTest.onChangeAssetView.emit).toHaveBeenCalledWith('list');
      });

      it('emits the event with \'grid\' when the current assetView is \'list\'', () => {
        componentUnderTest.assetView = 'list';
        componentUnderTest.onClickAssetViewBtn();
        expect(componentUnderTest.onChangeAssetView.emit).toHaveBeenCalledWith('grid');
      });
    });

    describe('onClickAddAllBtn()', () => {
      it('emits the \'clickAddAllButton\' event', () => {
        spyOn(componentUnderTest.clickAddAllBtn, 'emit');
        componentUnderTest.onClickAddAllBtn();
        expect(componentUnderTest.clickAddAllBtn.emit).toHaveBeenCalled();
      });
    });
  });
}
