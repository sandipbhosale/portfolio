# Sandip Bhosale portfolio: editing guide

This folder is your whole website. You do not need Claude or any special tool to change it.
Everything is plain files that open in any text editor.

## What is in the folder

| File or folder | What it holds |
|---|---|
| `index.html` | The home page: all text, sections and links |
| `styles.css` | Colours, fonts, spacing, layout |
| `script.js` | The small interactions (timeline, copy email, light/dark switch, cursor effects) |
| `images/` | Your photo and the three retail logos |
| `page-template.html` | A blank page you can copy to make new pages |
| `README.md` | This guide (you can delete it before uploading, it is not part of the site) |

## One-time setup

1. Install **VS Code** (free): https://code.visualstudio.com
2. In VS Code choose **File, Open Folder** and pick this folder.
3. To preview, double-click `index.html` and it opens in your browser. After each edit, save the file (Ctrl+S, or Cmd+S on a Mac) and refresh the browser tab.

The page loads its two fonts from Google Fonts, so it needs an internet connection to look exactly right.

## Safe-editing rules

- **Make a backup first.** Copy the whole folder and add the date to its name, for example `portfolio-2026-11-10`.
- Change only the words **between** tags. In `<h2>Get in touch</h2>`, edit only "Get in touch".
- Change **one thing at a time**, save, refresh, and check. If something breaks, press Ctrl+Z, or go back to your backup copy.
- Use **Ctrl+F** (Cmd+F on a Mac) to find text. Search for a few words you can see on the page.
- Always use straight quotes inside code, and keep the curly apostrophe (’) in visible text if you like the typography.

## Common edits (find it, change it)

| I want to change | Where | How |
|---|---|---|
| Hero headline | `index.html`, search `I design enterprise software` | Edit the three short lines inside the `<h1>` |
| Intro paragraph under the headline | `index.html`, search `I’m Sandip Bhosale` | Edit the text |
| Photo | `images/profile.webp` | Replace the file with a new image of the same name. If it is a PNG, name it `profile.png` and change `images/profile.webp` in `index.html` to match. Use a square image with a transparent background |
| Email | `index.html` (twice, in the Contact section) and `script.js` (once, near the top, search `bhosale.sandip2`) | Change all three |
| Phone | `index.html`, search `8956503553` (two places: the link and the visible text) | Change both |
| LinkedIn | `index.html`, search `linkedin.com` | Change the link |
| Menu links | `index.html`, inside `<nav class="nav">` | Edit the words. The `#work` part must match a section `id` |
| Skills (What I work with) | `index.html`, search `What I work with` | Edit the four short paragraphs |
| Page title and Google description | Top of `index.html`, `<title>` and `<meta name="description">` | Edit the text |
| Colours | `styles.css`, the block at the very top (`:root`) | Change a value such as `--blue: #2A45F5;` and the whole site updates. Dark mode colours are the next two blocks |
| Fonts | `styles.css` top (`--display`, `--serif`) and the Google Fonts `<link>` in `index.html` | Pick new fonts at fonts.google.com and copy their link |
| Remove all cursor effects | `script.js` | Delete everything under `3. CURSOR EFFECTS` |
| Stop the footer text | `index.html`, search `Designed and built by` | Edit or delete the line |

## Then and now (the comparison section)

Each stage is one block that starts with `<details class="vr"` and ends with `</details>`.

- To **edit** a stage: change the words inside the `<span class="s">`, `<span class="n">` and `<span class="w">` (stage name, "now" title, "before" title), then the two paragraphs and the tool tags below.
- To **add** a stage: copy a whole block, paste it where you want it, and edit the words. Change `style="--i:3"` so the numbers keep counting up (0, 1, 2, 3 ...).
- To **remove** a stage: delete the whole block.
- Only one stage is open on first load, the one with the word `open` after `class="vr"`. Remove that word to start with all closed.

## Add a work item (a new piece in Selected work)

In `index.html`, find `<section id="work">`. Inside it is `<div class="work-list">` with one `<details>` block per piece. Copy the block below and paste it just before the `</div>` that closes `work-list`, and edit the words.

```html
<details>
  <summary>
    <span class="t">Title of the project</span>
    <span class="m">Company name</span>
    <span class="pm" aria-hidden="true"></span>
  </summary>
  <dl class="detail">
    <dt>The problem</dt><dd>Two or three sentences about the problem.</dd>
    <dt>What I did</dt><dd>What you designed or decided.</dd>
    <dt>What changed</dt><dd>The result for the people who use it.</dd>
  </dl>
</details>
```

- To start a piece **open**, write `<details open>`.
- To **remove** a piece, delete its whole `<details>` ... `</details>` block.
- The first piece (the filter case study) is longer: it contains the before/after screens and the retail logos. Use it as a model for a full case study.

### Add a full page for a case study

1. Copy `page-template.html` and rename the copy, for example `digital-twin.html` (lowercase, no spaces).
2. Open it and follow the numbered notes at the top and inside. Put screenshots in the `images` folder and use their file names.
3. In `index.html`, inside the matching work item, add a link, for example `<p><a href="digital-twin.html">Read the full story</a></p>`.

## Experience

- Each employer is one `<div class="job">` block. Copy one to add a role.
- "Earlier roles" is a simple list. Each line is one `<li>`: company, role, dates. Copy a line to add one.

## Put it online (Cloudflare Pages) and update later

First publish:
1. Create a free Cloudflare account and go to **Workers & Pages**, then **Create application**, then **Get started**, then **Drag and drop your files**.
2. Name the project and drag in this **whole folder** (the one that contains `index.html`). `index.html` must be at the top level of what you upload. You can delete `README.md` first if you want.
3. Open the `.pages.dev` address Cloudflare gives you and check the site.
4. In the project, open **Custom domains** and follow the steps to connect your domain.

Each later update:
1. Edit, save and check on your computer.
2. In the same Cloudflare Pages project, create a new deployment and drag the folder in again.
3. Wait about a minute and refresh your site.

A project made with drag and drop cannot be switched to Git later, so keep this routine. Drag and drop allows up to 1,000 files and 25 MB per file, far more than you need.

## If something looks wrong

- **Page looks plain, no colours:** `styles.css` is missing or renamed. It must sit next to `index.html`.
- **A picture is missing:** the file name in `index.html` must match the file in `images/` exactly, including capital letters.
- **A section vanished:** you probably deleted a closing tag (`</div>`, `</section>`, `</details>`). Press Ctrl+Z until it returns, or restore your backup.
- **Something stopped moving or clicking:** open `script.js`, undo your last change there, or restore the backup.
- **Your edit does not show online:** upload the folder again and hard-refresh the page (Ctrl+Shift+R).

## Getting help from an AI tool later

Paste the contents of `index.html` into any AI chat and say what you want changed, for example:
"Here is my portfolio page. Add a new item to the Selected work list titled X with these three paragraphs. Change nothing else, and return the full file."
Always keep a backup and compare the result before uploading.
