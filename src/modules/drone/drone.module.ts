import { Module, HttpModule } from '@nestjs/common';
import { DroneService } from './drone.service';
import { DRONE_TOKEN, DRONE_BASE_URL } from 'src/config/environments';

@Module({
  imports: [
    HttpModule.register({
      baseURL: DRONE_BASE_URL,
      headers: {
        Authorization: `Bearer ${DRONE_TOKEN}`,
      },
      timeout: 15000,
    })
  ],
  providers: [DroneService],
  exports: [DroneService]
})
export class DroneModule {}
