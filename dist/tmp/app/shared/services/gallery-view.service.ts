import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../services/api.service';
import { Api, ApiResponse } from '../interfaces/api.interface';
import { GalleryViewStore } from '../stores/gallery-view.store';
import { Gallery, GalleryPath, GalleryPathSegment } from '../interfaces/gallery-view.interface';

@Injectable()
export class GalleryViewService {
  constructor(private store: GalleryViewStore, private api: ApiService) { }

  public get data(): Observable<Gallery> {
    return this.store.data;
  }

  public get state(): Gallery {
    return this.store.state;
  }

  public load(path: GalleryPath): Observable<ApiResponse> {
    let query: string = (path && path.length > 0) ? this.stringifyPathForSearch(path) : null;

    return this.api.get(Api.Assets, 'galleryResult', { loadingIndicator: true, parameters: { query: query } })
      .do((response: any) => this.store.replaceWith(response.list, path));
  }

  public stringifyPathForSearch(path: GalleryPath): string {
    return path.map((segment: GalleryPathSegment) => this.stringifyPathSegmentForSearch(segment)).join(',');
  }

  private stringifyPathSegmentForSearch(segment: GalleryPathSegment): string {
    return segment.ids.map((id: number, index: number) => `${id}:"${segment.names[index]}"`).join(',');
  }

  // TO BE REMOVED (along with the methods it calls)
  private selectFakeResponseFor(index: number): string {
    switch (index) {
      case 0: return this.fakeLevelZeroResponse;
      case 1: return this.fakeLevelTwoResponse;
      case 2: return this.fakeLevelThreeResponse;
    }

    return 'Wha??';
  }

  private get fakeLevelZeroResponse(): string {
    return `
      {
        "results": [
          {
            "id": 2,
            "name": "Highlights",
            "resultCount": 17,
            "hasMore": true,
            "children": [
              {
                "id": 3,
                "name": "Day 1",
                "resultCount": 17,
                "thumbnailUrl": "http://www.masters.com/images/pics/large/h_2016040700348.jpg",
                "hasMore": true
              },
              {
                "id": 3,
                "name": "Day 2",
                "resultCount": 32,
                "thumbnailUrl": "http://www.masters.com/images/pics/large/h_2016040809705.jpg",
                "hasMore": true
              },
              {
                "id": 3,
                "name": "Day 3",
                "resultCount": 41,
                "thumbnailUrl": "http://www.masters.com/images/pics/large/h_2016040910496.jpg",
                "hasMore": true
              },
              {
                "id": 3,
                "name": "Day 4",
                "resultCount": 12,
                "thumbnailUrl": "http://mastersprogressivedl.edgesuite.net/2016/thumbnails/LDR_2016_r4_34046_2_492x277.jpg",
                "hasMore": true
              },
              {
                "id": 3,
                "name": "Day 5",
                "resultCount": 0,
                "thumbnailUrl": "http://www.masters.com/images/pics/large/h_2016040910496.jpg",
                "hasMore": true
              },
              {
                "id": 3,
                "name": "Day 6",
                "resultCount": 0,
                "thumbnailUrl": "http://www.masters.com/images/pics/large/h_2016040809705.jpg",
                "hasMore": true
              },
              {
                "id": 3,
                "name": "Day 7",
                "resultCount": 0,
                "thumbnailUrl": "http://www.masters.com/images/pics/large/h_2016041038412.jpg",
                "hasMore": true
              }
            ]
          },
          {
            "id": 5,
            "name": "Press Packets",
            "resultCount": 4,
            "hasMore": true,
            "children": [
              {
                "id": 6,
                "name": "Day 1",
                "resultCount": 4,
                "thumbnailUrl": "https://cdnt3m-a.akamaihd.net/tem/warehouse/186/234/7/1862347_038_lt.jpg",
                "hasMore": true
              },
              {
                "id": 6,
                "name": "Day 2",
                "resultCount": 3,
                "thumbnailUrl": "https://cdnt3m-a.akamaihd.net/tem/warehouse/186/543/186543_003_lt.jpg",
                "hasMore": true
              },
              {
                "id": 6,
                "name": "Day 3",
                "resultCount": 4,
                "thumbnailUrl": "https://cdnt3m-a.akamaihd.net/tem/warehouse/186/212/6/1862126_026_lt.jpg",
                "hasMore": true
              },
              {
                "id": 6,
                "name": "Day 4",
                "resultCount": 4,
                "thumbnailUrl": "https://cdnt3m-a.akamaihd.net/tem/warehouse/186/MVF/K/186MVFK_060_lt.jpg",
                "hasMore": true
              },
              {
                "id": 6,
                "name": "Day 5",
                "resultCount": 0,
                "thumbnailUrl": "https://cdnt3m-a.akamaihd.net/tem/warehouse/186/543/186543_003_lt.jpg",
                "hasMore": true
              },
              {
                "id": 6,
                "name": "Day 6",
                "resultCount": 0,
                "thumbnailUrl": "https://cdnt3m-a.akamaihd.net/tem/warehouse/186/543/186543_003_lt.jpg",
                "hasMore": true
              },
              {
                "id": 6,
                "name": "Day 7",
                "resultCount": 0,
                "thumbnailUrl": "https://cdnt3m-a.akamaihd.net/tem/warehouse/186/543/186543_003_lt.jpg",
                "hasMore": true
              }
            ]
          },
          {
            "id": 8,
            "name": "Promotional Content",
            "resultCount": 58,
            "hasMore": true,
            "children": [
              {
                "id": 9,
                "name": "Fly-overs",
                "resultCount": 18,
                "thumbnailUrl": "http://www.masters.com/images/pics/large/h_18rANGC15-1rb0278Hc.jpg",
                "hasMore": true
              },
              {
                "id": 9,
                "name": "Master Moments",
                "resultCount": 40,
                "thumbnailUrl": "http://www.masters.com/images/pics/large/h_masters64_palmeron18_angc_83123735_032011.jpg",
                "hasMore": true
              },
              {
                "id": 9,
                "name": "Course Scenics",
                "resultCount": 40,
                "thumbnailUrl": "https://cdnt3m-a.akamaihd.net/tem/warehouse/186/518/1/1865181_001_lt.jpg",
                "hasMore": true
              }
            ]
          }
        ]
      }
    `;
  }

  private get fakeLevelTwoResponse(): string {
    return `
      {
        "results": [
          {
            "id": 4,
            "name": "Jordan Spieth",
            "resultCount": 6,
            "thumbnailUrl": "http://www.masters.com/images/players/2016/480x270/34046.jpg",
            "hasMore": true
          },
          {
            "id": 4,
            "name": "Danny Willett",
            "resultCount": 2,
            "thumbnailUrl": "http://www.masters.com/images/players/2016/480x270/32139.jpg",
            "hasMore": true
          },
          {
            "id": 4,
            "name": "Rory McIlroy",
            "resultCount": 5,
            "thumbnailUrl": "http://www.masters.com/images/players/2016/480x270/28237.jpg",
            "hasMore": true
          },
          {
            "id": 4,
            "name": "Dustin Johnson",
            "resultCount": 4,
            "thumbnailUrl": "http://www.masters.com/images/players/2016/480x270/30925.jpg",
            "hasMore": true
          },
          {
            "id": 4,
            "name": "Bryson DeChambeau",
            "resultCount": 2,
            "thumbnailUrl": "http://www.masters.com/images/players/2016/480x270/47959.jpg",
            "hasMore": true
          },
          {
            "id": 4,
            "name": "Jason Day",
            "resultCount": 3,
            "thumbnailUrl": "http://www.masters.com/images/players/2016/480x270/28089.jpg",
            "hasMore": true
          }
        ]
      }
    `;
  }

  private get fakeLevelThreeResponse(): string {
    return `
      {
        "results": [
          {
            "id": 10,
            "name": "Tee offs",
            "resultCount": 6,
            "thumbnailUrl": "",
            "hasMore": false
          },
          {
            "id": 10,
            "name": "Drives",
            "resultCount": 2,
            "thumbnailUrl": "",
            "hasMore": false
          },
          {
            "id": 10,
            "name": "Putts",
            "resultCount": 5,
            "thumbnailUrl": "",
            "hasMore": false
          }
        ]
      }
    `;
  }
}
