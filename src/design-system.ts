import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('design-system')
export class DesignSystem extends LitElement {
  @property({ type: String }) header = 'My app';

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--design-system-background-color);
    }
  `;

  render() {
    return html`
      <main>
        <h1>${this.header}</h1>
      </main>
    `;
  }
}
