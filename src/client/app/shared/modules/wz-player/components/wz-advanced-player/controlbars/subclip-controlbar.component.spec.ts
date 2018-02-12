import { SubclipControlbarComponent } from './subclip-controlbar.component';
import { PlayerRequest } from '../../../interfaces/player.interface';

export function main() {
  describe('Subclip Controlbar Component', () => {
    let componentUnderTest: SubclipControlbarComponent;

    beforeEach(() => {
      componentUnderTest = new SubclipControlbarComponent();
      componentUnderTest.request.emit = jasmine.createSpy('request emitter');
    });

    describe('forward()', () => {
      it('forwards request events', () => {
        const mockRequest: PlayerRequest = {} as PlayerRequest;

        componentUnderTest.forward(mockRequest);

        expect(componentUnderTest.request.emit).toHaveBeenCalledWith(mockRequest);
      });
    });
  });
}
