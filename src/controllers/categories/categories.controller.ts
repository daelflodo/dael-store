import { Controller, Get, Param } from '@nestjs/common';

@Controller()
export class CategoriesController {
  //vamos a manejar dos parametros en una misma ruta
  @Get('categories/:id/products/:productId')
  getCategory(@Param('productId') productId: string, @Param('id') id: string) {
    return { message: `Product: ${productId} and categorie: ${id}` };
  }
}
