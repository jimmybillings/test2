import {
  Viewport,
  Coords
} from '../../../interfaces/common.interface';

export interface SpeedViewPositionCalculatorInterface {
  calculate: Function;
  _currentViewPort: Viewport;
  _determineHorizontalPreviewPlacement: number;
  _determineVerticalPreviewPlacement: number;
  _roomToTheRight: boolean;
  _roomAbove: boolean;
  _roomBelow: boolean;
  _previewWidth: number;
  _previewHeight: number;
  _horizontalPadding: number;
  _verticalPadding: number;
  _delay: number;
}

export const SpeedViewPositionCalculator: SpeedViewPositionCalculatorInterface = {

  // Public Factory method that Determines the x and y coordinates
  // that the preview's top left corner should start at
  calculate(viewPort: Viewport): Coords {
    this._currentViewPort = viewPort;
    let x: number = this._determineHorizontalPreviewPlacement;
    let y: number = this._determineVerticalPreviewPlacement;
    return { x, y };
  },

  //
  // ----------- START OF PRIVATE INTERFACE ----------- //
  //

  // The getBoundingClientRect current target event
  _currentViewPort: null,

  // How wide the speed preview dialog is
  _previewWidth: 420,

  // How tall the speed preview dialog is
  _previewHeight: 300,

  // How much room we want on each side of the speed preview
  _horizontalPadding: 10,

  // How much room we want above and below the preview
  _verticalPadding: 20,

  // How long we want to wait before showing the preview
  _delay: 200,

  // Returns an x coordinate based on the position of the element that was hovered upon
  // if there is no room to the right, it shifts the preview left by its width, and the width of the horizontal padding
  get _determineHorizontalPreviewPlacement(): number {
    if (this._roomToTheRight) {
      return this._currentViewPort.right + this._horizontalPadding;
    } else {
      return this._currentViewPort.left - this._previewWidth - this._horizontalPadding;
    }
  },

  // Returns a y coordinate based on the position of the element that was hovered upon
  // if there is not room on the bottom, it shifts the preview up by its height, and half the height of the hovered element
  get _determineVerticalPreviewPlacement(): number {
    if (this._roomBelow && this._roomAbove) {
      return this._currentViewPort.top - (this._previewHeight / 3);
    } else if (!this._roomBelow) {
      return window.innerHeight - this._previewHeight - this._verticalPadding;
    } else {
      return 0 + this._verticalPadding;
    }
  },

  // Returns true if there is at least 10px to the right of the hovered element
  get _roomToTheRight(): boolean {
    return window.innerWidth - this._currentViewPort.right - this._previewWidth >= this._horizontalPadding;
  },

  // Returns true if there is at least 20px above the hovered element
  get _roomAbove(): boolean {
    return 0 + this._currentViewPort.top - (this._previewHeight / 3) >= this._verticalPadding;
  },

  // Returns true if there is at least 20px below the hovered element
  get _roomBelow(): boolean {
    return window.innerHeight - (this._currentViewPort.top - (this._previewHeight / 3) + this._previewHeight) >= this._verticalPadding;
  }
};
