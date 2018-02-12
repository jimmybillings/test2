import { Injectable } from '@angular/core';

@Injectable()
export class GalleryViewCapabilities {
  public haveGalleryView(): boolean {
    return true;
  }
}
