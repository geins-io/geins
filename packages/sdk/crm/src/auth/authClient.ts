import { CookieService, AUTH_COOKIES, logWrite, GeinsCore } from '@geins/core';
import type { AuthResponse, AuthCredentials } from '@geins/types';
import { authClaimsTokenSerializeToObject } from './authHelpers';
import { AuthService } from './authService';

export abstract class AuthClient {
  protected cookieService: CookieService;
  abstract core: GeinsCore;

  constructor() {
    this.cookieService = new CookieService();
  }

  abstract login(
    credentials: AuthCredentials,
  ): Promise<AuthResponse | undefined>;

  abstract refresh(): Promise<AuthResponse | undefined>;
  abstract changePassword(
    credentials: AuthCredentials,
  ): Promise<AuthResponse | undefined>;

  /**
   * Retrieves user authentication information. Can be used SSR if refreshToken is provided.
   * When no params are provided, it will retrieve the tokens from browser cookies.
   * @param refreshToken Optional token used for refreshing the authentication.
   * @param userToken Optional token representing the current user session
   */
  abstract getUser(
    refreshToken?: string,
    userToken?: string,
  ): Promise<AuthResponse | undefined>;

  abstract register(
    credentials: AuthCredentials,
  ): Promise<AuthResponse | undefined>;

  public async logout(): Promise<AuthResponse | undefined> {
    this.clearCookies();
    return { succeeded: true };
  }

  public getUserFromCookie(
    token?: string,
    refreshToken?: string,
  ): AuthResponse | undefined {
    token = token || this.getCookieUserToken();
    refreshToken = refreshToken || this.getCookieRefreshToken();
    if (!token || !refreshToken) {
      return undefined;
    }

    return AuthService.getUserObjectFromToken(token, refreshToken);
  }

  // get cookie values
  public getCookieTokens(): any {
    return {
      token: this.getCookieUserToken(),
      refreshToken: this.getCookieRefreshToken(),
    };
  }

  protected getCookieUser(): string {
    return this.cookieService.get(AUTH_COOKIES.USER);
  }

  protected getCookieRefreshToken(): string {
    return this.cookieService.get(AUTH_COOKIES.REFRESH_TOKEN);
  }

  protected getCookieUserToken(): string {
    return this.cookieService.get(AUTH_COOKIES.USER_AUTH);
  }

  protected getCurrentTokens(
    refreshToken?: string,
    userToken?: string,
  ): { refreshToken: string | undefined; userToken: string | undefined } {
    const cookieRefreshToken = this.getCookieRefreshToken();
    const cookieUserToken = this.getCookieUserToken();
    return {
      refreshToken: refreshToken || cookieRefreshToken,
      userToken: userToken || cookieUserToken,
    };
  }

  protected setTokens(tokens?: {
    refreshToken?: string;
    token?: string;
    maxAge?: number;
  }): void {
    if (tokens?.refreshToken) {
      this.setCookieRefreshToken(tokens.refreshToken);
    }
    if (tokens?.token) {
      this.core.userToken = tokens.token;
      const maxAge = tokens.maxAge || 900;
      this.setCookieUserToken(tokens.token, maxAge);
    }
  }

  // set cookie values
  protected setCookiesLogin(
    authResponse: AuthResponse,
    rememberUser: boolean,
  ): void {
    const maxAge = rememberUser ? 604800 : 1800; // 7 days or 30 minutes
    const tokenMaxAge = authResponse?.tokens?.maxAge || 900;
    const { user, tokens } = authResponse;

    this.cookieService.set({
      name: AUTH_COOKIES.USER_MAX_AGE,
      payload: maxAge.toString(),
      maxAge,
    });

    if (tokens?.refreshToken) {
      this.setCookieRefreshToken(tokens?.refreshToken, maxAge);
    }

    if (tokens?.token) {
      this.setCookieUserToken(tokens.token, tokenMaxAge);
    }

    if (user?.username) {
      this.cookieService.set({
        name: AUTH_COOKIES.USER,
        payload: user.username,
        maxAge,
      });
    }

    if (user?.GeinsCustomerTypeType) {
      this.cookieService.set({
        name: AUTH_COOKIES.USER_TYPE,
        payload: user.GeinsCustomerTypeType,
        maxAge,
      });
    }
  }

  protected setCookieRefreshToken(token: string, maxAge?: number): void {
    this.cookieService.set({
      name: AUTH_COOKIES.REFRESH_TOKEN,
      payload: token,
      maxAge,
    });
  }

  protected setCookieUserToken(token: string, maxAge: number): void {
    this.cookieService.set({
      name: AUTH_COOKIES.USER_AUTH,
      payload: token,
      maxAge,
    });
  }

  public clearCookies(): void {
    Object.values(AUTH_COOKIES).forEach((cookieName) => {
      this.cookieService.remove(cookieName);
    });
  }

  public spoofPreviewUser(token: string): string {
    this.clearCookies();
    const maxAge = 1800;
    const spoofedUser = authClaimsTokenSerializeToObject(token);

    const username = spoofedUser?.spoofedBy || 'preview@geins.io';
    const spoofDate = spoofedUser?.spoofDate;
    const GeinsCustomerTypeType =
      spoofedUser?.GeinsCustomerTypeType || 'preview';

    this.cookieService.set({
      name: AUTH_COOKIES.USER,
      payload: username,
      maxAge,
    });

    this.cookieService.set({
      name: AUTH_COOKIES.USER_AUTH,
      payload: token,
      maxAge,
    });

    this.cookieService.set({
      name: AUTH_COOKIES.USER_TYPE,
      payload: GeinsCustomerTypeType,
      maxAge,
    });

    this.cookieService.set({
      name: AUTH_COOKIES.USER_MAX_AGE,
      payload: maxAge.toString(),
      maxAge,
    });

    return JSON.stringify(spoofedUser);
  }
}
