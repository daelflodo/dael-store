import { User } from './user.entity';
import { Product } from '../../products/entities/product.entiy';
export class Order {
  date: Date;
  user: User;
  products: Product[];
}
