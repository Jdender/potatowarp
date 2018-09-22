import { Controller, Get, Render, Post, CurrentUser, UseBefore, Redirect } from 'routing-controllers';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from '../user/User.enti';
import { Repository } from 'typeorm';
import { urlencoded } from 'body-parser';
import { EntityFromBody } from 'typeorm-routing-controllers-extensions';
import { Thread } from './Thread.enti';

@Controller()
export class ThreadCtrl {

    @InjectRepository(Thread)
    private threads: Repository<Thread>;

    @Get('/new')
    @Render('thread/new')
    getNew(
        @CurrentUser() user: User,
    ) {
        return { user };
    }
    
    @Post('/new')
    @UseBefore(urlencoded({ extended: false }))
    @Redirect('/')
    postNew(
        @CurrentUser({ required: true }) user: User,
        @EntityFromBody({ required: true }) thread: Thread,
    ) {
        thread.author = user;

        return this.threads.save(thread);
    }
}
