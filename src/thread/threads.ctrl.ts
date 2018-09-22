import { Controller, Get, Render, Session } from 'routing-controllers';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from '../user/User.enti';
import { Repository } from 'typeorm';

@Controller()
export class ThreadCtrl {

    @InjectRepository(User)
    private users: Repository<User>;

    @Get('/')
    @Render('thread/main')
    async getMain(
        @Session('userId', { required: false }) id: string,
    ) {
        const user = await this.users.findOne({ where: { id } });

        return { user };
    }
}
