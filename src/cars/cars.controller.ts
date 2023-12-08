import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars(): { id: number; brand: string; model: string }[] {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: number): {
    id: number;
    brand: string;
    model: string;
  } {
    return this.carsService.findCar(id);
  }

  @Post()
  createCar(@Body() body: { id: number; brand: string; model: string }) {
    return body;
  }

  @Put(':id')
  updateCar(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: {
      id: number;
      brand: string;
      model: string;
    },
  ) {
    return body;
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number) {
    return id;
  }
}
