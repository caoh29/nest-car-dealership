import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Chevrolet',
      model: 'Aveo',
    },
  ];

  findAll(): Car[] {
    return this.cars;
  }

  findCar(id: string): Car {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id "${id}" not found`);
    return car;
  }

  create(createCarDto: CreateCarDto): Car {
    const car: Car = {
      id: uuid(),
      ...createCarDto,
    };
    this.cars.push(car);
    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto): Car {
    let carQuery = this.findCar(id);

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carQuery = {
          ...car,
          ...updateCarDto,
        };
        return carQuery;
      }

      return car;
    });

    return carQuery;
  }

  delete(id: string) {
    this.cars = this.cars.filter((car) => car.id !== id);
    return this.findAll();
  }
}
