import { Injectable, HttpService } from '@nestjs/common';
import { pluck } from 'rxjs/operators';
import * as qs from 'qs';
import { DroneBuild } from './interface/build.interface';
import { TriggerArg, CancelBuildArg } from './interface/serviceArg.interface';

@Injectable()
export class DroneService {
  constructor(private readonly http: HttpService,) {}


  /**
   * 触发构建
   * @param args
   */
  async trigger({ owner, repo, ...queryParams }: TriggerArg): Promise<DroneBuild> {
    return this.http.post(`/api/repos/${owner}/${repo}/builds?${qs.stringify(queryParams)}`)
      .pipe(pluck('data')).toPromise();
  }

  /**
   * 取消构建
   */
  async cancelBuild({ owner, repo, build }: CancelBuildArg): Promise<any> {
    return this.http.delete(`api/repos/${owner}/${repo}/builds/${build}`)
      .pipe(pluck('data')).toPromise();
  }
}
