import { Controller, Get, Render, Req, Res, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller({ path: '/' })
export class AppController {
  constructor(
    @Inject(AppService) private readonly appService: AppService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  @Get('')
  @Render('index.html.twig')
  invoke(@Req() request: Request): unknown {
    return {
      title:
        'Hello world! from : ' +
        request.ip +
        ' -- ' +
        this.configService.get<string>('APP_ENV'),
    };
  }
}
