import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entity/category.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { InsertBlogPostDto } from './dto/insert-blog-post.dto';
import { BlogPost } from './entity/blog-post.entity';

@Injectable()
export class BlogPostService {
  constructor(
    @InjectRepository(BlogPost)
    private blogPostRepository: Repository<BlogPost>,
    private categoryService: CategoryService,
  ) {}

  findAll(): Promise<BlogPost[]> {
    return this.blogPostRepository.find();
  }

  findById(id: number): Promise<BlogPost | undefined> {
    return this.blogPostRepository.findOneByOrFail({ id });
  }

  async create(insertBlogPostDto: InsertBlogPostDto): Promise<BlogPost> {
    const category: Category = await this.categoryService.findById(
      insertBlogPostDto.categoryId,
    );

    if (!category) {
      throw new BadRequestException('Category not found');
    }

    const blogPost = new BlogPost();
    blogPost.title = insertBlogPostDto.title;
    blogPost.contents = insertBlogPostDto.text;
    blogPost.category = category;

    return this.blogPostRepository.save(blogPost);
  }

  async update(
    id: number,
    insertBlogPostDto: InsertBlogPostDto,
  ): Promise<BlogPost> {
    const category: Category = await this.categoryService.findById(
      insertBlogPostDto.categoryId,
    );

    if (!category) {
      throw new BadRequestException('Category not found');
    }

    const blogPost = new BlogPost();
    blogPost.id = id;
    blogPost.title = insertBlogPostDto.title;
    blogPost.contents = insertBlogPostDto.text;
    blogPost.category = category;

    return this.blogPostRepository.save(blogPost);
  }

  async deleteAll(): Promise<BlogPost[]> {
    const posts = await this.findAll();
    return this.blogPostRepository.remove(posts);
  }

  deleteById(id: number): Promise<DeleteResult> {
    return this.blogPostRepository.delete(id);
  }
}
