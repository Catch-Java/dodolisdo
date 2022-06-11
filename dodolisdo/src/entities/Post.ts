import {
    BaseEntity,
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
Index('id', ['id'], {});
@Entity({ schema: 'dodolisdo', name: 'posts' })
export class Room extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;
  
    @Column({ name: 'content', length: 4000 })
    content: string;
}