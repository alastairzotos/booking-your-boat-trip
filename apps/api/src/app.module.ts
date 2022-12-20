import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvModule } from './environment/environment.module';
import { EnvService } from './environment/environment.service';
import { HealthModule } from './health/health.module';
import { ImagesModule } from './images/images.module';
import { OperatorsModule } from './operators/operators.module';
import { S3Module } from './s3/s3.module';
import { TripsModule } from './trips/trips.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EnvModule,
    HealthModule,
    UsersModule,
    OperatorsModule,
    TripsModule,
    S3Module,
    ImagesModule,
    MongooseModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: async (envService: EnvService) => ({
        uri: envService.get().dbConnectionString
      }),
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
