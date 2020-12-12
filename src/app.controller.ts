import { Controller, Get, Request as RequestDecorator } from '@nestjs/common';
import { Request as RequestExpress } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@RequestDecorator() request: RequestExpress): string {
    return (
      this.appService.getHello() + ' => ' +
      JSON.stringify(request.headers)
    );
  }
}
