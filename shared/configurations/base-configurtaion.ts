import { env } from 'process';

export class BaseConfiguration {
  settings: { baseUrl: string; baseAdminUrl?: string; baseApiUrl: string; baseAdminApiUrl?: string };

  constructor(settings: { baseUrl: string; baseAdminUrl?: string; baseApiUrl: string; baseAdminApiUrl?: string }) {
    this.settings = settings;
  }

  isTestOnCI(): boolean {
    return env.CI === undefined ? false : true;
  }
}
