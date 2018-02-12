import { Injectable, Renderer2 } from '@angular/core';

import { Pojo } from '../../../../interfaces/common.interface';
import { AppStore } from '../../../../../app.store';
import { CurrentUserService } from '../../../../services/current-user.service';
import { EnhancedAsset } from '../../../../interfaces/enhanced-asset';

export interface WzPlayerOverlayHelperParameters {
  readonly window: Window;
  readonly enhancedAsset: EnhancedAsset;
  readonly containerElement: HTMLElement;
  readonly currentlyPlaying: () => boolean;
  readonly getCurrentControlsHeight: () => number;
  readonly onTimeUpdate: (callback: () => void) => void;
  readonly offTimeUpdate: () => void;
  readonly onPlay: (callback: () => void) => void;
  readonly onPause: (callback: () => void) => void;
  readonly onComplete: (callback: () => void) => void;
};

@Injectable()
export class WzPlayerOverlayHelper {
  private initialized: boolean = false;
  private enabled: boolean = false;
  private active: boolean = false;
  private overlayId: string;
  private overlay: any;
  private config: { [key: string]: string } = {};
  private currentText: string = 'private';
  private styles: Pojo = {};
  private intervalId: number = null;
  private parameters: WzPlayerOverlayHelperParameters;

  constructor(
    private renderer: Renderer2, private store: AppStore, private currentUserService: CurrentUserService
  ) { }

  public displayWith(parameters: WzPlayerOverlayHelperParameters): void {
    this.initializeIfNecessary();
    if (!this.enabled) return;

    this.active = true;
    this.parameters = parameters;
    this.replaceVariablesInDisplayText();
    this.updateOverlay();
    this.ensureContinuousOverlayPresence();
  }

  public destroy(): void {
    if (!this.active) return;
    this.active = false;

    this.stopPeriodicUpdates();
    this.stopPlaybackBasedUpdates();
    this.removeOverlay();
  }

  //// End of public interface

  private initializeIfNecessary(): void {
    if (this.initialized) return;
    this.initialized = true;

    this.readConfig();
    if (!this.enabled) return;

    this.buildStyles();
  }

  private readConfig(): void {
    const components: Pojo = this.store.snapshotCloned(state => state.uiConfig.components);

    if (!components.hasOwnProperty('playerOverlay') || !components.playerOverlay.hasOwnProperty('config')) return;

    // Until we get the newer simpler UI config, get rid of the "value" middlemen.
    // (And also look forward to the day when we'll have some stronger typing.)
    const rawConfig: Pojo = components.playerOverlay.config;
    Object.keys(rawConfig).forEach(key => this.config[key] = rawConfig[key].value);

    if (this.config.enabled !== 'true' || !this.config.userDisplayText) return;

    this.enabled = true;
  }

  private buildStyles(): void {
    const fontSize: number = 'fontSizeInPixels' in this.config ? parseFloat(this.config.fontSizeInPixels) : 20;

    this.styles = {
      position: 'absolute',
      left: '0',
      width: '100%',
      'text-align': 'center',
      'font-size': `${fontSize}px`,
      'line-height': `${fontSize}px`,
      padding: `${fontSize / 2}px`,
      color: this.calculateRgbaStyleFor(this.config.textColor, 0xFFFFFF, this.config.textOpacity, 0.75),
      'background-color': this.calculateRgbaStyleFor(this.config.backgroundColor, 0, this.config.backgroundOpacity, 0.5)
    };

    switch (this.config.position) {
      case 'bottom':
        this.styles.bottom = `${fontSize}px`;
        break;

      case 'middle':
        this.styles.top = '50%';
        break;

      default: // 'top'
        this.styles.top = `${fontSize}px`;
    }
  }

  private calculateRgbaStyleFor(color: string, defaultColor: number, opacity: string, defaultOpacity: number): string {
    let colorDigits: string = (color || '').toLowerCase().replace(/^0x/, '').replace(/[^0-9a-f]/g, '');
    if (colorDigits.length === 3) colorDigits = colorDigits.split('').map(digit => `${digit}${digit}`).join('');

    const colorNumber: number = colorDigits.length === 6 ? parseInt(colorDigits, 16) : defaultColor;
    const rgb: string = `${(colorNumber >> 16) & 255},${(colorNumber >> 8) & 255},${colorNumber & 255}`;

    const parsedOpacity: number = parseFloat(opacity);
    let alpha: number = parsedOpacity === 0
      ? 0
      : !parsedOpacity
        ? defaultOpacity
        : parsedOpacity;

    if (alpha < 0) alpha = 0;
    if (alpha > 100) alpha = 1;
    if (alpha > 1) alpha /= 100;

    return `rgba(${rgb},${alpha})`;
  }

  private ensureContinuousOverlayPresence(): void {
    if (this.parameters.currentlyPlaying()) {
      this.startPlaybackBasedUpdates();
    } else {
      this.startPeriodicUpdates();
    }

    this.parameters.onPlay(() => {
      this.stopPeriodicUpdates();
      this.startPlaybackBasedUpdates();
    });

    this.parameters.onPause(() => {
      this.stopPlaybackBasedUpdates();
      this.startPeriodicUpdates();
    });

    this.parameters.onComplete(() => {
      this.stopPlaybackBasedUpdates();
      this.startPeriodicUpdates();
    });
  }

  private startPlaybackBasedUpdates(): void {
    this.parameters.onTimeUpdate(this.updateOverlay.bind(this));
  }

  private stopPlaybackBasedUpdates(): void {
    this.parameters.offTimeUpdate();
  }

  private startPeriodicUpdates(): void {
    this.intervalId = this.parameters.window.setInterval(this.updateOverlay.bind(this), 500);
  }

  private stopPeriodicUpdates(): void {
    if (this.intervalId) this.parameters.window.clearInterval(this.intervalId);
    this.intervalId = null;
  }

  private updateOverlay(): void {
    const foundSecurityOverlay: HTMLElement = this.overlayId
      ? this.parameters.window.document.getElementById(this.overlayId)
      : null;

    if (!foundSecurityOverlay) {
      this.createOverlay();
    } else if (foundSecurityOverlay.innerText !== this.currentText) {
      this.removeOverlay();
      this.createOverlay();
    }

    const styles: Pojo = 'bottom' in this.styles
      ? { ...this.styles, bottom: `${parseFloat(this.styles.bottom) + this.parameters.getCurrentControlsHeight()}px` }
      : this.styles;

    Object.keys(styles).forEach(styleName => this.renderer.setStyle(this.overlay, styleName, styles[styleName]));
  }

  private removeOverlay(): void {
    this.renderer.removeChild(this.parameters.containerElement, this.overlay);
    this.overlay = null;
  }

  private createOverlay(): void {
    this.overlay = this.renderer.createElement('div');
    this.overlayId = `username-${Math.floor(Math.random() * 10000000 + 1234567)}`;
    this.renderer.setAttribute(this.overlay, 'id', this.overlayId);

    this.renderer.appendChild(this.overlay, this.renderer.createText(this.currentText));
    this.renderer.appendChild(this.parameters.containerElement, this.overlay);
  }

  private replaceVariablesInDisplayText(): void {
    this.currentText = this.config.userDisplayText.replace(/\{\{\s*(.*?)\s*}}/g, (_, field) => this.getValueFor(field));
  }

  private getValueFor(field: string): string {
    const badFieldIndicator: string = `{{${field}???}}`;
    const [baseObjectName, ...propertyPath] = field.split('.'); // 'a.b.c' => baseObjectName = 'a', propertyPath = ['b', 'c']
    const finalPropertyIndex: number = propertyPath.length - 1;

    // Walk the field.  Each 'previousObject' is the result of evaluating a path segment.  For example, for
    // 'user.account.name', we expect 'user' to be a known base object, then 'account' to be an object within 'user',
    // then 'name' to be a non-object value within 'user.account'.  If all of that is true, we can return the found
    // 'name'.  Otherwise, we return '{{user.account.name???}}' to indicate the configured field doesn't make sense.

    if (propertyPath.length === 0) return badFieldIndicator; // Gotta be at least 'something.something'.

    const baseObject: Pojo = this.getBaseObjectFor(baseObjectName);
    if (!baseObject) return badFieldIndicator;

    return propertyPath.reduce(
      (previousObject, propertyName, index) => {
        if (String(previousObject) === badFieldIndicator) return badFieldIndicator;
        if (!(propertyName in previousObject)) return badFieldIndicator;

        const value: any = previousObject[propertyName];
        const valueIsObject: boolean = this.isObject(value);
        const valueShouldBeObject: boolean = index < finalPropertyIndex;

        return valueIsObject && valueShouldBeObject || !valueIsObject && !valueShouldBeObject ? value : badFieldIndicator;
      },
      baseObject
    );
  }

  private getBaseObjectFor(objectName: string): Pojo {
    switch (objectName) {
      case 'user': return this.currentUserService.state;
      case 'asset': return this.parameters.enhancedAsset;
    }

    return null;
  }

  private isObject(thing: any): boolean {
    return Object(thing) === thing;
  }
}
