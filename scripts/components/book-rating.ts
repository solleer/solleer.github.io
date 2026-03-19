import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {map} from 'lit/directives/map.js';
import {range} from 'lit/directives/range.js';

@customElement('rs-fixed-rating')
export class FixedRating extends LitElement {
    @property({type: Number})
    rating: number = 3;

    @property()
    iconName: string = 'star';

    @property()
    iconLibrary: string = 'default';

    @property()
    iconFamily: string = '';

    render() {
        console.log(this.iconLibrary)
        return html`
            <span aria-label=${"Rating of " + this.rating} class="rating-block">
                ${map(range(this.rating), i => html`
                    <wa-icon auto-width family=${this.iconLibrary} name=${this.iconName} library=${this.iconLibrary}></wa-icon>    
                `)}
            </span>
        `
    }

    static styles = css`
        :host {
            display: inline-flex;
            align-items: center;
        }
        .rating-block {
            display: inline-flex;
            flex-wrap: nowrap;
            color: var(--wa-color-fill-loud);
        }
    `;
}

declare global {
  interface HTMLElementTagNameMap {
    "rs-fixed-rating": FixedRating;
  }
}