const meta = {
  title: 'Portfolio/Project Card',
  parameters: { docs: { description: { component: 'The project card used in Selected Work, using the real portfolio classes and thumbnail asset.' } } }
};
export default meta;
const card = (title, description, image = '/thumb-1.png') => `
  <div class="storybook-stage storybook-stage--card">
    <a class="project-card" href="#">
      <div class="project-thumb ai-portfolio-thumb">
        <img src="${image}" alt="Portfolio website thumbnail" style="display:block;width:100%;height:auto" />
      </div>
      <div class="project-card-copy">
        <div><h3>${title}</h3><p>${description}</p></div>
        <span class="project-arrow" aria-hidden="true">↗</span>
      </div>
    </a>
  </div>`;
export const Default = { render: () => card('Building my portfolio website with AI', 'AI-assisted development · Personal project') };
export const LongTitle = { render: () => card('Designing a connected discovery experience for complex enterprise products', 'Product design · Enterprise SaaS') };
