import { GeinsLogLevel } from '@geins/types';
export class Logger {
  private currentLogLevel: GeinsLogLevel;

  constructor(logLevel: GeinsLogLevel) {
    this.currentLogLevel = logLevel;
  }

  private shouldLog(level: GeinsLogLevel): boolean {
    if (this.currentLogLevel === GeinsLogLevel.NONE) {
      return false;
    }
    const levels = [GeinsLogLevel.DEBUG, GeinsLogLevel.INFO, GeinsLogLevel.WARN, GeinsLogLevel.ERROR];
    return levels.indexOf(level) >= levels.indexOf(this.currentLogLevel);
  }
  none(message: string) {
    if (this.shouldLog(GeinsLogLevel.DEBUG)) {
      console.debug(`[DEBUG]: ${message}`);
    }
  }

  debug(message: string) {
    if (this.shouldLog(GeinsLogLevel.DEBUG)) {
      console.debug(`[DEBUG]: ${message}`);
    }
  }

  info(message: string) {
    if (this.shouldLog(GeinsLogLevel.INFO)) {
      console.info(`[INFO]: ${message}`);
    }
  }

  warn(message: string) {
    if (this.shouldLog(GeinsLogLevel.WARN)) {
      console.warn(`[WARN]: ${message}`);
    }
  }

  error(message: string) {
    if (this.shouldLog(GeinsLogLevel.ERROR)) {
      console.error(`[ERROR]: ${message}`);
    }
  }
}
