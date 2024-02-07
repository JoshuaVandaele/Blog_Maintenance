export interface CriteriaFilter {
    isArticlesMe: boolean;
    title: string | null;
    author: string | null;
    content: string | null;
}

export const factoryCriteriasFilter = (isArticlesMe: boolean, title: string | null, author: string | null, content: string | null): CriteriaFilter => {
    return {
        isArticlesMe,
        title,
        author,
        content,
    }
}

export const factoryEmptyCriteriasForMeFilter = (): CriteriaFilter => {
    return factoryCriteriasFilter(true, '', '', '');
}

export const factoryEmptyCriteriasForNotMeFilter = (): CriteriaFilter => {
    return factoryCriteriasFilter(false, '', '', '');
}

