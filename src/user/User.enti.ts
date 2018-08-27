import { Entity, PrimaryColumn, Column, BeforeInsert } from 'typeorm';
import FlakeId from 'flakeid';

const userFlake = new FlakeId();

@Entity()
export class User {

    @PrimaryColumn()
    id: string;

    @BeforeInsert()
    private snowflake() {
        this.id = userFlake.gen();
    }

    @Column()
    name: string;
}
