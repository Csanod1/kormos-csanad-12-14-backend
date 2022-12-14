import { Controller, Get, Param, Post, Query, Render } from '@nestjs/common';
import { get } from 'http';
import { AppService } from './app.service';
import db from './db';
import { Macska } from './Macska';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async getByColor(@Query('color') color = '') {
    if (color == '') {
      const [rows] = await db.execute(
        'SELECT suly, szem_szin FROM macskak ORDER BY suly DESC',
        [color],
      );
      return {
        macskak: rows,
      };
    } else {
      const [rows] = await db.execute(
        'SELECT suly, szem_szin FROM macskak WHERE szem_szin = ? ORDER BY suly DESC',
        [color],
      );
      return {
        macskak: rows,
      };
    }
  }

  @Get('/cats/new')
  @Render('form')
  async getNewCat(){
    
  }

}
