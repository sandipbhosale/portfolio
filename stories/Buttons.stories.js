const meta = {
  title: 'Portfolio/Buttons',
  parameters: { docs: { description: { component: 'The primary and secondary call-to-action link styles used throughout the portfolio.' } } }
};
export default meta;
const actions = () => `
  <div class="storybook-stage storybook-stage--buttons">
    <a class="btn primary" href="#">See selected work</a>
    <a class="btn ghost" href="#">Get in touch</a>
  </div>`;
export const CallToActionPair = { render: actions };
export const Primary = { render: () => '<div class="storybook-stage"><a class="btn primary" href="#">See selected work</a></div>' };
export const Secondary = { render: () => '<div class="storybook-stage"><a class="btn ghost" href="#">Get in touch</a></div>' };
