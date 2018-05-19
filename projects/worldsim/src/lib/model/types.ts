export type InitialDescription = {
  simulatedEnvironmentName: string;
  channels: ChannelOrEmitterInitialDescription[];
  emitters: ChannelOrEmitterInitialDescription[];
  eventers: EventerInitialDescription[];
};

export type ChannelOrEmitterInitialDescription = {
  id: string;
  type: string;
  value: any;
};

export type EventerInitialDescription = {
  id: string;
  type: string;
};

export type Update = {
  id: string;
  value: any;
};

export enum UpdateType {
  EMITTER,
  CHANNEL,
  EVENT
}

export interface JSONWorld {
  name: string;
  scale?: JSONScale;
  objects: JSONObj[];
  locations: JSONLocation[];
}

export interface JSONScale {
  x: number;
  y: number;
}

export interface JSONPosition {
  x: number;
  y: number;
}

export interface JSONLocation {
  name: string;
  width: number;
  height: number;
  position: JSONPosition;
  avatars?: JSONAvatar[];
  sublocations?: JSONLocation[];
}

export interface JSONAvatar {
  name: string;
}

export interface JSONObj {
  name: string;
  type: string;
  position: JSONPosition;
  // Individual properties
  color?: string;
  intensity?: number;
  volume?: number;
  light?: number;
  channel?: number;
  temperature?: number;
}
