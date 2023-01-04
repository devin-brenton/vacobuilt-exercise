import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';
import { BlogPost } from './entity/blog-post.entity';

@Module({
  imports: [CategoryModule, TypeOrmModule.forFeature([BlogPost])],
  controllers: [BlogPostController],
  providers: [BlogPostService],
})
export class BlogPostModule {}
