import {
  Component, ChangeDetectionStrategy, OnInit, OnDestroy, Input, Output, EventEmitter, ElementRef, Renderer, ChangeDetectorRef
} from '@angular/core';

import { Frame } from '../../../../wazee-frame-formatter/index';
import { PlayerState, PlayerSeekRequest } from '../../../interfaces/player.interface';

@Component({
  moduleId: module.id,
  selector: 'wz-scrubber',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="readyToDisplay">
      <mat-slider
        class="scrubber"
        min="0"
        max="{{ largestFrameNumber }}"
        value="{{ currentFrameNumber }}"
        (input)="onSliderInput()"
        (mouseover)="onMouseOver()"
        (mouseout)="onMouseOut()"
        (mousedown)="onMouseDown()">
      </mat-slider>

      <mat-slider
        *ngIf="inMarkerIsSet"
        [disabled]="true"
        class="marker in"
        min="0"
        max="{{ largestFrameNumber }}"
        value="{{ inMarkerFrameNumber }}"
        (click)="onInMarkerClick()"
        (mouseover)="onMouseOver()"
        (mouseout)="onMouseOut()">
      </mat-slider>

      <mat-slider
        *ngIf="outMarkerIsSet"
        [disabled]="true"
        class="marker out"
        min="0"
        max="{{ largestFrameNumber }}"
        value="{{ outMarkerFrameNumber }}"
        (click)="onOutMarkerClick()"
        (mouseover)="onMouseOver()"
        (mouseout)="onMouseOut()">
      </mat-slider>

      <span *ngIf="hoverFrameDisplayIsVisible" class="hover-frame-display" [style.left.px]="hoverFrameDisplayPosition">
        {{ hoverFrame | playerTimecode:playerState }}
      </span>
    </ng-container>
  `
})

export class ScrubberComponent implements OnInit, OnDestroy {
  @Input() window: any;
  @Input() playerState: PlayerState;
  @Output() request: EventEmitter<PlayerSeekRequest> = new EventEmitter<PlayerSeekRequest>();

  private scrubbing: boolean = false;
  private hovering: boolean = false;
  private _hoverFrameDisplayPosition: number = 0;
  private _hoverFrame: Frame;
  private documentMouseMoveListenerRemover: Function;
  private documentMouseUpListenerRemover: Function;

  constructor(private elementRef: ElementRef, private renderer: Renderer, private changeDetector: ChangeDetectorRef) { }

  public ngOnInit(): void {
    const document = this.window.document;

    this.documentMouseMoveListenerRemover = this.renderer.listen(document, 'mousemove', this.onMouseMove.bind(this));
    this.documentMouseUpListenerRemover = this.renderer.listen(document, 'mouseup', this.onMouseUp.bind(this));
  }

  public ngOnDestroy(): void {
    this.documentMouseMoveListenerRemover();
    this.documentMouseUpListenerRemover();
  }

  public get readyToDisplay(): boolean {
    return this.durationIsSet && this.currentFrameIsSet;
  }

  public get largestFrameNumber(): number {
    return this.durationIsSet ? this.playerState.durationFrame.frameNumber - 1 : undefined;
  }

  public get currentFrameNumber(): number {
    return this.currentFrameIsSet ? this.playerState.currentFrame.frameNumber : undefined;
  }

  public get inMarkerIsSet(): boolean {
    return !!this.playerState && !!this.playerState.inMarkerFrame;
  }

  public get inMarkerFrameNumber(): number {
    return this.inMarkerIsSet ? this.playerState.inMarkerFrame.frameNumber : undefined;
  }

  public get outMarkerIsSet(): boolean {
    return !!this.playerState && !!this.playerState.outMarkerFrame;
  }

  public get outMarkerFrameNumber(): number {
    return this.outMarkerIsSet ? this.playerState.outMarkerFrame.frameNumber : undefined;
  }

  public onSliderInput(): void {
    this.request.emit({ type: 'SEEK_TO_FRAME', frame: this._hoverFrame });
  }

  public onMouseOver(): void {
    this.hovering = true;
  }

  public onMouseOut(): void {
    this.hovering = false;
  }

  public onMouseDown(): void {
    this.scrubbing = true;
  }

  public onInMarkerClick(): void {
    this.request.emit({ type: 'SEEK_TO_MARKER', markerType: 'in' });
  }

  public onOutMarkerClick(): void {
    this.request.emit({ type: 'SEEK_TO_MARKER', markerType: 'out' });
  }

  public get hoverFrameDisplayIsVisible(): boolean {
    return this.hovering || this.scrubbing;
  }

  public get hoverFrameDisplayPosition(): number {
    return this._hoverFrameDisplayPosition;
  }

  public get hoverFrame(): Frame {
    return this._hoverFrame;
  }

  private onMouseMove(event: any): void {
    if (!this.hoverFrameDisplayIsVisible) return;

    this.updateHoverFrameDisplayWith(event.pageX);
    this.changeDetector.markForCheck();  // Because this event is tracked outside the component.
  }

  private onMouseUp(): void {
    this.scrubbing = false;
    this.changeDetector.markForCheck();  // Because this event is tracked outside the component.
  }

  private get durationIsSet(): boolean {
    return !!this.playerState && !!this.playerState.durationFrame;
  }

  private get currentFrameIsSet(): boolean {
    return !!this.playerState && !!this.playerState.currentFrame;
  }

  private updateHoverFrameDisplayWith(pageMouseX: number): void {
    const relativeMouseX: number = pageMouseX - this.scrubberPageOffset;
    const children: any[] = Array.from(this.elementRef.nativeElement.children);
    const scrubber: any = this.findByClassNameIn(children, 'scrubber');
    const frameDisplay: any = this.findByClassNameIn(children, 'hover-frame-display');

    this.updateHoverFrameWith(relativeMouseX, scrubber);
    this.updateHoverFrameDisplayPositionWith(relativeMouseX, scrubber, frameDisplay);
  }

  private get scrubberPageOffset(): number {
    let totalOffset = 0;
    let element = this.elementRef.nativeElement;

    while (element) {
      totalOffset += element.offsetLeft;
      element = element.offsetParent;
    }

    return totalOffset;
  }

  private findByClassNameIn(elementChildren: any, className: string): any {
    return elementChildren.find((child: any) => Array.from(child.classList).indexOf(className) > -1);
  }

  private updateHoverFrameWith(relativeMouseX: number, scrubber: any): void {
    const scrubberTrack: any = this.findByClassNameIn(Array.from(scrubber.children), 'mat-slider-wrapper');
    const scrubberTrackWidth: number = scrubberTrack.offsetWidth;

    let newFrameNumber: number = Math.round(relativeMouseX * this.playerState.durationFrame.frameNumber / scrubberTrackWidth);
    newFrameNumber = this.constrainTo(0, this.playerState.durationFrame.frameNumber, newFrameNumber);

    this._hoverFrame =
      new Frame(this.playerState.framesPerSecond, this.playerState.sourceBasedOffset).setFromFrameNumber(newFrameNumber);
  }

  private updateHoverFrameDisplayPositionWith(relativeMouseX: number, scrubber: any, frameDisplay: any): void {
    const computedStyle: any = this.window.getComputedStyle(frameDisplay);
    const width: number =
      parseFloat(computedStyle.getPropertyValue('width'))
      + parseFloat(computedStyle.getPropertyValue('border-left-width'))
      + parseFloat(computedStyle.getPropertyValue('border-right-width'))
      + parseFloat(computedStyle.getPropertyValue('padding-left'))
      + parseFloat(computedStyle.getPropertyValue('padding-right'));

    const unconstrainedPosition: number = relativeMouseX - (width / 2);
    const minimumPosition: number = 0;
    const maximumPosition: number = scrubber.offsetWidth - width;

    this._hoverFrameDisplayPosition = this.constrainTo(minimumPosition, maximumPosition, unconstrainedPosition);
  }

  private constrainTo(minimumAllowed: number, maximumAllowed: number, value: number) {
    return Math.max(minimumAllowed, Math.min(maximumAllowed, value));
  }
}
