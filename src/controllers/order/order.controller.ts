import { Controller, Get, Req } from '@nestjs/common';

@Controller('order')
export class OrderController {
  @Get()
  getOrder(@Req() req) {
    const { order } = req.body;
    if (order === 'A') return { message: 'soy Ascendente' };
    return { message: 'Soy Descendente' };
  }
}
