/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.stories.js'],
  addons: ['@storybook/addon-docs'],
  framework: '@storybook/html-vite',
  staticDirs: ['../images', '../assets'],
};
export default config;
