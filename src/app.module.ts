import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
process.env.NODE_DEBUG_FORCE = 'false';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotEnvLoader = require('@tmessaoudi-official/dot-env-loader/dot-env-loader.run.js').default(
  'process',
);

const APP_ENV = dotEnvLoader.run();

console.log(APP_ENV);
console.log(APP_ENV.APP_ENV);

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [() => APP_ENV],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
