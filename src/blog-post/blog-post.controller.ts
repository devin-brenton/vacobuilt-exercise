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
import { BlogPostService } from './blog-post.service';

@Controller('posts')
export class BlogPostController {
  constructor(private blogPostService: BlogPostService) {}

  @Get()
  getAllBlogPosts() {
    return this.blogPostService.findAll();
  }

  @Get('/:postId')
  getBlogPostById(@Param('postId', ParseIntPipe) postId: number) {
    return this.blogPostService.findById(postId);
  }

  @Post()
  createBlogPost(@Body() insertBlogPostDto: any) {
    return this.blogPostService.create(insertBlogPostDto);
  }

  @Put('/:postId')
  updateBlogPost(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() insertBlogPostDto: any,
  ) {
    return this.blogPostService.update(postId, insertBlogPostDto);
  }

  @Delete()
  async deleteAllBlogPosts() {
    await this.blogPostService.deleteAll();
    return { message: 'Success' };
  }

  @Delete('/:postId')
  async deleteBlogPostById(@Param('postId', ParseIntPipe) postId: number) {
    await this.blogPostService.deleteById(postId);
    return { message: 'Success' };
  }
}
