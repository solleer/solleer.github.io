import {LitElement, css, html} from 'lit';
import {customElement, property, queryAssignedElements, state} from 'lit/decorators.js';

// Accepts a time string in the format "HH:MM:SS" and converts it to a number representing the total seconds
export const timeStrToSec = (timeStr: string): number => {
    // If just 2 parts are provided, assume it's "MM:SS" and prepend "00:" for hours
    if (timeStr.split(':').length === 2) {
        timeStr = '00:' + timeStr;
    }
    const [hours, minutes, sec] = timeStr.split(':').map(Number);
    return hours * 3600 + minutes * 60 + sec;
};

export const splitToWatts = (split: number): number => {
    return 2.8 / ((split / 500) ** 3);
};

@customElement('rs-ergcalc-form')
export class ErgCalcForm extends LitElement {
    @queryAssignedElements({slot: 'form', selector: 'form'})
    _listItems!: Array<HTMLFormElement>;

    @property({type: String})
    title: string = '';

    // Takes in form data and returns an array of tuples, where each tuple contains a label and a value
    @property({attribute: false})
    formAction: (data: FormData) => [string, string][] | void = () => {};

    updated(changedProperties: Map<string, any>) {
        if (changedProperties.has('formAction')) {
            this._listItems.forEach(form => {
                form.addEventListener('submit', e => {
                    e.preventDefault();
                    const formData = new FormData(form);
                    const result = this.formAction(formData);
                    if (result) {
                        this.values = result;
                    }
                });
            });
        }
    }

    @state()
    values: [string, string][] = [];

    render() {
        return html`
            ${ this.title ? html`<h2 style="margin-top: 0;">${this.title}</h2>` : '' }
            <slot name="form"></slot>
            <section class="results">
                <ul>
                    ${this.values.map(([label, value]) => html`
                        <li><strong>${value}</strong> <span class="label">${label}</span></li>
                    `)}
                </ul>
            </section>
        `;
    }

    static styles = css`
        :host {
            display: block;
            max-width: 50ch;
        }

        .results ul {
            list-style: none;
            padding-left: 0;
        }

        .results strong {
            font-size: var(--wa-font-size-l);
        }

        .results .label {
            color: var(--wa-color-text-quiet);
        }
    `;
}

declare global {
  interface HTMLElementTagNameMap {
    "rs-ergcalc-form": ErgCalcForm;
  }
}