// test/globalSettings.ts
import 'node-fetch';
import { AUTH_COOKIES, buildEndpoints } from '@geins/core';
import { AuthService } from '@geins/crm';
import { Environment, GeinsSettings, AuthCredentials } from '@geins/types';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

// Define and export global settings based on environment variables
export const validSettings: GeinsSettings = {
  apiKey: process.env.GEINS_API_KEY!,
  accountName: process.env.GEINS_ACCOUNT_NAME!,
  channel: process.env.GEINS_CHANNEL!,
  tld: process.env.GEINS_TLD!,
  locale: process.env.GEINS_LOCALE!,
  market: process.env.GEINS_MARKET!,
  environment: (process.env.GEINS_ENVIRONMENT || 'prod') as Environment,
};

export const validUserCredentials: AuthCredentials = {
  username: process.env.GEINS_USERNAME!,
  password: process.env.GEINS_PASSWORD!,
  rememberUser: true,
};

export const expectedCookiesAuthAll = [
  AUTH_COOKIES.USER_MAX_AGE,
  AUTH_COOKIES.REFRESH_TOKEN,
  AUTH_COOKIES.USER_AUTH,
  AUTH_COOKIES.USER,
  AUTH_COOKIES.USER_TYPE,
];
export const expectedCookiesAuthTokens = [AUTH_COOKIES.REFRESH_TOKEN, AUTH_COOKIES.USER_AUTH];

export const cmsSettings = {
  area: {
    family: process.env.GEINS_CMS_FAMILY!,
    areaName: process.env.GEINS_CMS_AREA!,
  },
  page: {
    alias: process.env.GEINS_CMS_PAGE_ALIAS!,
  },
};

export const omsSettings = {
  skus: {
    skuId1: parseInt(process.env.GEINS_OMS_SKUID1!.toString(), 10),
    skuId2: parseInt(process.env.GEINS_OMS_SKUID2!.toString(), 10),
    skuId3: parseInt(process.env.GEINS_OMS_SKUID3!.toString(), 10),
  },
  promotionCodes: {
    percentOff: (process.env.GEINS_PROMO_CODE! ?? '').toString(),
  },
};
