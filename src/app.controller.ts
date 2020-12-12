import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';

@Controller({ path: '/' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  @Render('index.html.twig')
  getHello(@Req() request: Request, @Res() response: Response): unknown {
    return { title: 'Hello world!' };
  }
}
