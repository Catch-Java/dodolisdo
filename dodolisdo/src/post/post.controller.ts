import { Post } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';

@ApiTags('Post CRUD')
@Controller('post')
export class PostController {
    constructor(private postService: PostService){}

    @ApiBody({
        description: 'content 넣기',
        schema: {
            example: {
                content: 'abcd'
            }
        }
    })
    @ApiResponse({
        description: '성공',
        status: 201,
        schema: {
            example: {
                success: true,
                post: {
                    id: 1,
                    content: 'abcd'
                }
            }
        }
    })
    @Post('')
    async createPost(
        @Body('content') content: string,
    ){
        return await this.postService.createPost(content);
    }

    @Get('')
    async getPost(
        @Query('id') id: number,
    ){
        return await this.postService.getPost(id);
    }
    
    @Put(':id')
    async updatePost(
        @Param('id') id: number,
        @Body('content') content: string,
    ){
        return await this.postService.updatePost(id, content);
    }
}