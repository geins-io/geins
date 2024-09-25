import { logWrite } from '@geins/core';
import type { AuthResponse, AuthCredentials } from '@geins/types';
import { AuthClient } from './authClient';
import { AuthService } from './authService';

export class AuthClientDirect extends AuthClient {
  private authService: AuthService;

  constructor(signEndpoint: string, authEndpoint: string) {
    super();
    this.authService = new AuthService(signEndpoint, authEndpoint);
  }

  async login(credentials: AuthCredentials): Promise<AuthResponse | undefined> {
    const result = await this.authService.login(credentials);

    if (!result) {
      return undefined;
    }

    if (result.succeeded) {
      this.setCookiesLogin(result, credentials.rememberUser || false);
    }

    return result;
  }

  async changePassword(
    credentials: AuthCredentials,
  ): Promise<AuthResponse | undefined> {
    const refreshToken = this.getCookieRefreshToken();
    if (!refreshToken) {
      return undefined;
    }
    const result = await this.authService.changePassword(
      credentials,
      refreshToken,
    );

    if (result.succeeded) {
      this.setCookiesLogin(result, credentials.rememberUser || false);
    }
    return result;
  }

  async refresh(): Promise<AuthResponse | undefined> {
    const refreshToken = this.getCookieRefreshToken();
    if (!refreshToken) {
      return undefined;
    }

    const result = await this.authService.refresh(refreshToken);
    if (!result || !result.succeeded) {
      return undefined;
    }

    if (result && result.tokens?.refreshToken) {
      this.setCookieRefreshToken(result.tokens.refreshToken);
    }

    if (result && result.succeeded && result.tokens?.token) {
      const maxAge = result.tokens.maxAge || 900;
      this.setCookieUserToken(result.tokens.token, maxAge);
    }
    return result;
  }

  async getUser(
    refreshToken?: string,
    userToken?: string,
  ): Promise<AuthResponse | undefined> {
    const tokens = this.getCurrentTokens(refreshToken, userToken);

    if (!tokens.refreshToken) {
      this.clearCookies();
      return undefined;
    }

    const result = await this.authService.getUser(
      tokens.refreshToken,
      tokens.userToken,
    );

    if (!result || !result.succeeded) {
      this.clearCookies();
      return undefined;
    }

    this.setCookieTokens(result.tokens);

    return result;
  }

  async register(
    credentials: AuthCredentials,
  ): Promise<AuthResponse | undefined> {
    const result = await this.authService.register(credentials);

    if (!result) {
      return undefined;
    }

    if (result.succeeded) {
      this.setCookiesLogin(result, credentials.rememberUser || false);
    }

    return result;
  }
}
