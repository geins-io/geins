import { Environment } from '@geins/types';
import type {
  MerchantApiCredentials,
  Channel,
  MarketLanguage,
} from '@geins/types';
import { MerchantApiClient, ENDPOINTS } from './api-client';
import { CookieService, EventService } from './services/';
import { isServerContext, buildEndpoints } from './utils';

export class GeinsCore {
  // api client
  private endpointsUrls: any;
  private apiClient: any;
  private apiKey: string = '';
  private accountName: string = '';
  private environment: Environment = Environment.PRODUCTION;

  // channel information
  private useChannel: Channel;

  // default market language
  private useDefaultMarketLanguage: MarketLanguage | undefined;

  // cookie service
  private cookieService: CookieService | undefined;

  // events
  private eventService: EventService;

  constructor(
    credentials: MerchantApiCredentials,
    channel: Channel,
    defualtMarketLanguage?: MarketLanguage,
  ) {
    if (!channel) {
      throw new Error('Channel is required');
    }

    if (!credentials) {
      throw new Error('Credentials are required');
    }

    this.useChannel = channel;

    // Set authentication information
    this.apiKey = credentials.apiKey;
    this.accountName = credentials.accountName;
    this.environment =
      (credentials.environment as Environment) || Environment.PRODUCTION;

    // Initialize API Client
    if (this.apiKey && this.accountName) {
      this.endpointsUrls = buildEndpoints(
        this.accountName,
        this.apiKey,
        this.environment,
      );
    }

    if (defualtMarketLanguage) {
      this.useDefaultMarketLanguage = defualtMarketLanguage;
    }

    // Initialize BroadcastChannel
    if (!isServerContext()) {
      this.cookieService = new CookieService();
    }

    this.eventService = new EventService();
  }

  // Initialize API Client
  private initApiClient() {
    if (this.apiKey && this.accountName) {
      this.apiClient = new MerchantApiClient(
        this.endpointsUrls.main,
        this.apiKey,
      );
    } else {
      throw new Error('API Key and Account Name are required');
    }
  }

  get client(): any {
    if (!this.endpointsUrls) {
      throw new Error('Endpoints are not set');
    }
    if (!this.apiClient) {
      this.initApiClient();
    }
    return this.apiClient;
  }

  get endpoints(): any {
    return this.endpointsUrls;
  }

  get channel(): Channel {
    return this.useChannel;
  }

  get events(): EventService {
    return this.eventService;
  }

  get defaultMarketLanguage(): MarketLanguage | undefined {
    return this.useDefaultMarketLanguage;
  }

  get cookies(): CookieService {
    if (!this.cookieService) {
      this.cookieService = new CookieService();
    }
    return this.cookieService;
  }
}
