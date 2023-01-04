import { Category } from 'src/category/entity/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BlogPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  contents: string;

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => Category, (category) => category.id)
  category: Category;
}
