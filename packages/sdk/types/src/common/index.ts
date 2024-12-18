import type { GeinsChannelTypeType } from '../generated';
export * from './channel';
export * from './event';

/* export type GeinsCustomerTypeType = 'PERSON' | 'ORGANIZATION'; */

export type Environment = 'prod' | 'qa' | 'dev';

export interface KeyValue {
  key: string;
  value: string;
}

export type GeinsSettings = {
  apiKey: string;
  accountName: string;
  channel: string;
  tld: string;
  locale: string;
  market: string;
  environment?: Environment;
};

export interface GeinsChannelInterface {
  current: () => Promise<GeinsChannelTypeType | undefined>;
  all: () => Promise<GeinsChannelTypeType[] | undefined>;
}
