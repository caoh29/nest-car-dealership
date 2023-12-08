import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CarsService {
  private cars = [
    {
      id: 1,
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: 2,
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: 3,
      brand: 'Chevrolet',
      model: 'Aveo',
    },
  ];

  findAll(): { id: number; brand: string; model: string }[] {
    return this.cars;
  }

  findCar(id: number): { id: number; brand: string; model: string } {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id "${id}" not found`);
    return car;
  }
}
