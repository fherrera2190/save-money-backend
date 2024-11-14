import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getProducts(@Query('q') q: string) {
    console.log(q);
    return this.appService.getProducts(q);
  }

  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
