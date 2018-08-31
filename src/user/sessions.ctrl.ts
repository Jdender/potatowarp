import { JsonController, Get, Post, Render, BodyParam, UnauthorizedError, UseBefore, NotFoundError, Req } from 'routing-controllers';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from './User.enti';
import { compare } from 'bcrypt';
import { urlencoded } from 'body-parser';
import { Request } from 'express';

const required = true;

@JsonController()
export class UsersCtrl {

    @InjectRepository(User)
    private users: Repository<User>;

    @Get('/login')
    @Render('user/login')
    getLogin() {
        return {};
    }

    @Post('/login')
    @UseBefore(urlencoded({ extended: false }))
    async postLogin(
        @Req() request: Request,
        @BodyParam('username', { required }) username: string,
        @BodyParam('password', { required }) password: string,
    ) {
        const user = await this.users.findOne({ username });

        if (!user) throw new NotFoundError('User not found');

        const valid = await compare(password, user.password);

        if (!valid) throw new UnauthorizedError('Invalid password');

        request.session!.userId = user.id;
    }

    @Get('/signup')
    @Render('user/signup')
    getSignup() {
        return {};
    }

}
