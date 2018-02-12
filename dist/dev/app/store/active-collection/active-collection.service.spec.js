"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var active_collection_service_1 = require("./active-collection.service");
var mock_api_service_1 = require("../spec-helpers/mock-api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
var index_1 = require("../../shared/modules/wazee-frame-formatter/index");
function main() {
    describe('Active Collection Service', function () {
        var serviceUnderTest, mockApiService;
        beforeEach(function () {
            jasmine.addMatchers(mock_api_service_1.mockApiMatchers);
            mockApiService = new mock_api_service_1.MockApiService();
            serviceUnderTest = new active_collection_service_1.ActiveCollectionService(mockApiService.injector);
        });
        describe('load()', function () {
            it('calls the API correctly', function () {
                serviceUnderTest.load({ currentPage: 1, pageSize: 42 });
                expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Assets);
                expect(mockApiService.get).toHaveBeenCalledWithEndpoint('collectionSummary/focused');
                expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
            });
            it('also calls the API correctly to get assets for the loaded collection', function () {
                mockApiService.getResponse = { id: 10836 };
                serviceUnderTest.load({ currentPage: 1, pageSize: 42 }).take(1).subscribe();
                expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Assets);
                expect(mockApiService.get).toHaveBeenCalledWithEndpoint('collectionSummary/assets/10836');
                expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
                expect(mockApiService.get).toHaveBeenCalledWithParameters({ i: '0', n: '42' });
            });
            it('returns the expected observable', function () {
                mockApiService.getResponse = [
                    { id: 10836 },
                    {
                        items: [
                            { id: 123, other: 'stuff', timeStart: '123', timeEnd: '456' },
                            { id: 456, other: 'stuff', timeStart: '-1', timeEnd: '-2' }
                        ],
                        totalCount: 2,
                        currentPage: 0,
                        pageSize: 42,
                        hasNextPage: false,
                        hasPreviousPage: false,
                        numberOfPages: 1
                    }
                ];
                serviceUnderTest.load({ currentPage: 1, pageSize: 42 }).take(1).subscribe(function (response) {
                    expect(response).toEqual({
                        id: 10836,
                        assets: {
                            items: [
                                { id: 123, other: 'stuff', timeStart: 123, timeEnd: 456 },
                                { id: 456, other: 'stuff', timeStart: -1, timeEnd: -2 }
                            ],
                            pagination: {
                                totalCount: 2,
                                currentPage: 1,
                                pageSize: 42,
                                hasNextPage: false,
                                hasPreviousPage: false,
                                numberOfPages: 1
                            }
                        }
                    });
                });
            });
        });
        describe('set()', function () {
            it('calls the API correctly', function () {
                serviceUnderTest.set(999, { currentPage: 1, pageSize: 42 });
                expect(mockApiService.put).toHaveBeenCalledWithApi(api_interface_1.Api.Assets);
                expect(mockApiService.put).toHaveBeenCalledWithEndpoint('collectionSummary/setFocused/999');
                expect(mockApiService.put).toHaveBeenCalledWithLoading(true);
            });
            it('also calls the API correctly to get assets for the new active collection', function () {
                mockApiService.putResponse = { id: 999 };
                serviceUnderTest.set(999, { currentPage: 1, pageSize: 42 }).take(1).subscribe();
                expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Assets);
                expect(mockApiService.get).toHaveBeenCalledWithEndpoint('collectionSummary/assets/999');
                expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
                expect(mockApiService.get).toHaveBeenCalledWithParameters({ i: '0', n: '42' });
            });
            it('returns the expected observable', function () {
                mockApiService.putResponse = { id: 999 };
                mockApiService.getResponse = {
                    items: [
                        { id: 123, other: 'stuff', timeStart: '123', timeEnd: '456' },
                        { id: 456, other: 'stuff', timeStart: '-1', timeEnd: '-2' }
                    ],
                    totalCount: 2,
                    currentPage: 0,
                    pageSize: 42,
                    hasNextPage: false,
                    hasPreviousPage: false,
                    numberOfPages: 1
                };
                serviceUnderTest.set(999, { currentPage: 1, pageSize: 42 }).take(1).subscribe(function (response) {
                    expect(response).toEqual({
                        id: 999,
                        assets: {
                            items: [
                                { id: 123, other: 'stuff', timeStart: 123, timeEnd: 456 },
                                { id: 456, other: 'stuff', timeStart: -1, timeEnd: -2 }
                            ],
                            pagination: {
                                totalCount: 2,
                                currentPage: 1,
                                pageSize: 42,
                                hasNextPage: false,
                                hasPreviousPage: false,
                                numberOfPages: 1
                            }
                        }
                    });
                });
            });
        });
        describe('loadPage()', function () {
            it('calls the API correctly', function () {
                mockApiService.getResponse = { id: 10836 };
                serviceUnderTest.load({ currentPage: 3, pageSize: 10 }).take(1).subscribe();
                expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Assets);
                expect(mockApiService.get).toHaveBeenCalledWithEndpoint('collectionSummary/assets/10836');
                expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
                expect(mockApiService.get).toHaveBeenCalledWithParameters({ i: '2', n: '10' });
            });
            it('returns the expected observable', function () {
                mockApiService.getResponse = {
                    items: [
                        { id: 123, other: 'stuff', timeStart: '123', timeEnd: '456' },
                        { id: 456, other: 'stuff', timeStart: '-1', timeEnd: '-2' }
                    ],
                    totalCount: 2,
                    currentPage: 2,
                    pageSize: 10,
                    hasNextPage: false,
                    hasPreviousPage: false,
                    numberOfPages: 1
                };
                serviceUnderTest.loadPage(10836, { currentPage: 3, pageSize: 10 }).take(1).subscribe(function (response) {
                    expect(response).toEqual({
                        items: [
                            { id: 123, other: 'stuff', timeStart: 123, timeEnd: 456 },
                            { id: 456, other: 'stuff', timeStart: -1, timeEnd: -2 }
                        ],
                        pagination: {
                            totalCount: 2,
                            currentPage: 3,
                            pageSize: 10,
                            hasNextPage: false,
                            hasPreviousPage: false,
                            numberOfPages: 1
                        }
                    });
                });
            });
        });
        describe('loadFocusedPage()', function () {
            it('calls the API correctly', function () {
                serviceUnderTest.loadFocusedPage({ currentPage: 3, pageSize: 10 }, null);
                expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Assets);
                expect(mockApiService.get).toHaveBeenCalledWithEndpoint('collectionSummary/assets/focused');
                expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
                expect(mockApiService.get).toHaveBeenCalledWithParameters({ i: '2', n: '10' });
            });
            it('returns the expected observable', function () {
                mockApiService.getResponse = {
                    items: [
                        { id: 123, other: 'stuff', timeStart: '123', timeEnd: '456' },
                        { id: 456, other: 'stuff', timeStart: '-1', timeEnd: '-2' }
                    ],
                    totalCount: 2,
                    currentPage: 2,
                    pageSize: 10,
                    hasNextPage: false,
                    hasPreviousPage: false,
                    numberOfPages: 1
                };
                serviceUnderTest.loadFocusedPage({ currentPage: 3, pageSize: 10 }, 10).take(1).subscribe(function (response) {
                    expect(response).toEqual({
                        totalAssetsAdded: 10,
                        items: [
                            { id: 123, other: 'stuff', timeStart: 123, timeEnd: 456 },
                            { id: 456, other: 'stuff', timeStart: -1, timeEnd: -2 }
                        ],
                        pagination: {
                            totalCount: 2,
                            currentPage: 3,
                            pageSize: 10,
                            hasNextPage: false,
                            hasPreviousPage: false,
                            numberOfPages: 1
                        }
                    });
                });
            });
        });
        describe('addAssetTo()', function () {
            it('calls the API correctly', function () {
                serviceUnderTest.addAssetTo({ id: 17 }, { assetId: 234 }, { in: new index_1.Frame(30).setFromFrameNumber(30), out: new index_1.Frame(30).setFromFrameNumber(60) });
                expect(mockApiService.post).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                expect(mockApiService.post).toHaveBeenCalledWithEndpoint('collection/focused/addAssets');
                expect(mockApiService.post).toHaveBeenCalledWithBody({ list: [{ assetId: 234, timeStart: '1000', timeEnd: '2000' }] });
                expect(mockApiService.post).toHaveBeenCalledWithLoading(true);
            });
            it('calls the API correctly with no markers', function () {
                serviceUnderTest.addAssetTo({ id: 17 }, { assetId: 234 }, undefined);
                expect(mockApiService.post).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                expect(mockApiService.post).toHaveBeenCalledWithEndpoint('collection/focused/addAssets');
                expect(mockApiService.post).toHaveBeenCalledWithBody({ list: [{ assetId: 234, timeStart: '-1', timeEnd: '-2' }] });
                expect(mockApiService.post).toHaveBeenCalledWithLoading(true);
            });
            it('also calls the API correctly to get the first page of assets for the updated active collection', function () {
                mockApiService.postResponse = { list: ['something'] };
                serviceUnderTest.addAssetTo({ id: 17, assets: { pagination: { pageSize: 200 } } }, { assetId: 234 }, { in: new index_1.Frame(30).setFromFrameNumber(30), out: new index_1.Frame(30).setFromFrameNumber(60) }).subscribe();
                expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Assets);
                expect(mockApiService.get).toHaveBeenCalledWithEndpoint('collectionSummary/assets/17');
                expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
                expect(mockApiService.get).toHaveBeenCalledWithParameters({ i: '0', n: '200' });
            });
            it('returns the expected observable when the body has a list', function () {
                mockApiService.postResponse = { list: ['something'] };
                mockApiService.getResponse = {
                    items: [
                        { id: 123, other: 'stuff', timeStart: '123', timeEnd: '456' },
                        { id: 456, other: 'stuff', timeStart: '-1', timeEnd: '-2' },
                        { id: 234, other: 'stuff', timeStart: '1000', timeEnd: '2000' }
                    ],
                    totalCount: 3,
                    currentPage: 0,
                    pageSize: 200,
                    hasNextPage: false,
                    hasPreviousPage: false,
                    numberOfPages: 1
                };
                serviceUnderTest.addAssetTo({ id: 17, assets: { pagination: { pageSize: 200 } } }, { assetId: 234 }, { in: new index_1.Frame(30).setFromFrameNumber(30), out: new index_1.Frame(30).setFromFrameNumber(60) }).subscribe(function (response) {
                    expect(response).toEqual({
                        items: [
                            { id: 123, other: 'stuff', timeStart: 123, timeEnd: 456 },
                            { id: 456, other: 'stuff', timeStart: -1, timeEnd: -2 },
                            { id: 234, other: 'stuff', timeStart: 1000, timeEnd: 2000 }
                        ],
                        pagination: {
                            totalCount: 3,
                            currentPage: 1,
                            pageSize: 200,
                            hasNextPage: false,
                            hasPreviousPage: false,
                            numberOfPages: 1
                        }
                    });
                });
            });
            it('returns the expected observable when the body does not have a list', function () {
                mockApiService.postResponse = {};
                serviceUnderTest.addAssetTo({ id: 17, assets: { pagination: { pageSize: 200 } } }, { assetId: 234 }, { in: new index_1.Frame(30).setFromFrameNumber(30), out: new index_1.Frame(30).setFromFrameNumber(60) }).subscribe(function (response) {
                    expect(response).toEqual({
                        items: [], pagination: {}
                    });
                });
            });
        });
        describe('removeAssetFrom()', function () {
            it('calls the API correctly', function () {
                serviceUnderTest.removeAssetFrom({ id: 19, assets: { pagination: {} } }, { uuid: 'ABCD' });
                expect(mockApiService.post).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                expect(mockApiService.post).toHaveBeenCalledWithEndpoint('collection/focused/removeAssets');
                expect(mockApiService.post).toHaveBeenCalledWithBody({ list: ['ABCD'] });
                expect(mockApiService.post).toHaveBeenCalledWithLoading(true);
            });
            it('calls the API correctly when the asset to remove has no UUID', function () {
                serviceUnderTest.removeAssetFrom({
                    id: 19,
                    assets: {
                        items: [{ assetId: 1234, uuid: 'ABCD' }, { assetId: 4567, uuid: 'EFGH' }],
                        pagination: { currentPage: 7, pageSize: 20 }
                    }
                }, { assetId: 4567 }).subscribe();
                expect(mockApiService.post).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                expect(mockApiService.post).toHaveBeenCalledWithEndpoint('collection/focused/removeAssets');
                expect(mockApiService.post).toHaveBeenCalledWithBody({ list: ['EFGH'] });
                expect(mockApiService.post).toHaveBeenCalledWithLoading(true);
            });
            it('also calls the API correctly to get the updated current page of assets', function () {
                mockApiService.postResponse = { some: 'response' };
                serviceUnderTest.removeAssetFrom({ id: 19, assets: { pagination: { currentPage: 7, pageSize: 20 } } }, { uuid: 'ABCD' }).subscribe();
                expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Assets);
                expect(mockApiService.get).toHaveBeenCalledWithEndpoint('collectionSummary/assets/19');
                expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
                expect(mockApiService.get).toHaveBeenCalledWithParameters({ i: '6', n: '20' });
            });
            it('returns the expected observable', function () {
                mockApiService.postResponse = { some: 'response' };
                mockApiService.getResponse = {
                    items: [
                        { id: 123, other: 'stuff', timeStart: '123', timeEnd: '456' },
                        { id: 456, other: 'stuff', timeStart: '-1', timeEnd: '-2' }
                    ],
                    totalCount: 2,
                    currentPage: 6,
                    pageSize: 20,
                    hasNextPage: false,
                    hasPreviousPage: true,
                    numberOfPages: 7
                };
                serviceUnderTest.removeAssetFrom({ id: 19, assets: { pagination: { currentPage: 7, pageSize: 20 } } }, { uuid: 'ABCD' }).subscribe(function (response) {
                    expect(response).toEqual({
                        items: [
                            { id: 123, other: 'stuff', timeStart: 123, timeEnd: 456 },
                            { id: 456, other: 'stuff', timeStart: -1, timeEnd: -2 }
                        ],
                        pagination: {
                            totalCount: 2,
                            currentPage: 7,
                            pageSize: 20,
                            hasNextPage: false,
                            hasPreviousPage: true,
                            numberOfPages: 7
                        }
                    });
                });
            });
        });
        describe('updateAssetMarkers()', function () {
            it('calls the API correctly', function () {
                serviceUnderTest.updateAssetMarkers({ id: 9876, assets: { pagination: {} } }, { assetId: 87, uuid: 'ABCD' }, { in: new index_1.Frame(30).setFromFrameNumber(90), out: new index_1.Frame(30).setFromFrameNumber(120) });
                expect(mockApiService.put).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                expect(mockApiService.put).toHaveBeenCalledWithEndpoint('collection/focused/updateAsset');
                expect(mockApiService.put).toHaveBeenCalledWithBody({ uuid: 'ABCD', assetId: 87, timeStart: '3000', timeEnd: '4000' });
                expect(mockApiService.put).toHaveBeenCalledWithLoading(true);
            });
            it('calls the API correctly with no markers', function () {
                serviceUnderTest.updateAssetMarkers({ id: 9876, assets: { pagination: {} } }, { assetId: 87, uuid: 'ABCD' }, undefined);
                expect(mockApiService.put).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                expect(mockApiService.put).toHaveBeenCalledWithEndpoint('collection/focused/updateAsset');
                expect(mockApiService.put).toHaveBeenCalledWithBody({ uuid: 'ABCD', assetId: 87, timeStart: '-1', timeEnd: '-2' });
                expect(mockApiService.put).toHaveBeenCalledWithLoading(true);
            });
            it('also calls the API correctly to get the updated current page of assets', function () {
                mockApiService.putResponse = { some: 'response' };
                serviceUnderTest.updateAssetMarkers({ id: 9876, assets: { pagination: { currentPage: 1, pageSize: 30 } } }, { assetId: 87, uuid: 'ABCD' }, { in: new index_1.Frame(30).setFromFrameNumber(90), out: new index_1.Frame(30).setFromFrameNumber(120) }).subscribe();
                expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Assets);
                expect(mockApiService.get).toHaveBeenCalledWithEndpoint('collectionSummary/assets/9876');
                expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
                expect(mockApiService.get).toHaveBeenCalledWithParameters({ i: '0', n: '30' });
            });
            it('returns the expected observable', function () {
                mockApiService.postResponse = { some: 'response' };
                mockApiService.getResponse = {
                    items: [
                        { id: 123, other: 'stuff', timeStart: '123', timeEnd: '456' },
                        { id: 456, other: 'stuff', timeStart: '-1', timeEnd: '-2' }
                    ],
                    totalCount: 2,
                    currentPage: 0,
                    pageSize: 30,
                    hasNextPage: false,
                    hasPreviousPage: false,
                    numberOfPages: 1
                };
                serviceUnderTest.updateAssetMarkers({ id: 9876, assets: { pagination: { currentPage: 1, pageSize: 30 } } }, { assetId: 87, uuid: 'ABCD' }, { in: new index_1.Frame(30).setFromFrameNumber(90), out: new index_1.Frame(30).setFromFrameNumber(120) }).subscribe(function (response) {
                    expect(response).toEqual({
                        items: [
                            { id: 123, other: 'stuff', timeStart: 123, timeEnd: 456 },
                            { id: 456, other: 'stuff', timeStart: -1, timeEnd: -2 }
                        ],
                        pagination: {
                            totalCount: 2,
                            currentPage: 1,
                            pageSize: 30,
                            hasNextPage: false,
                            hasPreviousPage: false,
                            numberOfPages: 1
                        }
                    });
                });
            });
        });
        describe('addAssetsToFocusedCollection()', function () {
            it('calls the apiService correctly', function () {
                serviceUnderTest.addAssetsToFocusedCollection([{ assetId: 1, name: 'something' }], { pageSize: 100, currentPage: 1 });
                expect(mockApiService.post).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                expect(mockApiService.post).toHaveBeenCalledWithEndpoint('collection/focused/addAssets');
                expect(mockApiService.post).toHaveBeenCalledWithBody({ list: [{ assetId: 1 }] });
                expect(mockApiService.post).toHaveBeenCalledWithLoading(true);
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9hY3RpdmUtY29sbGVjdGlvbi9hY3RpdmUtY29sbGVjdGlvbi5zZXJ2aWNlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSx5RUFBc0U7QUFDdEUscUVBQW1GO0FBRW5GLHVFQUE0RDtBQUM1RCwwRUFBeUU7QUFFekU7SUFDRSxRQUFRLENBQUMsMkJBQTJCLEVBQUU7UUFDcEMsSUFBSSxnQkFBeUMsRUFBRSxjQUE4QixDQUFDO1FBRTlFLFVBQVUsQ0FBQztZQUNULE9BQU8sQ0FBQyxXQUFXLENBQUMsa0NBQWUsQ0FBQyxDQUFDO1lBQ3JDLGNBQWMsR0FBRyxJQUFJLGlDQUFjLEVBQUUsQ0FBQztZQUN0QyxnQkFBZ0IsR0FBRyxJQUFJLG1EQUF1QixDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxRSxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDakIsRUFBRSxDQUFDLHlCQUF5QixFQUFFO2dCQUM1QixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUV4RCxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLG1CQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQy9ELE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsNEJBQTRCLENBQUMsMkJBQTJCLENBQUMsQ0FBQztnQkFDckYsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvRCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxzRUFBc0UsRUFBRTtnQkFDekUsY0FBYyxDQUFDLFdBQVcsR0FBRyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQztnQkFFM0MsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVB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QkFDRixDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGdDQUFnQyxFQUFFO1lBQ3pDLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRTtnQkFDbkMsZ0JBQWdCLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUV0SCxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLHVCQUF1QixDQUFDLG1CQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3BFLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsNEJBQTRCLENBQUMsOEJBQThCLENBQUMsQ0FBQztnQkFDekYsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFuZUQsb0JBbWVDIiwiZmlsZSI6ImFwcC9zdG9yZS9hY3RpdmUtY29sbGVjdGlvbi9hY3RpdmUtY29sbGVjdGlvbi5zZXJ2aWNlLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0IHsgQWN0aXZlQ29sbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuL2FjdGl2ZS1jb2xsZWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgTW9ja0FwaVNlcnZpY2UsIG1vY2tBcGlNYXRjaGVycyB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9tb2NrLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IFN1YmNsaXBNYXJrZXJzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvc3ViY2xpcC1tYXJrZXJzJztcbmltcG9ydCB7IEFwaSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRnJhbWUgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kdWxlcy93YXplZS1mcmFtZS1mb3JtYXR0ZXIvaW5kZXgnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0FjdGl2ZSBDb2xsZWN0aW9uIFNlcnZpY2UnLCAoKSA9PiB7XG4gICAgbGV0IHNlcnZpY2VVbmRlclRlc3Q6IEFjdGl2ZUNvbGxlY3Rpb25TZXJ2aWNlLCBtb2NrQXBpU2VydmljZTogTW9ja0FwaVNlcnZpY2U7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIGphc21pbmUuYWRkTWF0Y2hlcnMobW9ja0FwaU1hdGNoZXJzKTtcbiAgICAgIG1vY2tBcGlTZXJ2aWNlID0gbmV3IE1vY2tBcGlTZXJ2aWNlKCk7XG4gICAgICBzZXJ2aWNlVW5kZXJUZXN0ID0gbmV3IEFjdGl2ZUNvbGxlY3Rpb25TZXJ2aWNlKG1vY2tBcGlTZXJ2aWNlLmluamVjdG9yKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdsb2FkKCknLCAoKSA9PiB7XG4gICAgICBpdCgnY2FsbHMgdGhlIEFQSSBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QubG9hZCh7IGN1cnJlbnRQYWdlOiAxLCBwYWdlU2l6ZTogNDIgfSk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhBcGkoQXBpLkFzc2V0cyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ2NvbGxlY3Rpb25TdW1tYXJ5L2ZvY3VzZWQnKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhMb2FkaW5nKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdhbHNvIGNhbGxzIHRoZSBBUEkgY29ycmVjdGx5IHRvIGdldCBhc3NldHMgZm9yIHRoZSBsb2FkZWQgY29sbGVjdGlvbicsICgpID0+IHtcbiAgICAgICAgbW9ja0FwaVNlcnZpY2UuZ2V0UmVzcG9uc2UgPSB7IGlkOiAxMDgzNiB9O1xuXG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QubG9hZCh7IGN1cnJlbnRQYWdlOiAxLCBwYWdlU2l6ZTogNDIgfSkudGFrZSgxKS5zdWJzY3JpYmUoKTtcblxuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEFwaShBcGkuQXNzZXRzKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhFbmRwb2ludCgnY29sbGVjdGlvblN1bW1hcnkvYXNzZXRzLzEwODM2Jyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoTG9hZGluZyh0cnVlKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhQYXJhbWV0ZXJzKHsgaTogJzAnLCBuOiAnNDInIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBleHBlY3RlZCBvYnNlcnZhYmxlJywgKCkgPT4ge1xuICAgICAgICBtb2NrQXBpU2VydmljZS5nZXRSZXNwb25zZSA9IFtcbiAgICAgICAgICB7IGlkOiAxMDgzNiB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgaWQ6IDEyMywgb3RoZXI6ICdzdHVmZicsIHRpbWVTdGFydDogJzEyMycsIHRpbWVFbmQ6ICc0NTYnIH0sXG4gICAgICAgICAgICAgIHsgaWQ6IDQ1Niwgb3RoZXI6ICdzdHVmZicsIHRpbWVTdGFydDogJy0xJywgdGltZUVuZDogJy0yJyB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgdG90YWxDb3VudDogMixcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiAwLFxuICAgICAgICAgICAgcGFnZVNpemU6IDQyLFxuICAgICAgICAgICAgaGFzTmV4dFBhZ2U6IGZhbHNlLFxuICAgICAgICAgICAgaGFzUHJldmlvdXNQYWdlOiBmYWxzZSxcbiAgICAgICAgICAgIG51bWJlck9mUGFnZXM6IDFcbiAgICAgICAgICB9XG4gICAgICAgIF07XG5cbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5sb2FkKHsgY3VycmVudFBhZ2U6IDEsIHBhZ2VTaXplOiA0MiB9KS50YWtlKDEpLnN1YnNjcmliZShyZXNwb25zZSA9PiB7XG4gICAgICAgICAgZXhwZWN0KHJlc3BvbnNlKS50b0VxdWFsKHtcbiAgICAgICAgICAgIGlkOiAxMDgzNixcbiAgICAgICAgICAgIGFzc2V0czoge1xuICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgIHsgaWQ6IDEyMywgb3RoZXI6ICdzdHVmZicsIHRpbWVTdGFydDogMTIzLCB0aW1lRW5kOiA0NTYgfSxcbiAgICAgICAgICAgICAgICB7IGlkOiA0NTYsIG90aGVyOiAnc3R1ZmYnLCB0aW1lU3RhcnQ6IC0xLCB0aW1lRW5kOiAtMiB9XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgICAgICB0b3RhbENvdW50OiAyLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRQYWdlOiAxLFxuICAgICAgICAgICAgICAgIHBhZ2VTaXplOiA0MixcbiAgICAgICAgICAgICAgICBoYXNOZXh0UGFnZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgaGFzUHJldmlvdXNQYWdlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBudW1iZXJPZlBhZ2VzOiAxXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzZXQoKScsICgpID0+IHtcbiAgICAgIGl0KCdjYWxscyB0aGUgQVBJIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5zZXQoOTk5LCB7IGN1cnJlbnRQYWdlOiAxLCBwYWdlU2l6ZTogNDIgfSk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLnB1dCkudG9IYXZlQmVlbkNhbGxlZFdpdGhBcGkoQXBpLkFzc2V0cyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5wdXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ2NvbGxlY3Rpb25TdW1tYXJ5L3NldEZvY3VzZWQvOTk5Jyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5wdXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoTG9hZGluZyh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnYWxzbyBjYWxscyB0aGUgQVBJIGNvcnJlY3RseSB0byBnZXQgYXNzZXRzIGZvciB0aGUgbmV3IGFjdGl2ZSBjb2xsZWN0aW9uJywgKCkgPT4ge1xuICAgICAgICBtb2NrQXBpU2VydmljZS5wdXRSZXNwb25zZSA9IHsgaWQ6IDk5OSB9O1xuXG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3Quc2V0KDk5OSwgeyBjdXJyZW50UGFnZTogMSwgcGFnZVNpemU6IDQyIH0pLnRha2UoMSkuc3Vic2NyaWJlKCk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhBcGkoQXBpLkFzc2V0cyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ2NvbGxlY3Rpb25TdW1tYXJ5L2Fzc2V0cy85OTknKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhMb2FkaW5nKHRydWUpO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aFBhcmFtZXRlcnMoeyBpOiAnMCcsIG46ICc0MicgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgdGhlIGV4cGVjdGVkIG9ic2VydmFibGUnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tBcGlTZXJ2aWNlLnB1dFJlc3BvbnNlID0geyBpZDogOTk5IH07XG4gICAgICAgIG1vY2tBcGlTZXJ2aWNlLmdldFJlc3BvbnNlID0ge1xuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7IGlkOiAxMjMsIG90aGVyOiAnc3R1ZmYnLCB0aW1lU3RhcnQ6ICcxMjMnLCB0aW1lRW5kOiAnNDU2JyB9LFxuICAgICAgICAgICAgeyBpZDogNDU2LCBvdGhlcjogJ3N0dWZmJywgdGltZVN0YXJ0OiAnLTEnLCB0aW1lRW5kOiAnLTInIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIHRvdGFsQ291bnQ6IDIsXG4gICAgICAgICAgY3VycmVudFBhZ2U6IDAsXG4gICAgICAgICAgcGFnZVNpemU6IDQyLFxuICAgICAgICAgIGhhc05leHRQYWdlOiBmYWxzZSxcbiAgICAgICAgICBoYXNQcmV2aW91c1BhZ2U6IGZhbHNlLFxuICAgICAgICAgIG51bWJlck9mUGFnZXM6IDFcbiAgICAgICAgfTtcblxuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LnNldCg5OTksIHsgY3VycmVudFBhZ2U6IDEsIHBhZ2VTaXplOiA0MiB9KS50YWtlKDEpLnN1YnNjcmliZShyZXNwb25zZSA9PiB7XG4gICAgICAgICAgZXhwZWN0KHJlc3BvbnNlKS50b0VxdWFsKHtcbiAgICAgICAgICAgIGlkOiA5OTksXG4gICAgICAgICAgICBhc3NldHM6IHtcbiAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICB7IGlkOiAxMjMsIG90aGVyOiAnc3R1ZmYnLCB0aW1lU3RhcnQ6IDEyMywgdGltZUVuZDogNDU2IH0sXG4gICAgICAgICAgICAgICAgeyBpZDogNDU2LCBvdGhlcjogJ3N0dWZmJywgdGltZVN0YXJ0OiAtMSwgdGltZUVuZDogLTIgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgdG90YWxDb3VudDogMixcbiAgICAgICAgICAgICAgICBjdXJyZW50UGFnZTogMSxcbiAgICAgICAgICAgICAgICBwYWdlU2l6ZTogNDIsXG4gICAgICAgICAgICAgICAgaGFzTmV4dFBhZ2U6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGhhc1ByZXZpb3VzUGFnZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZQYWdlczogMVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbG9hZFBhZ2UoKScsICgpID0+IHtcbiAgICAgIGl0KCdjYWxscyB0aGUgQVBJIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgbW9ja0FwaVNlcnZpY2UuZ2V0UmVzcG9uc2UgPSB7IGlkOiAxMDgzNiB9O1xuXG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QubG9hZCh7IGN1cnJlbnRQYWdlOiAzLCBwYWdlU2l6ZTogMTAgfSkudGFrZSgxKS5zdWJzY3JpYmUoKTtcblxuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEFwaShBcGkuQXNzZXRzKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhFbmRwb2ludCgnY29sbGVjdGlvblN1bW1hcnkvYXNzZXRzLzEwODM2Jyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoTG9hZGluZyh0cnVlKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhQYXJhbWV0ZXJzKHsgaTogJzInLCBuOiAnMTAnIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBleHBlY3RlZCBvYnNlcnZhYmxlJywgKCkgPT4ge1xuICAgICAgICBtb2NrQXBpU2VydmljZS5nZXRSZXNwb25zZSA9IHtcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgeyBpZDogMTIzLCBvdGhlcjogJ3N0dWZmJywgdGltZVN0YXJ0OiAnMTIzJywgdGltZUVuZDogJzQ1NicgfSxcbiAgICAgICAgICAgIHsgaWQ6IDQ1Niwgb3RoZXI6ICdzdHVmZicsIHRpbWVTdGFydDogJy0xJywgdGltZUVuZDogJy0yJyB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICB0b3RhbENvdW50OiAyLFxuICAgICAgICAgIGN1cnJlbnRQYWdlOiAyLFxuICAgICAgICAgIHBhZ2VTaXplOiAxMCxcbiAgICAgICAgICBoYXNOZXh0UGFnZTogZmFsc2UsXG4gICAgICAgICAgaGFzUHJldmlvdXNQYWdlOiBmYWxzZSxcbiAgICAgICAgICBudW1iZXJPZlBhZ2VzOiAxXG4gICAgICAgIH07XG5cbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5sb2FkUGFnZSgxMDgzNiwgeyBjdXJyZW50UGFnZTogMywgcGFnZVNpemU6IDEwIH0pLnRha2UoMSkuc3Vic2NyaWJlKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBleHBlY3QocmVzcG9uc2UpLnRvRXF1YWwoe1xuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgeyBpZDogMTIzLCBvdGhlcjogJ3N0dWZmJywgdGltZVN0YXJ0OiAxMjMsIHRpbWVFbmQ6IDQ1NiB9LFxuICAgICAgICAgICAgICB7IGlkOiA0NTYsIG90aGVyOiAnc3R1ZmYnLCB0aW1lU3RhcnQ6IC0xLCB0aW1lRW5kOiAtMiB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgICB0b3RhbENvdW50OiAyLFxuICAgICAgICAgICAgICBjdXJyZW50UGFnZTogMyxcbiAgICAgICAgICAgICAgcGFnZVNpemU6IDEwLFxuICAgICAgICAgICAgICBoYXNOZXh0UGFnZTogZmFsc2UsXG4gICAgICAgICAgICAgIGhhc1ByZXZpb3VzUGFnZTogZmFsc2UsXG4gICAgICAgICAgICAgIG51bWJlck9mUGFnZXM6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdsb2FkRm9jdXNlZFBhZ2UoKScsICgpID0+IHtcbiAgICAgIGl0KCdjYWxscyB0aGUgQVBJIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5sb2FkRm9jdXNlZFBhZ2UoeyBjdXJyZW50UGFnZTogMywgcGFnZVNpemU6IDEwIH0sIG51bGwpO1xuXG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQXBpKEFwaS5Bc3NldHMpO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEVuZHBvaW50KCdjb2xsZWN0aW9uU3VtbWFyeS9hc3NldHMvZm9jdXNlZCcpO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aExvYWRpbmcodHJ1ZSk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoUGFyYW1ldGVycyh7IGk6ICcyJywgbjogJzEwJyB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyB0aGUgZXhwZWN0ZWQgb2JzZXJ2YWJsZScsICgpID0+IHtcbiAgICAgICAgbW9ja0FwaVNlcnZpY2UuZ2V0UmVzcG9uc2UgPSB7XG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHsgaWQ6IDEyMywgb3RoZXI6ICdzdHVmZicsIHRpbWVTdGFydDogJzEyMycsIHRpbWVFbmQ6ICc0NTYnIH0sXG4gICAgICAgICAgICB7IGlkOiA0NTYsIG90aGVyOiAnc3R1ZmYnLCB0aW1lU3RhcnQ6ICctMScsIHRpbWVFbmQ6ICctMicgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgdG90YWxDb3VudDogMixcbiAgICAgICAgICBjdXJyZW50UGFnZTogMixcbiAgICAgICAgICBwYWdlU2l6ZTogMTAsXG4gICAgICAgICAgaGFzTmV4dFBhZ2U6IGZhbHNlLFxuICAgICAgICAgIGhhc1ByZXZpb3VzUGFnZTogZmFsc2UsXG4gICAgICAgICAgbnVtYmVyT2ZQYWdlczogMVxuICAgICAgICB9O1xuXG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QubG9hZEZvY3VzZWRQYWdlKHsgY3VycmVudFBhZ2U6IDMsIHBhZ2VTaXplOiAxMCB9LCAxMCkudGFrZSgxKS5zdWJzY3JpYmUocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIGV4cGVjdChyZXNwb25zZSkudG9FcXVhbCh7XG4gICAgICAgICAgICB0b3RhbEFzc2V0c0FkZGVkOiAxMCxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgaWQ6IDEyMywgb3RoZXI6ICdzdHVmZicsIHRpbWVTdGFydDogMTIzLCB0aW1lRW5kOiA0NTYgfSxcbiAgICAgICAgICAgICAgeyBpZDogNDU2LCBvdGhlcjogJ3N0dWZmJywgdGltZVN0YXJ0OiAtMSwgdGltZUVuZDogLTIgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgICAgdG90YWxDb3VudDogMixcbiAgICAgICAgICAgICAgY3VycmVudFBhZ2U6IDMsXG4gICAgICAgICAgICAgIHBhZ2VTaXplOiAxMCxcbiAgICAgICAgICAgICAgaGFzTmV4dFBhZ2U6IGZhbHNlLFxuICAgICAgICAgICAgICBoYXNQcmV2aW91c1BhZ2U6IGZhbHNlLFxuICAgICAgICAgICAgICBudW1iZXJPZlBhZ2VzOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnYWRkQXNzZXRUbygpJywgKCkgPT4ge1xuICAgICAgaXQoJ2NhbGxzIHRoZSBBUEkgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmFkZEFzc2V0VG8oXG4gICAgICAgICAgeyBpZDogMTcgfSBhcyBhbnksXG4gICAgICAgICAgeyBhc3NldElkOiAyMzQgfSBhcyBhbnksXG4gICAgICAgICAgeyBpbjogbmV3IEZyYW1lKDMwKS5zZXRGcm9tRnJhbWVOdW1iZXIoMzApLCBvdXQ6IG5ldyBGcmFtZSgzMCkuc2V0RnJvbUZyYW1lTnVtYmVyKDYwKSB9XG4gICAgICAgICk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLnBvc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQXBpKEFwaS5JZGVudGl0aWVzKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLnBvc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ2NvbGxlY3Rpb24vZm9jdXNlZC9hZGRBc3NldHMnKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLnBvc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQm9keSh7IGxpc3Q6IFt7IGFzc2V0SWQ6IDIzNCwgdGltZVN0YXJ0OiAnMTAwMCcsIHRpbWVFbmQ6ICcyMDAwJyB9XSB9KTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLnBvc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoTG9hZGluZyh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnY2FsbHMgdGhlIEFQSSBjb3JyZWN0bHkgd2l0aCBubyBtYXJrZXJzJywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmFkZEFzc2V0VG8oXG4gICAgICAgICAgeyBpZDogMTcgfSBhcyBhbnksXG4gICAgICAgICAgeyBhc3NldElkOiAyMzQgfSBhcyBhbnksXG4gICAgICAgICAgdW5kZWZpbmVkXG4gICAgICAgICk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLnBvc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQXBpKEFwaS5JZGVudGl0aWVzKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLnBvc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ2NvbGxlY3Rpb24vZm9jdXNlZC9hZGRBc3NldHMnKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLnBvc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQm9keSh7IGxpc3Q6IFt7IGFzc2V0SWQ6IDIzNCwgdGltZVN0YXJ0OiAnLTEnLCB0aW1lRW5kOiAnLTInIH1dIH0pO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UucG9zdCkudG9IYXZlQmVlbkNhbGxlZFdpdGhMb2FkaW5nKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdhbHNvIGNhbGxzIHRoZSBBUEkgY29ycmVjdGx5IHRvIGdldCB0aGUgZmlyc3QgcGFnZSBvZiBhc3NldHMgZm9yIHRoZSB1cGRhdGVkIGFjdGl2ZSBjb2xsZWN0aW9uJywgKCkgPT4ge1xuICAgICAgICBtb2NrQXBpU2VydmljZS5wb3N0UmVzcG9uc2UgPSB7IGxpc3Q6IFsnc29tZXRoaW5nJ10gfTtcblxuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmFkZEFzc2V0VG8oXG4gICAgICAgICAgeyBpZDogMTcsIGFzc2V0czogeyBwYWdpbmF0aW9uOiB7IHBhZ2VTaXplOiAyMDAgfSB9IH0gYXMgYW55LFxuICAgICAgICAgIHsgYXNzZXRJZDogMjM0IH0gYXMgYW55LFxuICAgICAgICAgIHsgaW46IG5ldyBGcmFtZSgzMCkuc2V0RnJvbUZyYW1lTnVtYmVyKDMwKSwgb3V0OiBuZXcgRnJhbWUoMzApLnNldEZyb21GcmFtZU51bWJlcig2MCkgfVxuICAgICAgICApLnN1YnNjcmliZSgpO1xuXG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQXBpKEFwaS5Bc3NldHMpO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEVuZHBvaW50KCdjb2xsZWN0aW9uU3VtbWFyeS9hc3NldHMvMTcnKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhMb2FkaW5nKHRydWUpO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aFBhcmFtZXRlcnMoeyBpOiAnMCcsIG46ICcyMDAnIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBleHBlY3RlZCBvYnNlcnZhYmxlIHdoZW4gdGhlIGJvZHkgaGFzIGEgbGlzdCcsICgpID0+IHtcbiAgICAgICAgbW9ja0FwaVNlcnZpY2UucG9zdFJlc3BvbnNlID0geyBsaXN0OiBbJ3NvbWV0aGluZyddIH07XG4gICAgICAgIG1vY2tBcGlTZXJ2aWNlLmdldFJlc3BvbnNlID0ge1xuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7IGlkOiAxMjMsIG90aGVyOiAnc3R1ZmYnLCB0aW1lU3RhcnQ6ICcxMjMnLCB0aW1lRW5kOiAnNDU2JyB9LFxuICAgICAgICAgICAgeyBpZDogNDU2LCBvdGhlcjogJ3N0dWZmJywgdGltZVN0YXJ0OiAnLTEnLCB0aW1lRW5kOiAnLTInIH0sXG4gICAgICAgICAgICB7IGlkOiAyMzQsIG90aGVyOiAnc3R1ZmYnLCB0aW1lU3RhcnQ6ICcxMDAwJywgdGltZUVuZDogJzIwMDAnIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIHRvdGFsQ291bnQ6IDMsXG4gICAgICAgICAgY3VycmVudFBhZ2U6IDAsXG4gICAgICAgICAgcGFnZVNpemU6IDIwMCxcbiAgICAgICAgICBoYXNOZXh0UGFnZTogZmFsc2UsXG4gICAgICAgICAgaGFzUHJldmlvdXNQYWdlOiBmYWxzZSxcbiAgICAgICAgICBudW1iZXJPZlBhZ2VzOiAxXG4gICAgICAgIH07XG5cbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5hZGRBc3NldFRvKFxuICAgICAgICAgIHsgaWQ6IDE3LCBhc3NldHM6IHsgcGFnaW5hdGlvbjogeyBwYWdlU2l6ZTogMjAwIH0gfSB9IGFzIGFueSxcbiAgICAgICAgICB7IGFzc2V0SWQ6IDIzNCB9IGFzIGFueSxcbiAgICAgICAgICB7IGluOiBuZXcgRnJhbWUoMzApLnNldEZyb21GcmFtZU51bWJlcigzMCksIG91dDogbmV3IEZyYW1lKDMwKS5zZXRGcm9tRnJhbWVOdW1iZXIoNjApIH1cbiAgICAgICAgKS5zdWJzY3JpYmUocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIGV4cGVjdChyZXNwb25zZSkudG9FcXVhbCh7XG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7IGlkOiAxMjMsIG90aGVyOiAnc3R1ZmYnLCB0aW1lU3RhcnQ6IDEyMywgdGltZUVuZDogNDU2IH0sXG4gICAgICAgICAgICAgIHsgaWQ6IDQ1Niwgb3RoZXI6ICdzdHVmZicsIHRpbWVTdGFydDogLTEsIHRpbWVFbmQ6IC0yIH0sXG4gICAgICAgICAgICAgIHsgaWQ6IDIzNCwgb3RoZXI6ICdzdHVmZicsIHRpbWVTdGFydDogMTAwMCwgdGltZUVuZDogMjAwMCB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgICB0b3RhbENvdW50OiAzLFxuICAgICAgICAgICAgICBjdXJyZW50UGFnZTogMSxcbiAgICAgICAgICAgICAgcGFnZVNpemU6IDIwMCxcbiAgICAgICAgICAgICAgaGFzTmV4dFBhZ2U6IGZhbHNlLFxuICAgICAgICAgICAgICBoYXNQcmV2aW91c1BhZ2U6IGZhbHNlLFxuICAgICAgICAgICAgICBudW1iZXJPZlBhZ2VzOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBleHBlY3RlZCBvYnNlcnZhYmxlIHdoZW4gdGhlIGJvZHkgZG9lcyBub3QgaGF2ZSBhIGxpc3QnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tBcGlTZXJ2aWNlLnBvc3RSZXNwb25zZSA9IHt9O1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmFkZEFzc2V0VG8oXG4gICAgICAgICAgeyBpZDogMTcsIGFzc2V0czogeyBwYWdpbmF0aW9uOiB7IHBhZ2VTaXplOiAyMDAgfSB9IH0gYXMgYW55LFxuICAgICAgICAgIHsgYXNzZXRJZDogMjM0IH0gYXMgYW55LFxuICAgICAgICAgIHsgaW46IG5ldyBGcmFtZSgzMCkuc2V0RnJvbUZyYW1lTnVtYmVyKDMwKSwgb3V0OiBuZXcgRnJhbWUoMzApLnNldEZyb21GcmFtZU51bWJlcig2MCkgfVxuICAgICAgICApLnN1YnNjcmliZShyZXNwb25zZSA9PiB7XG4gICAgICAgICAgZXhwZWN0KHJlc3BvbnNlKS50b0VxdWFsKHtcbiAgICAgICAgICAgIGl0ZW1zOiBbXSwgcGFnaW5hdGlvbjoge31cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdyZW1vdmVBc3NldEZyb20oKScsICgpID0+IHtcbiAgICAgIGl0KCdjYWxscyB0aGUgQVBJIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5yZW1vdmVBc3NldEZyb20oXG4gICAgICAgICAgeyBpZDogMTksIGFzc2V0czogeyBwYWdpbmF0aW9uOiB7fSB9IH0gYXMgYW55LFxuICAgICAgICAgIHsgdXVpZDogJ0FCQ0QnIH0gYXMgYW55XG4gICAgICAgICk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLnBvc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQXBpKEFwaS5JZGVudGl0aWVzKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLnBvc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ2NvbGxlY3Rpb24vZm9jdXNlZC9yZW1vdmVBc3NldHMnKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLnBvc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQm9keSh7IGxpc3Q6IFsnQUJDRCddIH0pO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UucG9zdCkudG9IYXZlQmVlbkNhbGxlZFdpdGhMb2FkaW5nKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdjYWxscyB0aGUgQVBJIGNvcnJlY3RseSB3aGVuIHRoZSBhc3NldCB0byByZW1vdmUgaGFzIG5vIFVVSUQnLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QucmVtb3ZlQXNzZXRGcm9tKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAxOSxcbiAgICAgICAgICAgIGFzc2V0czoge1xuICAgICAgICAgICAgICBpdGVtczogW3sgYXNzZXRJZDogMTIzNCwgdXVpZDogJ0FCQ0QnIH0sIHsgYXNzZXRJZDogNDU2NywgdXVpZDogJ0VGR0gnIH1dLFxuICAgICAgICAgICAgICBwYWdpbmF0aW9uOiB7IGN1cnJlbnRQYWdlOiA3LCBwYWdlU2l6ZTogMjAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gYXMgYW55LFxuICAgICAgICAgIHsgYXNzZXRJZDogNDU2NyB9IGFzIGFueVxuICAgICAgICApLnN1YnNjcmliZSgpO1xuXG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5wb3N0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEFwaShBcGkuSWRlbnRpdGllcyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5wb3N0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEVuZHBvaW50KCdjb2xsZWN0aW9uL2ZvY3VzZWQvcmVtb3ZlQXNzZXRzJyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5wb3N0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEJvZHkoeyBsaXN0OiBbJ0VGR0gnXSB9KTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLnBvc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoTG9hZGluZyh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnYWxzbyBjYWxscyB0aGUgQVBJIGNvcnJlY3RseSB0byBnZXQgdGhlIHVwZGF0ZWQgY3VycmVudCBwYWdlIG9mIGFzc2V0cycsICgpID0+IHtcbiAgICAgICAgbW9ja0FwaVNlcnZpY2UucG9zdFJlc3BvbnNlID0geyBzb21lOiAncmVzcG9uc2UnIH07XG5cbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5yZW1vdmVBc3NldEZyb20oXG4gICAgICAgICAgeyBpZDogMTksIGFzc2V0czogeyBwYWdpbmF0aW9uOiB7IGN1cnJlbnRQYWdlOiA3LCBwYWdlU2l6ZTogMjAgfSB9IH0gYXMgYW55LFxuICAgICAgICAgIHsgdXVpZDogJ0FCQ0QnIH0gYXMgYW55XG4gICAgICAgICkuc3Vic2NyaWJlKCk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhBcGkoQXBpLkFzc2V0cyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ2NvbGxlY3Rpb25TdW1tYXJ5L2Fzc2V0cy8xOScpO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aExvYWRpbmcodHJ1ZSk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoUGFyYW1ldGVycyh7IGk6ICc2JywgbjogJzIwJyB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyB0aGUgZXhwZWN0ZWQgb2JzZXJ2YWJsZScsICgpID0+IHtcbiAgICAgICAgbW9ja0FwaVNlcnZpY2UucG9zdFJlc3BvbnNlID0geyBzb21lOiAncmVzcG9uc2UnIH07XG4gICAgICAgIG1vY2tBcGlTZXJ2aWNlLmdldFJlc3BvbnNlID0ge1xuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7IGlkOiAxMjMsIG90aGVyOiAnc3R1ZmYnLCB0aW1lU3RhcnQ6ICcxMjMnLCB0aW1lRW5kOiAnNDU2JyB9LFxuICAgICAgICAgICAgeyBpZDogNDU2LCBvdGhlcjogJ3N0dWZmJywgdGltZVN0YXJ0OiAnLTEnLCB0aW1lRW5kOiAnLTInIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIHRvdGFsQ291bnQ6IDIsXG4gICAgICAgICAgY3VycmVudFBhZ2U6IDYsXG4gICAgICAgICAgcGFnZVNpemU6IDIwLFxuICAgICAgICAgIGhhc05leHRQYWdlOiBmYWxzZSxcbiAgICAgICAgICBoYXNQcmV2aW91c1BhZ2U6IHRydWUsXG4gICAgICAgICAgbnVtYmVyT2ZQYWdlczogN1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QucmVtb3ZlQXNzZXRGcm9tKFxuICAgICAgICAgIHsgaWQ6IDE5LCBhc3NldHM6IHsgcGFnaW5hdGlvbjogeyBjdXJyZW50UGFnZTogNywgcGFnZVNpemU6IDIwIH0gfSB9IGFzIGFueSxcbiAgICAgICAgICB7IHV1aWQ6ICdBQkNEJyB9IGFzIGFueVxuICAgICAgICApLnN1YnNjcmliZShyZXNwb25zZSA9PiB7XG4gICAgICAgICAgZXhwZWN0KHJlc3BvbnNlKS50b0VxdWFsKHtcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgaWQ6IDEyMywgb3RoZXI6ICdzdHVmZicsIHRpbWVTdGFydDogMTIzLCB0aW1lRW5kOiA0NTYgfSxcbiAgICAgICAgICAgICAgeyBpZDogNDU2LCBvdGhlcjogJ3N0dWZmJywgdGltZVN0YXJ0OiAtMSwgdGltZUVuZDogLTIgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgICAgdG90YWxDb3VudDogMixcbiAgICAgICAgICAgICAgY3VycmVudFBhZ2U6IDcsXG4gICAgICAgICAgICAgIHBhZ2VTaXplOiAyMCxcbiAgICAgICAgICAgICAgaGFzTmV4dFBhZ2U6IGZhbHNlLFxuICAgICAgICAgICAgICBoYXNQcmV2aW91c1BhZ2U6IHRydWUsXG4gICAgICAgICAgICAgIG51bWJlck9mUGFnZXM6IDdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd1cGRhdGVBc3NldE1hcmtlcnMoKScsICgpID0+IHtcbiAgICAgIGl0KCdjYWxscyB0aGUgQVBJIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC51cGRhdGVBc3NldE1hcmtlcnMoXG4gICAgICAgICAgeyBpZDogOTg3NiwgYXNzZXRzOiB7IHBhZ2luYXRpb246IHt9IH0gfSBhcyBhbnksXG4gICAgICAgICAgeyBhc3NldElkOiA4NywgdXVpZDogJ0FCQ0QnIH0gYXMgYW55LFxuICAgICAgICAgIHsgaW46IG5ldyBGcmFtZSgzMCkuc2V0RnJvbUZyYW1lTnVtYmVyKDkwKSwgb3V0OiBuZXcgRnJhbWUoMzApLnNldEZyb21GcmFtZU51bWJlcigxMjApIH1cbiAgICAgICAgKTtcblxuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UucHV0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEFwaShBcGkuSWRlbnRpdGllcyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5wdXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ2NvbGxlY3Rpb24vZm9jdXNlZC91cGRhdGVBc3NldCcpO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UucHV0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEJvZHkoeyB1dWlkOiAnQUJDRCcsIGFzc2V0SWQ6IDg3LCB0aW1lU3RhcnQ6ICczMDAwJywgdGltZUVuZDogJzQwMDAnIH0pO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UucHV0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aExvYWRpbmcodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2NhbGxzIHRoZSBBUEkgY29ycmVjdGx5IHdpdGggbm8gbWFya2VycycsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC51cGRhdGVBc3NldE1hcmtlcnMoXG4gICAgICAgICAgeyBpZDogOTg3NiwgYXNzZXRzOiB7IHBhZ2luYXRpb246IHt9IH0gfSBhcyBhbnksXG4gICAgICAgICAgeyBhc3NldElkOiA4NywgdXVpZDogJ0FCQ0QnIH0gYXMgYW55LFxuICAgICAgICAgIHVuZGVmaW5lZFxuICAgICAgICApO1xuXG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5wdXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQXBpKEFwaS5JZGVudGl0aWVzKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLnB1dCkudG9IYXZlQmVlbkNhbGxlZFdpdGhFbmRwb2ludCgnY29sbGVjdGlvbi9mb2N1c2VkL3VwZGF0ZUFzc2V0Jyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5wdXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQm9keSh7IHV1aWQ6ICdBQkNEJywgYXNzZXRJZDogODcsIHRpbWVTdGFydDogJy0xJywgdGltZUVuZDogJy0yJyB9KTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLnB1dCkudG9IYXZlQmVlbkNhbGxlZFdpdGhMb2FkaW5nKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdhbHNvIGNhbGxzIHRoZSBBUEkgY29ycmVjdGx5IHRvIGdldCB0aGUgdXBkYXRlZCBjdXJyZW50IHBhZ2Ugb2YgYXNzZXRzJywgKCkgPT4ge1xuICAgICAgICBtb2NrQXBpU2VydmljZS5wdXRSZXNwb25zZSA9IHsgc29tZTogJ3Jlc3BvbnNlJyB9O1xuXG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QudXBkYXRlQXNzZXRNYXJrZXJzKFxuICAgICAgICAgIHsgaWQ6IDk4NzYsIGFzc2V0czogeyBwYWdpbmF0aW9uOiB7IGN1cnJlbnRQYWdlOiAxLCBwYWdlU2l6ZTogMzAgfSB9IH0gYXMgYW55LFxuICAgICAgICAgIHsgYXNzZXRJZDogODcsIHV1aWQ6ICdBQkNEJyB9IGFzIGFueSxcbiAgICAgICAgICB7IGluOiBuZXcgRnJhbWUoMzApLnNldEZyb21GcmFtZU51bWJlcig5MCksIG91dDogbmV3IEZyYW1lKDMwKS5zZXRGcm9tRnJhbWVOdW1iZXIoMTIwKSB9XG4gICAgICAgICkuc3Vic2NyaWJlKCk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhBcGkoQXBpLkFzc2V0cyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ2NvbGxlY3Rpb25TdW1tYXJ5L2Fzc2V0cy85ODc2Jyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoTG9hZGluZyh0cnVlKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhQYXJhbWV0ZXJzKHsgaTogJzAnLCBuOiAnMzAnIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBleHBlY3RlZCBvYnNlcnZhYmxlJywgKCkgPT4ge1xuICAgICAgICBtb2NrQXBpU2VydmljZS5wb3N0UmVzcG9uc2UgPSB7IHNvbWU6ICdyZXNwb25zZScgfTtcbiAgICAgICAgbW9ja0FwaVNlcnZpY2UuZ2V0UmVzcG9uc2UgPSB7XG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHsgaWQ6IDEyMywgb3RoZXI6ICdzdHVmZicsIHRpbWVTdGFydDogJzEyMycsIHRpbWVFbmQ6ICc0NTYnIH0sXG4gICAgICAgICAgICB7IGlkOiA0NTYsIG90aGVyOiAnc3R1ZmYnLCB0aW1lU3RhcnQ6ICctMScsIHRpbWVFbmQ6ICctMicgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgdG90YWxDb3VudDogMixcbiAgICAgICAgICBjdXJyZW50UGFnZTogMCxcbiAgICAgICAgICBwYWdlU2l6ZTogMzAsXG4gICAgICAgICAgaGFzTmV4dFBhZ2U6IGZhbHNlLFxuICAgICAgICAgIGhhc1ByZXZpb3VzUGFnZTogZmFsc2UsXG4gICAgICAgICAgbnVtYmVyT2ZQYWdlczogMVxuICAgICAgICB9O1xuXG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QudXBkYXRlQXNzZXRNYXJrZXJzKFxuICAgICAgICAgIHsgaWQ6IDk4NzYsIGFzc2V0czogeyBwYWdpbmF0aW9uOiB7IGN1cnJlbnRQYWdlOiAxLCBwYWdlU2l6ZTogMzAgfSB9IH0gYXMgYW55LFxuICAgICAgICAgIHsgYXNzZXRJZDogODcsIHV1aWQ6ICdBQkNEJyB9IGFzIGFueSxcbiAgICAgICAgICB7IGluOiBuZXcgRnJhbWUoMzApLnNldEZyb21GcmFtZU51bWJlcig5MCksIG91dDogbmV3IEZyYW1lKDMwKS5zZXRGcm9tRnJhbWVOdW1iZXIoMTIwKSB9XG4gICAgICAgICkuc3Vic2NyaWJlKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBleHBlY3QocmVzcG9uc2UpLnRvRXF1YWwoe1xuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgeyBpZDogMTIzLCBvdGhlcjogJ3N0dWZmJywgdGltZVN0YXJ0OiAxMjMsIHRpbWVFbmQ6IDQ1NiB9LFxuICAgICAgICAgICAgICB7IGlkOiA0NTYsIG90aGVyOiAnc3R1ZmYnLCB0aW1lU3RhcnQ6IC0xLCB0aW1lRW5kOiAtMiB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgICB0b3RhbENvdW50OiAyLFxuICAgICAgICAgICAgICBjdXJyZW50UGFnZTogMSxcbiAgICAgICAgICAgICAgcGFnZVNpemU6IDMwLFxuICAgICAgICAgICAgICBoYXNOZXh0UGFnZTogZmFsc2UsXG4gICAgICAgICAgICAgIGhhc1ByZXZpb3VzUGFnZTogZmFsc2UsXG4gICAgICAgICAgICAgIG51bWJlck9mUGFnZXM6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdhZGRBc3NldHNUb0ZvY3VzZWRDb2xsZWN0aW9uKCknLCAoKSA9PiB7XG4gICAgICBpdCgnY2FsbHMgdGhlIGFwaVNlcnZpY2UgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmFkZEFzc2V0c1RvRm9jdXNlZENvbGxlY3Rpb24oW3sgYXNzZXRJZDogMSwgbmFtZTogJ3NvbWV0aGluZycgfV0sIHsgcGFnZVNpemU6IDEwMCwgY3VycmVudFBhZ2U6IDEgfSk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLnBvc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQXBpKEFwaS5JZGVudGl0aWVzKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLnBvc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ2NvbGxlY3Rpb24vZm9jdXNlZC9hZGRBc3NldHMnKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLnBvc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQm9keSh7IGxpc3Q6IFt7IGFzc2V0SWQ6IDEgfV0gfSk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5wb3N0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aExvYWRpbmcodHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
