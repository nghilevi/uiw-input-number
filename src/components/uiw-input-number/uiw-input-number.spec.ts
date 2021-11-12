import { newSpecPage } from '@stencil/core/testing';
import { UiwInputNumber } from './uiw-input-number';

describe('uiw-input-number', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [UiwInputNumber],
      html: '<uiw-input-number></uiw-input-number>',
    });
    expect(root).toEqualHtml(`
      <uiw-input-number>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </uiw-input-number>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [UiwInputNumber],
      html: `<uiw-input-number first="Stencil" last="'Don't call me a framework' JS"></uiw-input-number>`,
    });
    expect(root).toEqualHtml(`
      <uiw-input-number first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </uiw-input-number>
    `);
  });
});
