import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { ConfigModule } from '@nestjs/config';
import { ClientOpts } from 'redis';
import { CacheService } from './cache.service';

export const getRedisModuleConfig = (config: EnvironmentConfigService): any =>
  CacheModule.register<ClientOpts>({
    store: redisStore,
    host: config.getRedisHost(),
    port: config.getRedisPort(),
    ttl: 60,
  });

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register<ClientOpts>({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      ttl: 60,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheConfigModule {}
