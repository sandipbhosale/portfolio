# Storybook — portfolio component workshop

A small Storybook workspace for learning and documenting three reusable parts of the existing static portfolio:

- **Project card** — default and long-title examples.
- **Navigation** — active states for Home, Work and Experience.
- **Buttons** — primary and secondary calls to action.

The stories reuse the existing HTML class names and `styles.css`. The portfolio remains plain HTML, CSS and JavaScript: no React migration and no changes to the website itself are required to view Storybook.

## Run locally

Requirements: Node.js 20+ and npm 10+.

```bash
npm install
npm run storybook
```

Open http://localhost:6006.

To create a static Storybook build:

```bash
npm run build-storybook
```

The output is written to `storybook-static/`, separate from the portfolio deployment.

## How to use it

1. Open a component in the Storybook sidebar.
2. Compare its documented variations.
3. When a reusable component changes, update its matching story in `stories/` as part of the same change.
4. Review the Storybook preview before merging the GitHub pull request.

These are first learning examples, not a claim of prior Storybook expertise or a complete design system. Add components only when the website or a future product concept needs them.
