import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { WindowRef } from '../../../services/window-ref.service';
import { GoogleAddress, FormattedGoogleAddress, GoogleAddressComponent } from '../../../interfaces/user.interface';
import { Geolocation, Position, Circle, Autocomplete } from '../../../interfaces/common.interface';

@Injectable()
export class GooglePlacesService {
  public autocomplete: Autocomplete;
  public script: HTMLElement;
  private readonly scriptSrc: string =
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyCzyGsK3zaRGFAEC72nWbdRvBY1Lo92Cfw&libraries=places';
  constructor(private window: WindowRef, @Inject(DOCUMENT) private document: Document) { }

  public geolocate(): void {
    navigator.geolocation.getCurrentPosition((position: Position) => {
      let geolocation: Geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      let circle: Circle = new this.window.nativeWindow.google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      this.autocomplete.setBounds(circle.getBounds());
    });
  }

  public loadPlacesLibrary(callback: Function): void {
    let scripts: NodeListOf<HTMLScriptElement> = this.document.getElementsByTagName('script');
    let i: number = scripts.length, scriptLoaded: boolean = false;

    while (i--) {
      if (scripts[i].src === this.scriptSrc) {
        scriptLoaded = true;
      }
    }

    if (scriptLoaded) {
      this.initAutocomplete(callback);
    } else {
      this.script = this.document.createElement('script');
      Object.assign(this.script, { src: this.scriptSrc, type: 'text/javascript' });
      this.document.body.appendChild(this.script);
      this.script.onload = () => this.initAutocomplete(callback);
    }
  }

  public initAutocomplete = (callback: Function): void => {
    if (this.window.nativeWindow.google) {
      this.autocomplete = new this.window.nativeWindow.google.maps.places.Autocomplete(
        this.document.getElementById('autocomplete'),
        { types: ['address'] }
      );
      this.autocomplete.addListener('place_changed', callback);
    }
  }

  public getPlace(): FormattedGoogleAddress {
    let place: GoogleAddress = this.autocomplete.getPlace();

    return place.address_components.reduce((prev: FormattedGoogleAddress, current: GoogleAddressComponent) => {
      prev[current.types[0]] = { long_name: current.long_name, short_name: current.short_name };
      return prev;
    }, {});
  }
}
