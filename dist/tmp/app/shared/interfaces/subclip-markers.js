"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../shared/modules/wazee-frame-formatter/index");
;
function serialize(markers) {
    if (!markers)
        return null;
    var serializedMarkers = {};
    if (markers.in)
        serializedMarkers.in = serializeSingle(markers.in);
    if (markers.out)
        serializedMarkers.out = serializeSingle(markers.out);
    return serializedMarkers;
}
exports.serialize = serialize;
;
function deserialize(serializedMarkers) {
    if (!serializedMarkers)
        return null;
    var markers = {};
    if (serializedMarkers.in)
        markers.in = deserializeSingle(serializedMarkers.in);
    if (serializedMarkers.out)
        markers.out = deserializeSingle(serializedMarkers.out);
    return markers;
}
exports.deserialize = deserialize;
function durationFrom(markers) {
    return {
        timeStart: timeStartFrom(markers),
        timeEnd: timeEndFrom(markers)
    };
}
exports.durationFrom = durationFrom;
function matches(timeStart, timeEnd, markers) {
    return timeStartFrom(markers) === (timeStart || -1) && timeEndFrom(markers) === (timeEnd || -2);
}
exports.matches = matches;
function markersMatch(markers, otherMarkers) {
    return timeStartFrom(markers) === timeStartFrom(otherMarkers) && timeEndFrom(markers) === timeEndFrom(otherMarkers);
}
exports.markersMatch = markersMatch;
function bothMarkersAreSet(markers) {
    return !!markers && !!markers.in && !!markers.out;
}
exports.bothMarkersAreSet = bothMarkersAreSet;
function neitherMarkersAreSet(markers) {
    return !markers.in && !markers.out;
}
exports.neitherMarkersAreSet = neitherMarkersAreSet;
function serializeSingle(marker) {
    return { frameNumber: marker.frameNumber, framesPerSecond: marker.framesPerSecond };
}
function deserializeSingle(serializedMarker) {
    return new index_1.Frame(serializedMarker.framesPerSecond).setFromFrameNumber(serializedMarker.frameNumber);
}
function timeStartFrom(markers) {
    return (markers && markers.in) ? markers.in.asMilliseconds() : -1;
}
function timeEndFrom(markers) {
    return (markers && markers.out) ? markers.out.asMilliseconds() : -2;
}
//# sourceMappingURL=subclip-markers.js.map