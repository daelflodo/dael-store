import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  //este ejemplo podria servir para usarse con filtros
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return {
      message: `Producto: limit=> ${limit} offset=> ${offset} brand=>${brand}`,
    };
  }
  // Las rutas que no son dinamicas van primero
  @Get('filter')
  getProductFilter() {
    return { message: `Yo soy un filter` };
  }
  @Get(':productId')
  getProduct(@Param('productId') productId: string) {
    return { message: `Producto id: ${productId}` };
  }
  @Post()
  create(@Body() payload: any) {
    return { message: 'accion de crear<<<<', payload };
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return { message: `Eliminacion completa del id ${id}` };
  }
}
