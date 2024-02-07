import { UUID } from "crypto";

export interface ArticleType {
    id: UUID
    title: string;
    author: string;
    content: string;
    date: Date;
    isArticleMe: boolean;
}