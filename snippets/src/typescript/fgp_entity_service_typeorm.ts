import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { EntityName } from "./entity-name.entity";

@Injectable()
export class EntityNameService {
  constructor(
    @InjectRepository(EntityName)
    private readonly entityRepository: Repository<EntityName>
  ) {}

  async findAll(): Promise<EntityName[]> {
    return this.entityRepository.find();
  }

  async findOne(id: number): Promise<EntityName | null> {
    return this.entityRepository.findOneBy({ id });
  }

  async create(data: Partial<EntityName>): Promise<EntityName> {
    const entity = this.entityRepository.create(data);
    return this.entityRepository.save(entity);
  }

  async update(id: number, data: Partial<EntityName>): Promise<EntityName> {
    await this.entityRepository.update(id, data);
    return this.findOne(id) as Promise<EntityName>;
  }

  async remove(id: number): Promise<void> {
    await this.entityRepository.delete(id);
  }
}
