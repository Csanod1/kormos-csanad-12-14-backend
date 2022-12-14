import { Body, Controller, Get, Param, Post, Query, Redirect, Render } from '@nestjs/common';
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

  @Get('cats/new')
  @Render('form')
  newCatForm() {
    return {};
  }
  @Post('cats/new')
  @Redirect()
  async getNewCat(@Body() macska: Macska) {
    const [result]: any = await db.execute(
      'INSERT INTO macskak (suly, szem_szin) VALUES (?, ?)',
      [macska.suly, macska.szem_szin],
    );
    return {
      url: '/',
    };
  }
}
