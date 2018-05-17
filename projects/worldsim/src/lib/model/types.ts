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
