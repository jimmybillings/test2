import { Frame } from '../../shared/modules/wazee-frame-formatter/index';

export interface Markers {
  startTime?: number;
  endTime?: number;
};

export interface SubclipMarkers {
  in?: Frame;
  out?: Frame;
}

export interface SerializedSubclipMarker {
  frameNumber: number;
  framesPerSecond: number;
}

export interface SerializedSubclipMarkers {
  in?: SerializedSubclipMarker;
  out?: SerializedSubclipMarker;
}

export interface Duration {
  timeStart: number; // in milliseconds
  timeEnd: number; // in milliseconds
}

export function serialize(markers: SubclipMarkers): SerializedSubclipMarkers {
  if (!markers) return null;

  const serializedMarkers: SerializedSubclipMarkers = {};
  if (markers.in) serializedMarkers.in = serializeSingle(markers.in);
  if (markers.out) serializedMarkers.out = serializeSingle(markers.out);

  return serializedMarkers;
};

export function deserialize(serializedMarkers: SerializedSubclipMarkers): SubclipMarkers {
  if (!serializedMarkers) return null;

  const markers: SubclipMarkers = {};
  if (serializedMarkers.in) markers.in = deserializeSingle(serializedMarkers.in);
  if (serializedMarkers.out) markers.out = deserializeSingle(serializedMarkers.out);

  return markers;
}

export function durationFrom(markers: SubclipMarkers): Duration {
  return {
    timeStart: timeStartFrom(markers),
    timeEnd: timeEndFrom(markers)
  };
}

export function matches(timeStart: number, timeEnd: number, markers: SubclipMarkers): boolean {
  return timeStartFrom(markers) === (timeStart || -1) && timeEndFrom(markers) === (timeEnd || -2);
}

export function markersMatch(markers: SubclipMarkers, otherMarkers: SubclipMarkers): boolean {
  return timeStartFrom(markers) === timeStartFrom(otherMarkers) && timeEndFrom(markers) === timeEndFrom(otherMarkers);
}

export function bothMarkersAreSet(markers: SubclipMarkers): boolean {
  return !!markers && !!markers.in && !!markers.out;
}

export function neitherMarkersAreSet(markers: SubclipMarkers): boolean {
  return !markers.in && !markers.out;
}

function serializeSingle(marker: Frame): SerializedSubclipMarker {
  return { frameNumber: marker.frameNumber, framesPerSecond: marker.framesPerSecond };
}

function deserializeSingle(serializedMarker: SerializedSubclipMarker): Frame {
  return new Frame(serializedMarker.framesPerSecond).setFromFrameNumber(serializedMarker.frameNumber);
}

function timeStartFrom(markers: SubclipMarkers): number {
  return (markers && markers.in) ? markers.in.asMilliseconds() : -1;
}

function timeEndFrom(markers: SubclipMarkers): number {
  return (markers && markers.out) ? markers.out.asMilliseconds() : -2;
}
