import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class GalleryViewGuard implements CanActivate {
  canActivate() {
    return true;
  }
}
