import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  // Res,
  // ParseIntPipe,
} from '@nestjs/common';
// import { Response } from 'express';
import { ProductsService } from '../services/products.service';
import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsServices: ProductsService) {}
  //este ejemplo podria servir para usarse con filtros
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand = 'string',
  ) {
    // return {
    //   message: `Producto: limit=> ${limit} offset=> ${offset} brand=>${brand}`,
    // };
    return this.productsServices.findAll();
  }
  // Las rutas que no son dinamicas van primero
  @Get('filter')
  getProductFilter() {
    return { message: `Yo soy un filter` };
  }
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  // getOne(@Res() res: Response, @Param('productId') productId: string) {
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    //* Se podria usar al estilo express de llegar a ser necesario.
    // return res.status(200).send({ message: `Producto id: ${productId}` });
    // return { message: `Producto id: ${productId}` };
    // return res.status(200).json(this.productsServices.findOne(+productId));
    return this.productsServices.findOne(productId);
  }
  @Post()
  create(@Body() payload: CreateProductDto) {
    // return { message: 'accion de crear<<<<', payload };
    return this.productsServices.create(payload);
  }
  @Put(':id')
  put(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    return this.productsServices.update(+id, payload);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsServices.delete(+id);
  }
}
