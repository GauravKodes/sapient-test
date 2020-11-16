import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { LaunchDetails } from '../models/launch-models';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  /**
   * @param http HttpClient instance.
   */
  constructor(private http: HttpClient) {}

  private baseDomainUrl = environment.domainBaseUrl;

  /**
   * Get list of launches for spacex.
   * @param year        Year selection if selected.
   * @param isLaunched  Landing status selection if selected.
   * @param isLanded    Launching status selection if selected.
   * @param limit       Limit to fetch the number of records
   */
  getLaunches(year: string, isLaunched: string, isLanded: string, limit: number) {
    let reqUrl = `${this.baseDomainUrl}/launches?limit=${limit}`;

    if (year) {
      reqUrl = reqUrl + `&launch_year=${year}`;
    }

    if (isLaunched) {
      const launchStatus = isLaunched === 'Yes' ? true : false;
      reqUrl = reqUrl + `&launch_success=${launchStatus}`;
    }

    if (isLanded) {
      const landStatus = isLanded === 'Yes' ? true : false;
      reqUrl = reqUrl + `&land_success=${landStatus}`;
    }
    return this.http.get<LaunchDetails[]>(reqUrl);
  }
}
