import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entity/category.entity';
import { DeleteResult, Repository } from 'typeorm';
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

  async findById(id: number): Promise<BlogPost | undefined> {
    const post = await this.blogPostRepository.findOneByOrFail({ id });
    console.log(JSON.stringify(post));
    return post;
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
    blogPost.categoryId = insertBlogPostDto.categoryId;

    const { identifiers } = await this.blogPostRepository.insert(blogPost);
    return this.findById(identifiers[0].id);
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
    blogPost.title = insertBlogPostDto.title;
    blogPost.contents = insertBlogPostDto.text;
    blogPost.categoryId = insertBlogPostDto.categoryId;

    const result = await this.blogPostRepository.update(id, blogPost);

    if (result.affected === 0) {
      throw new NotFoundException();
    }

    return this.findById(id);
  }

  async deleteAll(): Promise<BlogPost[]> {
    const posts = await this.findAll();
    return this.blogPostRepository.remove(posts);
  }

  deleteById(id: number): Promise<DeleteResult> {
    return this.blogPostRepository.delete(id);
  }
}
