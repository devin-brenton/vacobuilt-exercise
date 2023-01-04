import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/category.dto';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepository.find();
  }

  findById(id: number) {
    return this.categoryRepository.findOneBy({ id });
  }

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.insert(createCategoryDto);
  }
}
