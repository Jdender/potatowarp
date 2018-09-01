import { Controller, Get, Render } from 'routing-controllers';

@Controller()
export class ThreadCtrl {

    @Get('/')
    @Render('thread/main')
    getMain() {
        return {};
    }
}
