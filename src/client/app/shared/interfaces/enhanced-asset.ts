import { Frame, TimecodeFormat } from '../../shared/modules/wazee-frame-formatter/index';
import { SubclipMarkers } from '../interfaces/subclip-markers';
import * as commerce from '../interfaces/commerce.interface';
import * as common from '../interfaces/common.interface';

interface InternalCache {
  [index: string]: any;
}

export type AssetType = 'collection' | 'quoteEdit' | 'search' | 'quoteShow' | 'order' | 'cart';
export type AccessPath = 'ContentFilter' | 'ParentObject' | 'ShareUser';

export function enhanceAsset(asset: commerce.Asset | common.Asset, type: AssetType, parentId?: Number | string): EnhancedAsset {
  return Object.assign(new EnhancedAsset(), asset, { type, parentId }).normalize();
}

export class EnhancedAsset implements commerce.Asset, common.Asset {
  // defined in two or more of the following sources
  public readonly assetId: number;
  public readonly type?: AssetType;
  public readonly parentId?: number;
  public readonly uuid?: string;
  public readonly timeStart?: number;
  public readonly timeEnd?: number;
  public clipUrl?: string;  // not readonly because we might have to update after instantiation
  public readonly hasDownloadableComp?: boolean;
  public readonly name: string;  // clip name in common.Asset, something else in clip API response
  public readonly primary?: Array<{ value: string }> | commerce.Metadatum[];
  public readonly transcodeTargets?: string[];
  public readonly accessPath: AccessPath;

  // defined in commerce.Asset only
  public readonly assetName?: string;
  public readonly assetDuration?: number;
  public readonly metadata?: commerce.Metadatum[];
  public readonly rightsManaged?: string;
  public readonly supplierId?: number;
  public readonly supplierName?: string;
  public readonly thumbnailUrl?: string;

  // defined in common.Asset only
  public readonly metaData?: commerce.Metadatum[];
  public readonly thumbnail?: { name: string, urls: common.AssetUrls };
  public readonly smallPreview?: { name: string, urls: common.AssetUrls };
  public readonly detailTypeMap?: any;

  // defined by API response to clip/<id>/clipData
  public readonly clipThumbnailUrl?: string;
  public readonly common?: commerce.Metadatum[];
  public readonly filter?: string;
  public readonly price?: number;
  public readonly resourceClass?: string;
  public readonly secondary?: object[];


  private calculationCache: InternalCache = {};

  //// asset duration

  public get durationFrame(): Frame {
    return this.getCached('durationFrame');
  }

  public get durationFrameNumber(): number {
    return this.frameNumberFrom(this.durationFrame);
  }

  public get durationMilliseconds(): number {
    return this.getCached('durationMilliseconds');
  }

  //// subclip duration

  public get subclipDurationFrame(): Frame {
    return this.getCached('subclipDurationFrame');
  }

  public get subclipDurationFrameNumber(): number {
    return this.frameNumberFrom(this.subclipDurationFrame);
  }

  public get subclipDurationMilliseconds(): number {
    return this.millisecondsFrom(this.subclipDurationFrame);
  }

  public get subclipDurationPercentage(): number {
    return this.percentageFor(this.subclipDurationFrame);
  }

  //// in marker

  public get inMarkerFrame(): Frame {
    return this.getCached('inMarkerFrame');
  }

  public get inMarkerFrameNumber(): number {
    return this.frameNumberFrom(this.inMarkerFrame);
  }

  public get inMarkerMilliseconds(): number {
    return this.millisecondsFrom(this.inMarkerFrame);
  }

  public get inMarkerPercentage(): number {
    return this.percentageFor(this.inMarkerFrame);
  }

  //// out marker

  public get outMarkerFrame(): Frame {
    return this.getCached('outMarkerFrame');
  }

  public get outMarkerFrameNumber(): number {
    return this.frameNumberFrom(this.outMarkerFrame);
  }

  public get outMarkerMilliseconds(): number {
    return this.millisecondsFrom(this.outMarkerFrame);
  }

  public get outMarkerPercentage(): number {
    return this.percentageFor(this.outMarkerFrame);
  }

  //// metadata

  public getMetadataValueFor(metadataName: string): string {
    return this.findMetadataValueFor(metadataName);
  }

  public convertMetadataValueFor(metadataName: string, converter: (value: string) => any): any {
    const value: string = this.getMetadataValueFor(metadataName);

    return value ? converter(value) : undefined;
  }

  //// other assorted information

  public get subclipMarkers(): SubclipMarkers {
    return {
      in: this.timeStart && this.timeStart >= 0 ? this.inMarkerFrame : undefined,
      out: this.timeEnd && this.timeEnd >= 0 ? this.outMarkerFrame : undefined
    };
  }

  public get title(): string {
    return this.getCached('title');
  }

  public get description(): string {
    return this.getCached('description');
  }

  public get formatType(): string {
    return this.getCached('formatType');
  }

  public get isImage(): boolean {
    return this.resourceClass === 'Image';
  }

  public get framesPerSecond(): number {
    return this.getCached('framesPerSecond');
  }

  public get isSubclipped(): boolean {
    return this.timeStart >= 0 || this.timeEnd >= 0;
  }

  public get routerLink(): any[] {
    return this.getCached('routerLink');
  }

  public get isViewable(): boolean {
    return this.accessPath === 'ContentFilter';
  }

  public get isChildOfViewableObject(): boolean {
    return this.accessPath === 'ParentObject';
  }

  //// for initialization -- merges differently defined asset properties into a normalized set

  public normalize(): EnhancedAsset {
    // make 'assetName' available as 'name'
    if (!this.name && !!this.assetName) Object.assign(this, { name: this.assetName });

    // make the deeply nested thumbnail URL available as 'thumbnailUrl'
    if (!this.thumbnailUrl && !!this.thumbnail && !!this.thumbnail.urls && !!this.thumbnail.urls.https) {
      Object.assign(this, { thumbnailUrl: this.thumbnail.urls.https });
    }

    // make 'clipThumbnailUrl' available as 'thumbnailUrl'
    if (!this.thumbnailUrl && !!this.clipThumbnailUrl) {
      Object.assign(this, { thumbnailUrl: this.clipThumbnailUrl });
    }

    // ensure that 'timeStart' and 'timeEnd' are numbers (commerce.Asset), not strings (common.Asset)
    Object.assign(this, { timeStart: parseInt(`${this.timeStart}`), timeEnd: parseInt(`${this.timeEnd}`) });

    // pull 'resourceClass' from metadata if it wasn't passed in explicitly
    if (!this.resourceClass) {
      Object.assign(this, { resourceClass: this.getMetadataValueFor('Resource.Class') });
    }

    // make 'metaData' (uppercase D) available as 'metadata' (lowercase d)
    if (!this.metadata && !!this.metaData) {
      Object.assign(this, { metadata: this.metaData });
    }

    // make 'primary' available as 'metadata'
    if (!this.metadata && !!this.primary) {
      Object.assign(this, { metadata: this.primary });
    }

    if (this.detailTypeMap && this.detailTypeMap.common && Object.keys(this.detailTypeMap.common).length > 0) {
      Object.assign(this, this.detailTypeMap);
    }

    return this;
  }

  //// private methods

  private getCached(key: string): any {
    if (!this.calculationCache.hasOwnProperty(key)) this.calculationCache[key] = this.calculateValueFor(key);

    return this.calculationCache[key];
  }

  private calculateValueFor(key: string): any {
    switch (key) {
      case 'description':
        // TODO: Site config should set the name of the metadata that holds whichever description field the current site
        // wants to use, and this function should call this.getMetadataFor() with that metadata name.
        // But for now, we must rely on the site config to place the 'description' metadata into array location 1.
        return this.findMetadataValueAtIndex(1);

      case 'durationFrame':
        return this.framesPerSecond && this.durationMilliseconds
          ? this.newFrame.setFromSeconds(this.durationMilliseconds / 1000)
          : undefined;

      case 'durationMilliseconds':
        return this.convertMetadataValueFor('Format.Duration', value => {
          // If value is formatted as 'HH:MM:SS', add ';00' to make it 'HH:MM:SS;FF', and treat it as a timecode.
          // Otherwise, treat it as a numeric value of milliseconds.
          return value.indexOf(':') === -1
            ? parseInt(value)
            : (this.framesPerSecond
              ? this.millisecondsFrom(this.newFrame.setFromString(`${value};00`, TimecodeFormat.SIMPLE_TIME_CONVERSION))
              : undefined);
        });

      case 'formatType':
        return this.getMetadataValueFor('TE.DigitalFormat');

      case 'framesPerSecond':
        return this.convertMetadataValueFor('Format.FrameRate', value => parseFloat(value));

      case 'inMarkerFrame':
        return this.framesPerSecond
          ? this.newFrame.setFromSeconds(this.timeStart >= 0 ? this.timeStart / 1000 : 0)
          : undefined;

      case 'outMarkerFrame':
        return this.framesPerSecond
          ? (this.timeEnd >= 0 ? this.newFrame.setFromSeconds(this.timeEnd / 1000) : this.durationFrame)
          : undefined;

      case 'routerLink':
        return this.createRouterLink();

      case 'subclipDurationFrame':
        return this.framesPerSecond && this.inMarkerFrame && this.outMarkerFrame
          ? this.newFrame.setFromFrameNumber(this.outMarkerFrameNumber - this.inMarkerFrameNumber)
          : undefined;

      case 'title':
        // TODO: Site config should set the name of the metadata that holds whichever title field the current site
        // wants to use, and this function should call this.getMetadataFor() with that metadata name.
        // But for now, we must rely on the site config to place the 'title' metadata into array location 0.
        return this.findMetadataValueAtIndex(0);

      default:
        throw new Error(`Value calculation for '${key}' is missing.`);
    }
  }


  private createRouterLink(): any[] {
    switch (this.type) {
      case 'collection':
        return [`/collections/${this.parentId}/asset/${this.uuid}`];

      case 'quoteEdit':
        return [`/active-quote/asset/${this.uuid}`];

      case 'search':
        return [`/search/asset/${this.assetId}`];

      case 'quoteShow':
        return [`/quotes/${this.parentId}/asset/${this.uuid}`];

      case 'order':
        return [`/orders/${this.parentId}/asset/${this.uuid}`];

      case 'cart':
        return [`/cart/asset/${this.uuid}`];
    }
  }

  private get newFrame(): Frame {
    return new Frame(this.framesPerSecond);
  }

  private frameNumberFrom(frame: Frame): number {
    return frame ? frame.asFrameNumber() : undefined;
  }

  private millisecondsFrom(frame: Frame): number {
    return frame ? frame.asMilliseconds() : undefined;
  }

  private percentageFor(frame: Frame): number {
    return frame && this.durationFrameNumber ? this.frameNumberFrom(frame) * 100 / this.durationFrameNumber : 0;
  }

  private findMetadataValueFor(metadataName: string, object: any = this): string {
    if (object !== Object(object)) return undefined;
    if (object.name === metadataName && object.hasOwnProperty('value')) return object.value;

    for (var key of Object.keys(object)) {
      if (object[key]) {
        const value: string = this.findMetadataValueFor(metadataName, object[key]);
        if (value) return value;
      }
    }

    return undefined;
  }

  private findMetadataValueAtIndex(index: number): string {
    return this.metadata && this.metadata[index] ? this.metadata[index].value : undefined;
  }

  private get routerParameters(): any {
    return Object.assign(
      {},
      this.uuid ? { uuid: this.uuid } : null,
      this.timeStart >= 0 ? { timeStart: this.timeStart } : null,
      this.timeEnd >= 0 ? { timeEnd: this.timeEnd } : null
    );
  }
}
