import { Injectable, NotFoundException } from '@nestjs/common';
// import { Product } from 'src/entities/product.entiy';
import { Product } from '../../entities/product.entiy';
import { CreateProductDto, UpdateProductDto } from '../../dtos/products.dto';

@Injectable()
export class ProductsService {
  private counterId = 1;
  //tenemos que crear nuestra entidad, para identificar los tipos de datos que de permitir el array products

  private products: Product[] = [
    {
      id: 1,
      name: 'Montura',
      description: 'Color Azul',
      price: 30,
      stock: 50,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxI0GWNza8jsWovluLiVCfhmsXF84MGjmot-jiYxKxyDUuwWrchbqnBpwgIsKAWGei0Xw&usqp=CAU',
    },
  ];
  findAll() {
    return this.products;
  }
  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) throw new NotFoundException(`product ${id} Not Found`);
    return product;
  }
  create(payload: CreateProductDto) {
    console.log(payload);

    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);
    if (product) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = {
        ...product, // Mantén las propiedades originales del producto
        ...payload, // Actualiza con las nuevas propiedades del payload
      };
      return this.products[index];
    }
    return;
  }
  delete(id: number) {
    const product = this.findOne(id);
    if (!product) throw new NotFoundException(`product ${id} Not Found`);
    return (this.products = this.products.filter(
      (product) => product.id !== id,
    ));
  }
}
