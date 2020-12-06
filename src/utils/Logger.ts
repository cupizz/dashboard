declare let ENV: string;
class Logger {
  private static instance: Logger;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new Logger();
    }
    return this.instance;
  }

  log = (message?: any, ...optionalParams: any[]): void => {
    if (ENV === 'production') return;
    if (optionalParams.length) {
      // eslint-disable-next-line no-console
      console.log(message, [...optionalParams]);
    } else {
      console.info(message);
    }
  };

  info = (message?: any, ...optionalParams: any[]): void => {
    if (ENV === 'production') return;
    if (optionalParams.length) {
      console.info(message, [...optionalParams]);
    } else {
      console.info(message);
    }
  };

  warn = (message?: any, ...optionalParams: any[]): void => {
    if (ENV === 'production') return;
    if (optionalParams.length) {
      // eslint-disable-next-line no-console
      console.warn(message, [...optionalParams]);
    } else {
      // eslint-disable-next-line no-console
      console.warn(message);
    }
  };

  error = (message?: any, ...optionalParams: any[]): void => {
    if (ENV === 'production') return;
    if (optionalParams.length) {
      // eslint-disable-next-line no-console
      console.error(message, [...optionalParams]);
    } else {
      // eslint-disable-next-line no-console
      console.error(message);
    }
  };
}

export default Logger.getInstance();
