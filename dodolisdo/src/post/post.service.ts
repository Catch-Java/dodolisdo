import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/Post';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>
    ){}

    async createPost(content: string){
        try{
            const post = new Post();
            post.content = content;

            await this.postRepository.save(post);
            return { success: true, post };
        } catch(error){
            return { success: false, error };
        }
    }

    async getPost(id: number) {
        try{
            const post = await this.postRepository.findOne({
                where: { id: id},
            });

            if(!post){
                throw new BadRequestException('Not Exist Post');
            }

            return { success: true, post };
        }catch(error){
            const errorMsg = error.response;
            return { success: false, errorMsg };
        }
    }

    async updatePost(id: number, content: string){
        try{
            const post = await this.postRepository.findOne({
                where: { id: id},
            });

            if(!post){
                throw new BadRequestException('Not Exist Post');
            }

            post.content = (content) ? content:post.content;
            await this.postRepository.save(post);
            return { success: true, post };
        } catch(error){
            const errorMsg = error.response;
            return { success: false, errorMsg };
        }
    }
}