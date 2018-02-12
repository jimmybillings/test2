import { PlayerControlbarComponent } from './player-controlbar.component';
import { PlayerRequest } from '../../../interfaces/player.interface';

export function main() {
  describe('Player Controlbar Component', () => {
    let componentUnderTest: PlayerControlbarComponent;

    beforeEach(() => {
      componentUnderTest = new PlayerControlbarComponent();
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
