interface IQuoteContent {
    text: string;
    author: string;
}

export interface IQuote {
    id: number;
    en: IQuoteContent;
    uk: IQuoteContent;
}
