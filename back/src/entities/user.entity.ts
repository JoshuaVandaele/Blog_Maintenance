import { Entity, PrimaryGeneratedColumn, Column, IntegerType} from 'typeorm';
import Model from "./model.entity";
import { IsEmail, validate, IsNotEmpty } from "class-validator";

@Entity('users')
export class User extends Model {

    @Column()
    name: string;

    @Column()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column()
    @IsNotEmpty()
    password: string;
}
