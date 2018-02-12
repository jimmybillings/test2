import {
  Directive,
  HostListener,
  Output,
  EventEmitter,
  ViewContainerRef,
  Renderer,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  OverlayConfig,
  OverlayRef,
  Overlay,
  GlobalPositionStrategy,
} from '@angular/cdk/overlay';

import {
  TemplatePortalDirective,
  ComponentPortal
} from '@angular/cdk/portal';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import {
  SpeedviewData,
  SpeedviewEvent
} from '../../../interfaces/asset.interface';

import { Coords, Viewport, Asset } from '../../../interfaces/common.interface';
import { EnhancedAsset } from '../../../interfaces/enhanced-asset';
import { SpeedViewPositionCalculator } from './wz.speedview-position-calculator';
import { WzSpeedviewComponent } from './wz.speedview.component';

import { AppStore } from '../../../../app.store';

@Directive({ selector: '[wzSpeedview]' })
export class WzSpeedviewDirective implements OnDestroy, OnInit {

  @Input()
  set wzSpeedview(value: EnhancedAsset) {
    this.enhancedAsset = value;
  }

  private config: OverlayConfig;
  private speedViewInstance: WzSpeedviewComponent;
  private overlayRef: OverlayRef;
  private speedViewDataSubscription: Subscription;
  private scollListener: Function;
  private enhancedAsset: EnhancedAsset;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private overlay: Overlay,
    private renderer: Renderer,
    private store: AppStore) {
  }

  ngOnInit() {
    this.config = new OverlayConfig();
  }

  ngOnDestroy() {
    this.destroySpeedView();
  }

  @HostListener('mouseenter', ['$event'])
  public onMouseEnter($event: any): void {
    this.loadOverlay($event.currentTarget.getBoundingClientRect());
    this.loadSpeedView();
  }

  @HostListener('mouseleave', ['$event'])
  public onMouseLeave(): void {
    this.destroySpeedView();
  }

  @HostListener('click', ['$event'])
  public onClick(): void {
    this.destroySpeedView();
  }

  private loadOverlay(viewPort: Viewport): void {
    const coords: Coords = SpeedViewPositionCalculator.calculate(viewPort);
    this.config.positionStrategy = this.positionStrategy(coords);
    this.overlayRef = this.overlay.create(this.config);
  }

  private loadSpeedView(): void {
    this.displaySpeedViewDialog();

    this.speedViewDataSubscription = this.loadSpeedViewData
      .subscribe();

    this.scollListener = this.renderer
      .listenGlobal('document', 'scroll', () => this.destroySpeedView());
  }

  private displaySpeedViewDialog(): void {
    this.speedViewInstance = this.overlayRef.attach(this.speedViewComponent).instance;
    this.speedViewInstance.merge({ posterUrl: this.enhancedAsset.thumbnailUrl });
    this.speedViewInstance!.show();
  }

  private destroySpeedView(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }

    if (this.speedViewDataSubscription) {
      this.speedViewDataSubscription.unsubscribe();
    }

    if (this.scollListener) {
      this.scollListener();
    }

    this.speedViewInstance = null;
  }

  private positionStrategy(coordinates: Coords): GlobalPositionStrategy {
    return this.overlay
      .position()
      .global()
      .top(`${coordinates.y}px`)
      .left(`${coordinates.x}px`);
  }

  private get speedViewComponent(): ComponentPortal<WzSpeedviewComponent> {
    return new ComponentPortal(WzSpeedviewComponent, this.viewContainerRef);
  }

  private get speedViewData(): SpeedviewData {
    return this.store.snapshot(state => state.speedPreview[this.enhancedAsset.assetId]);
  }

  private get loadSpeedViewData(): Observable<boolean> {
    return this.store.blockUntil(state => !!state.speedPreview[this.enhancedAsset.assetId])
      .do(() => this.speedViewInstance.merge(this.speedViewData));
  }
}
