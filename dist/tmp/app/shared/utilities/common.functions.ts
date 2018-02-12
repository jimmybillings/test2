import { Pojo } from '../interfaces/common.interface';

export class Common {
  public static deletePropertiesFromObject(object: Pojo, propertiesToDelete: Array<string>) {
    Object.keys(object).forEach((item: string) => {

      // Delete any properties on the object if
      // they are listed in the propertiesToDelete argument.
      if (propertiesToDelete.indexOf(item) > -1) {
        delete object[item];
        return;
      }

      // If the property is another object but not
      // an array then recusively call this function
      // again with the propertie value.
      if (Common.isObject(object[item])) {
        Common.deletePropertiesFromObject(object[item], propertiesToDelete);
      }

      // If the properties value is an array of objects then
      // loop over the array and recursivly call this function
      // again for each object in the array.
      if (Common.isArray(object[item])) {
        object[item].forEach((item: any) => {
          if (typeof item === 'object' && !Array.isArray(item)) {
            Common.deletePropertiesFromObject(item, propertiesToDelete);
          }
        });
      }
    });

    return object;
  }

  public static urlStringToParamsObject(url: string): Pojo {
    var hashes: string | string[] = url.split(/;(.+)/)[1];
    hashes = (hashes) ? hashes.split(';') : [];
    return hashes.reduce((urlObj: Pojo, hash: string) => {
      let param: string[] = hash.split('=');
      urlObj[param[0]] = param[1];
      return urlObj;
    }, {});
  }

  public static urlParamsObjectToUrlStringParams(urlObj: Pojo): string {
    let paramString: string = ';';
    Object.keys(urlObj).forEach((param) => {
      paramString = paramString + param + '=' + urlObj[param] + ';';
    });
    paramString = paramString.slice(0, -1);
    return paramString;
  }

  public static clone<T>(object: T): T {
    try {
      return JSON.parse(JSON.stringify(object));
    } catch (error) {
      return object;
    }
  }

  public static setMarginTop(className: string, document: Document): void {
    const elements = document.getElementsByClassName(className);
    if (elements.length === 0) return;
    const scrollTopMargin: number = -1 * document.body.getBoundingClientRect().top;
    elements[elements.length - 1].setAttribute('style', `margin-top: ${scrollTopMargin}px`);
  }

  public static onCollectionShowPage(url: string): boolean {
    return url.includes('/collections/') && !url.includes('/asset/');
  }

  public static isEmpty(obj: Object): boolean {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
  }

  public static convertToDateInstance(dateString: string): Date {
    const utcDate = new Date(dateString);
    const offsetInMinutes = utcDate.getTimezoneOffset();
    const offsetInMilliseconds = offsetInMinutes * 60 * 1000;
    const fudgeFactor = 500;
    return new Date(utcDate.getTime() + offsetInMilliseconds + fudgeFactor);
  }

  public static isNullOrUndefined(value: any): boolean {
    return typeof value === 'undefined' || value === null;
  }

  public static isNotNullOrUndefined(value: any): boolean {
    return !Common.isNullOrUndefined(value);
  }

  private static isObject(item: any): boolean {
    return Common.isDefined(item) && typeof item === 'object' && !Array.isArray(item);
  }

  private static isArray(item: any): boolean {
    return Common.isDefined(item) && typeof item === 'object' && Array.isArray(item);
  }

  private static isDefined(item: any): boolean {
    return item !== null && item !== undefined && item !== NaN;
  }
}
