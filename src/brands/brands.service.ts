import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { v4 as uuid } from 'uuid';

import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    {
      id: uuid(),
      name: 'Honda',
      createdAt: new Date().getTime(),
    },
    {
      id: uuid(),
      name: 'Toyota',
      createdAt: new Date().getTime(),
    },
    {
      id: uuid(),
      name: 'Chevrolet',
      createdAt: new Date().getTime(),
    },
  ];

  create(createBrandDto: CreateBrandDto) {
    const { name } = createBrandDto;
    const brandName = name.toLowerCase();

    const brandQuery = this.brands.find((brand) => brand.name === brandName);

    if (brandQuery)
      throw new BadRequestException(`brand "${brandName}" already in DB`);

    const brand: Brand = {
      id: uuid(),
      name: brandName,
      createdAt: new Date().getTime(),
    };

    this.brands.push(brand);

    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) throw new NotFoundException(`brand with id "${id}" not found`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandQuery = this.findOne(id);

    this.brands = this.brands.map((brand) => {
      if (brand.id === id) {
        brandQuery = {
          id: brand.id,
          name: updateBrandDto.name.toLowerCase(),
          createdAt: brand.createdAt,
          updatedAt: new Date().getTime(),
        };
        return brandQuery;
      }

      return brand;
    });

    return brandQuery;
  }

  remove(id: string) {
    this.brands = this.brands.filter((brand) => brand.id !== id);
    return this.findAll();
  }
}
