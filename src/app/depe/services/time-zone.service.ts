import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import  * as moment from 'moment-timezone';

@Injectable()
export class TimeZoneService {
  public tenantTimeZone: string;

  constructor() {
    this.tenantTimeZone = 'GMT';
  }

  public setTenantTimeZone(tenantTz: string) {
    this.tenantTimeZone = tenantTz;
  }

  public utcToTenant(utcDateTime: Moment): Moment {
    return moment.tz(utcDateTime, this.tenantTimeZone);
  }

  public utcToTenantString(utcDateTime: Moment, format: string): string {
    format = moment.tz.guess() === this.tenantTimeZone ? format : format + ' (UTC Z)';
    return moment.tz(utcDateTime, this.tenantTimeZone).format(format);
  }

  public tenantToUtc(tenantDateTime: Moment): Moment {
    return moment(tenantDateTime).utc();
  }
}