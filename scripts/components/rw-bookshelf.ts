import { html, LitElement, PropertyValues } from "lit";
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
    product: any | null;
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

    willUpdate(changedProperties: PropertyValues<this>) {
        if (changedProperties.has('profileId') || changedProperties.has('bookStatus') || changedProperties.has('publicToken')) {
            this._fetchBooks();
        }
    }

    private async _fetchBooks() {
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

    render() {
        return html`
        <ul>
         ${this._books.map(book => html`
            <li>${book.title} - ${book.author}</li>`)}
        </ul>
        `;
    }

}