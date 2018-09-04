import { Controller, Get, Render, Post, UseBefore, Body, Redirect } from 'routing-controllers';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { EntityFromBody } from 'typeorm-routing-controllers-extensions';
import { User } from './User.enti';
import { urlencoded } from 'body-parser';

@Controller()
export class SignupCtrl {

    @InjectRepository(User)
    private users: Repository<User>;

    @Get('/signup')
    @Render('user/signup')
    getSignup() {
        return {};
    }

    @Post('/signup')
    @UseBefore(urlencoded({ extended: false }))
    @Redirect('/')
    postSignup(
        @EntityFromBody({ required: true }) user: User,
    ) {
        // Mark as raw so it gets hashed
        user.password = '=raw='.concat(user.password);

        return this.users.save(user);
    }
}
