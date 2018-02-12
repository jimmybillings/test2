import { Observable } from 'rxjs/Observable';
import { AppLoadingIndicatorComponent } from './app-loading-indicator.component';
import { MockAppStore } from '../../store/spec-helpers/mock-app.store';

export function main() {
  describe('App Loading Indicator Component', () => {
    let componentUnderTest: AppLoadingIndicatorComponent;
    let mockAppStore: MockAppStore;

    beforeEach(() => {
      mockAppStore = new MockAppStore();
      componentUnderTest = new AppLoadingIndicatorComponent(mockAppStore);
    });

    describe('showLoadingIndicator getter', () => {
      it('returns true when the value in the store is true', () => {
        mockAppStore.createStateSection('loadingIndicator', { show: true });
        let showLoading: boolean;
        componentUnderTest.showLoadingIndicator.take(1).subscribe(loading => showLoading = loading);
        expect(showLoading).toBe(true);
      });

      it('returns false when the value in the store is false', () => {
        mockAppStore.createStateSection('loadingIndicator', { show: false });
        let showLoading: boolean;
        componentUnderTest.showLoadingIndicator.take(1).subscribe(loading => showLoading = loading);
        expect(showLoading).toBe(false);
      });
    });
  });
}
