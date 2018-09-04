import { Entity, PrimaryColumn, Column, BeforeInsert, ManyToOne } from 'typeorm';
import FlakeId from 'flakeid';
import { User } from '../user/User.enti';

const threadFlake = new FlakeId();

@Entity()
export class Thread {

    @PrimaryColumn()
    id: string;

    @BeforeInsert()
    private snowflake() {
        this.id = threadFlake.gen();
    }

    @Column()
    title: string;

    @Column()
    content: string;

    @ManyToOne(type => User, user => user.threads)
    author: User;
}
