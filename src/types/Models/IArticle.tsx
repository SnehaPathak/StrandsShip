export interface IArticle {
    title?: string,
    subtitle?: string,
    imageUrl?: string,
    content?: string
}

export interface ArticleList
{
  articles: IArticle[]
}