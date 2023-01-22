import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPostModule } from './blog-post/blog-post.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    BlogPostModule,
    CategoryModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'vaco_blogs',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
