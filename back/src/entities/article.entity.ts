import { Entity, Column, IntegerType, ManyToOne } from "typeorm";
import Model from "./model.entity";
import { validate, IsNotEmpty } from "class-validator";
import { Request } from "express";
import {User } from "./user.entity";

@Entity('articles')
export class Article extends Model {

    @Column()
    title: string;  

    @Column()
    content: string;
    
    @Column()
    date: Date;   

    @ManyToOne(() => User, (user) => user.id)
    author: User
}