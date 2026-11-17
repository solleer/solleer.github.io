import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";

type PublicBook = {
    id: number;
    title: string | null;
    author: string | null;
    status: 'currently_reading' | 'want_to_read' | 'finished' | 'did_not_finish';
    started_reading_at: string | null;
    finished_reading_at: string | null;
    rating: number | null;
    review: string | null;
    product: PublicProduct | null;
};

type PublicProduct = {
    id: string;
    title: string | null;
    author: string | null;
    isbn: string | null;
    cover_url: string | null;
    store_url: string | null;
};



@customElement('rw-bookshelf')
export class ReadwiseBookshelf extends LitElement {
    private BASE_URL = 'https://readwise.io';
    @property()
    profileId: string = '';
    
    @property()
    publicToken: string = '';

    @property()
    bookStatus: PublicBook['status'] | '' = '';

    @state()
    private _books: PublicBook[] = [];

    constructor() {
        super();
        this._fetchBooks();
    }

    private get _shelfTitle(): string {
        switch (this.bookStatus) {
            case 'currently_reading':
                return 'Currently Reading';
            case 'want_to_read':
                return 'Want to Read';
            case 'finished':
                return 'Finished Books';
            case 'did_not_finish':
                return 'Did Not Finish';
            default:
                return 'Books';
        }
    }

    willUpdate(changedProperties: PropertyValues<this>) {
        if (changedProperties.has('profileId') || changedProperties.has('bookStatus') || changedProperties.has('publicToken')) {
            this._fetchBooks();
        }
    }

    private async _fetchBooks(): Promise<void> {
        if (!this.profileId || !this.bookStatus || !this.publicToken) {
            this._books = [];
            return;
        }

        const response = await fetch(`${this.BASE_URL}/books/api/v1/public/${this.profileId}/books?status=${this.bookStatus}&order=-started_reading_at`, {
            headers: {
                'Books-Public-Token': this.publicToken,
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            this._books = data.results;
        }
    }

    private _bookShelfItem(book: PublicBook) {
        if (!book) return html``;
        if (!book.product) {
            return html`<li class="rw-bookshelf__book"><cite>${book.title}</cite> - ${book.author}</li>`;
        }
        return html`
            <li class="rw-bookshelf__book">
                <a href="${book.product?.store_url ?? ''}" target="_blank" rel="noopener noreferrer">
                    ${book.product.cover_url
                        ? html`<img src="${book.product.cover_url}" alt="${book.product.title} cover" title="${book.product.title} - ${book.product.author}"/>`
                        : html`<span><cite>${book.product.title}</cite> - ${book.product.author}</span>`}
                </a>
            </li>`;
    }

    render() {
        return html`
        <h2 class="rw-bookshelf-title">${this._shelfTitle}</h2>
        <wa-scroller>
            <ul class="rw-bookshelf">
            ${this._books.map(book => this._bookShelfItem(book))}
            </ul>
        </wa-scroller>
        `;
    }

    static styles = css`
        .rw-bookshelf-title {
            margin: 0;
        }

        .rw-bookshelf {
            margin: 0;
            padding: 1rem;
            display: flex;
            gap: 1rem;
            align-items: flex-end;
        }
        .rw-bookshelf__book {
            list-style: none;
            width: 8rem;
            flex-shrink: 0;
            text-align: center;

            background: white;
            box-shadow: 1px 0px 12px 5px rgb(0 0 0 / 0.08);
        }
        .rw-bookshelf__book a {
            display: flex;
        }
        .rw-bookshelf__book img {
            width: 100%;
        }
    `;

}