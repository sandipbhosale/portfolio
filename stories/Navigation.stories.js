const meta = {
  title: 'Portfolio/Navigation',
  parameters: { docs: { description: { component: 'The desktop navigation, shown with the same brand and navigation styles used in the portfolio header.' } } }
};
export default meta;
const navigation = (active = 'Work') => `
  <div class="storybook-stage storybook-stage--nav">
    <header class="top" style="position:static;min-height:64px;">
      <a class="brand" href="#">I am Sandip Bhosale</a>
      <div class="hdr-r">
        <nav class="nav" aria-label="Sections">
          ${['Home', 'Now and then', 'Work', 'Experience', 'Resume', 'Contact'].map(label => `<a href="#" ${label === active ? 'class="active" aria-current="location"' : ''}>${label}</a>`).join('')}
        </nav>
      </div>
    </header>
  </div>`;
export const WorkActive = { render: () => navigation('Work') };
export const HomeActive = { render: () => navigation('Home') };
export const ExperienceActive = { render: () => navigation('Experience') };
