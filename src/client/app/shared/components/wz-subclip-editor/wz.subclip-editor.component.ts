import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { SubclipMarkers, bothMarkersAreSet, neitherMarkersAreSet, markersMatch } from '../../interfaces/subclip-markers';
import { EnhancedAsset } from '../../interfaces/enhanced-asset';
import { Frame } from '../../modules/wazee-frame-formatter/index';

@Component({
  moduleId: module.id,
  selector: 'wz-subclip-editor',
  template: `
    <wz-advanced-player
      [window]="window"
      [asset]="enhancedAsset"
      [displayAllControls]="false"
      (markersInitialization)="onPlayerMarkerChange($event)"
      (markerChange)="onPlayerMarkerChange($event)">
    </wz-advanced-player>

    <section *ngIf="assetHasMarkers" layout="row" layout-align="start center" class="current-in-out-markers">
      <div layout="row" layout-align="start">
        <span>{{ 'ASSET.SAVE_SUBCLIP.CURRENT_MARKERS.LABEL' | translate }}</span>
        <span>
          {{ 'ASSET.SAVE_SUBCLIP.CURRENT_MARKERS.VALUE' | 
            translate:{ in: assetInMarker | timecode, out: assetOutMarker | timecode } }}
        </span>
      </div>
    </section>
    
    <section layout="row" layout-align="end">

      <section layout="row" layout-align="end">
        <button mat-button color="primary"
          title="{{ cancelButtonHoverTextKey | translate }}"
          (click)="onCancelButtonClick()">
          {{ 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.CANCEL.LABEL' | translate }}
        </button>

        <button mat-button class="is-outlined" color="primary"
          *ngIf="!markersAreRemovable"
          [disabled]="!markersAreSavable"
          title="{{ markersSaveButtonHoverTextKey |
            translate:{ in: playerInMarker | timecode, out: playerOutMarker | timecode } }}"
          (click)="onSaveButtonClick()">
          {{ markersSaveButtonLabelKey | translate }}
        </button>
        
        <button mat-button class="is-outlined" color="accent"
          *ngIf="markersAreRemovable"
          [disabled]="markersAreAlreadyUsed"
          title="{{ markersRemoveButtonHoverTextKey | translate }}"
          (click)="onRemoveButtonClick()">
          {{ 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.REMOVE.LABEL' | translate }}
        </button>
      </section>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WzSubclipEditorComponent {
  @Input() window: any;
  @Input() enhancedAsset: EnhancedAsset;
  @Input() alreadyUsedMarkersList: SubclipMarkers[] = [];
  @Output() cancel: EventEmitter<null> = new EventEmitter<null>();
  @Output() save: EventEmitter<SubclipMarkers> = new EventEmitter<SubclipMarkers>();

  private playerMarkers: SubclipMarkers = { in: undefined, out: undefined };

  public get markersAreRemovable(): boolean {
    return this.enhancedAsset.isSubclipped && neitherMarkersAreSet(this.playerMarkers);
  }

  public get markersAreSavable(): boolean {
    return bothMarkersAreSet(this.playerMarkers) && this.markersAreChanged && !this.markersAreAlreadyUsed;
  }

  public get markersAreAlreadyUsed(): boolean {
    return this.alreadyUsedMarkersList
      .some(alreadyUsedMarkers => markersMatch(this.playerMarkers, alreadyUsedMarkers));
  }

  public get cancelButtonHoverTextKey(): string {
    return this.enhancedAsset.isSubclipped
      ? 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.CANCEL.TITLE.UPDATE'
      : 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.CANCEL.TITLE.ADD';
  }

  public get markersSaveButtonLabelKey(): string {
    return this.enhancedAsset.isSubclipped
      ? 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.LABEL.UPDATE'
      : 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.LABEL.ADD';
  }

  public get markersSaveButtonHoverTextKey(): string {
    if (!bothMarkersAreSet(this.playerMarkers)) return this.enhancedAsset.isSubclipped
      ? 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.NOT_READY'
      : 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.NOT_READY';

    if (!this.markersAreChanged) return 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.NOT_CHANGED';

    if (this.markersAreAlreadyUsed) return 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ALREADY_USED';

    return this.enhancedAsset.isSubclipped
      ? 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.READY'
      : 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.READY';
  }

  public get markersRemoveButtonHoverTextKey(): string {
    return this.markersAreAlreadyUsed
      ? 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.REMOVE.TITLE.ALREADY_USED'
      : 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.REMOVE.TITLE.READY';
  }

  public onPlayerMarkerChange(newMarkers: SubclipMarkers): void {
    this.playerMarkers = newMarkers;
  }

  public onCancelButtonClick(): void {
    this.cancel.emit();
  }

  public onSaveButtonClick(): void {
    this.emitSaveEvent();
  }

  public onRemoveButtonClick(): void {
    this.emitSaveEvent();
  }

  public get assetHasMarkers(): boolean {
    return this.enhancedAsset.isSubclipped;
  }

  public get assetInMarker(): Frame {
    return this.enhancedAsset.subclipMarkers.in;
  }

  public get assetOutMarker(): Frame {
    return this.enhancedAsset.subclipMarkers.out;
  }

  public get playerInMarker(): Frame {
    return this.playerMarkers.in;
  }

  public get playerOutMarker(): Frame {
    return this.playerMarkers.out;
  }

  private emitSaveEvent(): void {
    this.save.emit(this.playerMarkers);
  }

  private get markersAreChanged(): boolean {
    return !markersMatch(this.enhancedAsset.subclipMarkers, this.playerMarkers);
  }
}
