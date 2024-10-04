import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ProductsCreateDto } from './dto/req/products.create.dto';
import { ProductsService } from './products.service';
import { AccessGuard } from '../jwt/access.guard';

@Controller('products')
@UseGuards(AccessGuard)
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @Post('create')
  async create(@Body() body: ProductsCreateDto, @Request() req: Request) {
    return this.productService.create(body, req);
  }
}
