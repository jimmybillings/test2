import { Component, Input, Output, EventEmitter, NgZone, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

declare var jwplayer: any;

@Component({
  moduleId: module.id,
  selector: 'home-hero',
  template: `
    <div *ngIf="isVideo" class="hero-video-container" [ngClass]="{'fade-in' : !isVideoHidden}">
      <div id="hero-video"></div>
    </div>
    <div class="hero-image-container" *ngIf="!isVideo">
      <div class="hero-image"></div>
    </div>
    <header class="hero">
      <div layout="row" mat-scroll-y="" layout-align="center start" layout-padding>
        <div flex-gt-lg="35" flex-lg="40" flex-md="50" flex-gt-sm="55" flex-gt-xs="70" flex="100">
          <div layout="column" layout-align="center">
            <div class="logo-wrapper">
              <div class="logo"></div>
            </div>
            <wz-autocomplete-search
              [config]="config"
              [currentUser]="currentUser" 
              (searchContext)="searchContext.emit($event)">
            </wz-autocomplete-search>
            <h4 class="mat-headline">{{ 'HOME.SEARCH_HEADING' | translate }}</h4>
          </div>
        </div>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeHeroComponent {
  @Input() config: any;
  @Input() currentUser: any;
  @Input() isVideo: boolean;
  @Input()
  set playlist(value: any) {
    if (value !== null) this.setUpVideo(value, 'hero-video');
  }
  @Output() searchContext: any = new EventEmitter();

  public isVideoHidden: boolean = true;
  public heroVideo: any;

  constructor(
    private _zone: NgZone,
    private changeDetector: ChangeDetectorRef) {
  }

  private setUpVideo(video: any, elementId: string): void {
    this.heroVideo = jwplayer(elementId).setup({
      autostart: true,
      controls: false,
      playlist: video,
      androidhls: false,
      mute: true,
      repeat: false,
      stretching: 'fill',
      height: '100%',
      width: '100%'
    }).on('play', () => {
      this._zone.run(() => {
        this.isVideoHidden = false;
        this.changeDetector.markForCheck();
      });
    });
  }
}
