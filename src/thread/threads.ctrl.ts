import { Controller, Get, Render, CurrentUser, NotFoundError, Param } from 'routing-controllers';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from '../user/User.enti';
import { Repository } from 'typeorm';
import { Thread } from './Thread.enti';

@Controller()
export class ThreadCtrl {

    @InjectRepository(Thread)
    private threads: Repository<Thread>;

    @Get('/')
    @Render('thread/main')
    async getMain(
        @CurrentUser() user: User,
    ) {
        const threads = await this.threads.find();

        return { user, threads };
    }

    @Get('/thread/:id')
    @Render('thread/thread')
    async getThread(
        @CurrentUser() user: User,
        //@EntityFromParam('id', { required: true }) thread: Thread,
        @Param('id') id: string,
    ) {
        const thread = await this.threads.findOne(id);

        if (!thread) throw new NotFoundError('Thread not found');

        return { user, thread };
    }
}
