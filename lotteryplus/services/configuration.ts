import { BaseConfiguration } from '../../shared/configurations/base-configurtaion'
import * as AppSettings from '../configurations/app-settings.json';
export class Configuration extends BaseConfiguration {
    appSettings: typeof AppSettings;
  
    constructor(settings: typeof AppSettings, parallelIndex: number) {
      super(settings);
      this.appSettings = settings;
      
    
    }
  }
  