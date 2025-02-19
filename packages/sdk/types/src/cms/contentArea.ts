import { KeyValue } from '../common';
import { GeinsCustomerType } from '../generated';

import type { GeinsBaseApiVars } from '../api-client';

export interface ContentPageVariables extends BaseCmsVariables {
  alias: string;
}
export interface ContentAreaVariables extends BaseCmsVariables {
  areaName: string;
  family: string;
}

export interface BaseCmsVariables extends GeinsBaseApiVars {
  customerType?: GeinsCustomerType | null;
  preview?: boolean | null;
  filters?: Array<KeyValue> | null;
  displaySetting?: string | null;
}

export interface ContentImageSizeType {
  imageWidth: number;
  imageHeight: number;
}

export interface ContentImageType {
  fileName: string;
  largestSize: ContentImageSizeType;
}

export interface ContentType {
  id: string;
  name: string;
  sortOrder: number;
  type: string;
  size: string;
  configuration: string;
  images: ContentImageType[];
}

export interface ContentContainerType {
  id: string;
  name: string;
  sortOrder: number;
  layout: string;
  responsiveMode: string;
  design: string;
  content: ContentType[];
}

export interface ContentPageAreaType {
  id?: string;
  name?: string;
  index?: number;
}

export interface ContentMetaType {
  title?: string;
  description?: string;
}

export interface ContentPageType {
  id?: string;
  name?: string;
  title?: string;
  pageArea?: ContentPageAreaType;
  familyName?: string;
  meta: ContentMetaType;
  tags: string[];
  containers: ContentContainerType[];
}

export interface ContentAreaType {
  meta: ContentMetaType; // Adjust based on real meta type if available
  tags: string[];
  containers: ContentContainerType[];
}

export interface ContentPageServiceResult {
  contentArea: ContentAreaType;
}
