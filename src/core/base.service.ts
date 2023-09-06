import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

export class BaseService<T> {
  constructor(private repository: Repository<T>) {}

  find(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  findOne(options: FindOneOptions<T>): Promise<T> {
    return this.repository.findOne(options);
  }
}
