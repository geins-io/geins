import { type CookieSerializeOptions } from 'cookie';
import Cookie from 'cookie-universal';

/**
 * Configuration options for setting cookies.
 */
export interface CookieServiceConfig {
  /**
   * Indicates if the cookie is HTTP only.
   * If `true`, the cookie is inaccessible to client-side scripts.
   */
  httpOnly?: boolean;

  /**
   * Specifies the domain for which the cookie is valid.
   * If not specified, defaults to the host portion of the current document URL.
   */
  domain?: string;

  /**
   * Specifies the URL path that must exist in the requested URL for the browser to send the Cookie header.
   * Defaults to `'/'`.
   */
  path?: string;

  /**
   * Indicates if the cookie should only be transmitted over secure protocols like HTTPS.
   * If `true`, the cookie will only be sent over secure connections.
   */
  secure?: boolean;

  /**
   * Sets the maximum age of the cookie in seconds.
   * Can be a number or a string representation of a number.
   */
  maxAge?: number | string; // maxAge can be a number or string here
}

/**
 * Represents a cookie with a name and payload, extending the cookie configuration options.
 */
export interface CookieType extends CookieServiceConfig {
  /**
   * The name of the cookie.
   */
  name: string;

  /**
   * The value or data stored in the cookie.
   */
  payload: string;
}

/**
 * Service for managing cookies.
 */
export class CookieService {
  private path = '/';
  private domain = '';
  private secure = true;
  private httpOnly = false;
  private maxAge: number;
  private cookie = Cookie();

  /**
   * Creates an instance of CookieService.
   * @param {CookieServiceConfig} [config] - Optional configuration for the cookie service.
   */
  constructor(config?: CookieServiceConfig) {
    this.maxAge = 0;
    if (config) {
      if (config.path) {
        this.path = config.path;
      }

      if (config.domain) {
        this.domain = config.domain;
      }

      if (config.secure !== undefined) {
        this.secure = config.secure;
      }

      if (config.httpOnly !== undefined) {
        this.httpOnly = config.httpOnly;
      }

      if (config.maxAge !== undefined) {
        this.maxAge = this.parseMaxAge(config.maxAge);
      }
    }
  }

  /**
   * Retrieves the current cookie configuration.
   * @returns {CookieServiceConfig} - The current configuration settings.
   */
  protected getConfig(): CookieServiceConfig {
    return {
      path: this.path,
      domain: this.domain,
      secure: this.secure,
      httpOnly: this.httpOnly,
      maxAge: this.maxAge,
    };
  }

  private parseMaxAge(maxAge: string | number): number {
    if (typeof maxAge === 'string') {
      const parsed = parseInt(maxAge, 10);
      return isNaN(parsed) ? 0 : parsed;
    }
    return maxAge;
  }

  private configToCookieOptions(config: CookieServiceConfig): CookieSerializeOptions {
    return {
      path: config.path,
      domain: config.domain,
      secure: config.secure,
      httpOnly: config.httpOnly,
      maxAge: config.maxAge !== undefined ? this.parseMaxAge(config.maxAge) : undefined,
    };
  }

  /**
   * Retrieves all cookies.
   * @returns {Record<string, string>} - An object containing all cookies.
   */
  public getAll(): Record<string, string> {
    return this.cookie.getAll() as Record<string, string>;
  }

  /**
   * Retrieves the value of a specific cookie.
   * @param {string} cookieName - The name of the cookie to retrieve.
   * @returns {string} - The value of the cookie, or an empty string if not found.
   */
  public get(cookieName: string): string {
    return this.cookie.get(cookieName) || '';
  }

  /**
   * Removes a specific cookie.
   * @param {string} cookieName - The name of the cookie to remove.
   */
  public remove(cookieName: string): void {
    this.cookie.remove(cookieName);
  }

  /**
   * Sets a cookie with the specified options.
   * @param {CookieType} cookie - The cookie to set, including name and payload.
   * @param {CookieServiceConfig} [config] - Optional configuration for setting the cookie.
   */
  public set(cookie: CookieType, config?: CookieServiceConfig): void {
    const baseConfig = this.getConfig();
    const mergedConfig = { ...baseConfig, ...config, ...cookie };
    const options = this.configToCookieOptions(mergedConfig);

    this.cookie.set(cookie.name, cookie.payload, options);
  }
}
