import { Controller, Get, Post, Render, BodyParam, UnauthorizedError, UseBefore, NotFoundError, Req } from 'routing-controllers';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from './User.enti';
import { compare } from 'bcrypt';
import { urlencoded } from 'body-parser';
import { Request } from 'express';

const required = true;

@Controller()
export class LoginCtrl {

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
        // User
        const user = await this.users.findOne({ username });

        if (!user) throw new NotFoundError('User not found');

        // Password
        const valid = await compare(password, user.password);

        if (!valid) throw new UnauthorizedError('Invalid password');

        // Update session
        request.session!.userId = user.id;
    }

    @Post('/logout')
    postLogout(@Req() request: Request) {
        delete request.session!.userId;
    }
}
