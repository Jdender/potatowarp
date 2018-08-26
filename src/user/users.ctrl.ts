import { JsonController, Get } from 'routing-controllers';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from './User.enti';

@JsonController()
export class UsersCtrl {

    @InjectRepository(User)
    private users: Repository<User>;

    @Get('/users')
    getUsers() {
        return this.users.find();
    }

}
