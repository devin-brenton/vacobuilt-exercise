import { IsNumber, IsString } from 'class-validator';

export class InsertBlogPostDto {
  @IsString()
  title: string;

  @IsString()
  text: string;

  @IsNumber()
  categoryId: number;
}
