import { Controller, Get, Render, Post } from 'routing-controllers';

@Controller()
export class SignupCtrl {

    @Get('/signup')
    @Render('user/signup')
    getSignup() {
        return {};
    }
}
