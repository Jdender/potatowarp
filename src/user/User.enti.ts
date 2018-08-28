import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import FlakeId from 'flakeid';
import { hash } from 'bcrypt';

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
        ? await hash(this.password, saltRounds)
        : this.password;
    }

}
