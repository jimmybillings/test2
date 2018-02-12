import * as Commerce from '../interfaces/commerce.interface';
import * as Common from '../interfaces/common.interface';
import { AssetLineItem } from '../interfaces/commerce.interface';

export const mockCommerceAsset: Commerce.Asset = {
  assetId: 38700613,
  assetName: '779MJXY_H33XUP7X1',
  supplierId: 31637614,
  supplierName: 'DOD',
  thumbnailUrl: 'https://cdnt3m-a.akamaihd.net/tem/warehouse/779/MJX/Y/779MJXY_H33XUP7X1_lt.jpg',
  timeStart: 10000,
  timeEnd: 20000,
  uuid: 'bf5a6cfa-05b6-4c13-b2c0-a893bb62cca1'
};

export const mockAsset: Common.Asset = {
  assetId: 38700613,
  name: '779MJXY_H33XUP7X1',
  hasDownloadableComp: true,
  transcodeTargets: ['target1', 'target2'],
  primary: [{ value: 'first' }, { value: 'second' }, { value: 'third' }],
  detailTypeMap: { common: [{ value: 'first' }, { value: 'second' }, { value: 'third' }] },
  uuid: 'bf5a6cfa-05b6-4c13-b2c0-a893bb62cca1',
  timeStart: 10000,
  timeEnd: 20000,
  clipThumbnailUrl: 'https://cdnt3m-a.akamaihd.net/tem/warehouse/779/MJX/Y/779MJXY_H33XUP7X1_lt.jpg',
  clipUrl: 'https://s3-t3m-previewpriv-or-1.s3.amazonaws.com/121/012/121012_022_lp.f4v'
};

export const mockCommerceAssetLineItem: AssetLineItem = {
  id: '123123',
  asset: mockCommerceAsset
};
