import { newE2EPage } from '@stencil/core/testing';

describe('uiw-input-number', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<uiw-input-number></uiw-input-number>');
    const element = await page.find('uiw-input-number');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<uiw-input-number></uiw-input-number>');
    const component = await page.find('uiw-input-number');
    const element = await page.find('uiw-input-number >>> div');
    expect(element.textContent).toEqual(`Hello, World! I'm `);

    component.setProperty('first', 'James');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James`);

    component.setProperty('last', 'Quincy');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Quincy`);

    component.setProperty('middle', 'Earl');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Earl Quincy`);
  });
});
