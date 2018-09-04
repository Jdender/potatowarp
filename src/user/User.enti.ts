import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import FlakeId from 'flakeid';
import { hash } from 'bcrypt';
import { Thread } from '../thread/Thread.enti';

const userFlake = new FlakeId();

const saltRounds = 10;

@Entity()
export class User {

    @PrimaryColumn()
    id: string;

    @BeforeInsert()
    private snowflake() {
        this.id = userFlake.gen();
    }

    @Column()
    username: string;

    @Column()
    displayName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    private async hashPassword() {
        // If password is raw than hash it
        this.password = this.password.startsWith('=raw=')
        ? await hash(
            this.password.replace(/^=raw=/, ''), 
            saltRounds,
        )
        : this.password;
    }

    @OneToMany(type => Thread, thread => thread.author)
    threads: Thread[];
}
