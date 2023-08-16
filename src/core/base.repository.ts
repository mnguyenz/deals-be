import { BaseEntity, FindOptionsWhere, Repository } from 'typeorm';

export class BaseRepository<T extends BaseEntity> extends Repository<T> {
  async getOne(id: number): Promise<T> {
    return await this.findOneBy({ id } as unknown as FindOptionsWhere<T>);
  }
}
