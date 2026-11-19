# Said Abdullah — Portfolio

Personal site for Said Abdullah, software engineer. Static **HTML**, **CSS**, and **JavaScript**. No build step and no backend. Content lives in `js/script.js` (`portfolioData`).

## Run locally

Open `index.html` in a browser, or from the project root:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Edit the site

Update `portfolioData` in `js/script.js`.

- Personal details, biography, and links: `personal`
- Skills: `skills`
- Roles: `experience`
- Schools: `education`
- Case studies: `projects`

The page reads that object on load. Keep facts aligned with the résumé in `assets/documents/`.

`personal.github` is unused until it is a real `https://` URL. Placeholder values are not shown.

`personal.siteUrl` stays empty until the site has a public address. After deploy, set it to the origin with no trailing slash, for example `https://username.github.io` or `https://username.github.io/repository`. That value is used for the canonical URL and Open Graph image. Paths in the HTML are relative, so the same files work at the domain root or in a project subpath.

Profile photo: `assets/images/me.jpeg`.  
Résumé: `assets/documents/resume.pdf`.

Private application notes in `docs/` are listed in `.gitignore` and are not part of the public site.

## Deploy on GitHub Pages

The site is static. GitHub Pages can serve the repository root. Pick one source so the two methods do not fight.

### GitHub Actions

Workflow: `.github/workflows/pages.yml`. It publishes the repository root on every push to `main`.

1. Push the project to GitHub.
2. Settings → Pages → Build and deployment → Source: **GitHub Actions**.
3. Push to `main`, or run the “Deploy GitHub Pages” workflow by hand.
4. Copy the Pages URL into `portfolioData.personal.siteUrl` and push again.

### Branch

1. Settings → Pages → Source: **Deploy from a branch**.
2. Branch: `main`, folder: `/ (root)`.
3. A `.nojekyll` file is included so Pages serves the files as-is.

For a user site, the repository is usually `username.github.io` and the site is `https://username.github.io`. For a project site, the URL includes the repository name. Relative links cover both. Do not hardcode `localhost`.

## Files

```
index.html
css/style.css
css/responsive.css
js/script.js          # portfolioData
js/_runtime.js        # page behavior
assets/images/
assets/documents/resume.pdf
favicon/favicon.svg
robots.txt
.nojekyll
.github/workflows/pages.yml
```

`robots.txt` allows crawling. Add a sitemap line there after the public URL is known. A sitemap needs absolute URLs, so it is not committed with a guessed host.

## Contact form

The form opens the visitor’s mail app with a `mailto:` link to the address in `portfolioData`. It does not post to a server. GitHub Pages cannot run a form backend. A hosted form service can replace the submit handler in `initContactForm()` if you want one later.

## Browser support

Current Chrome, Edge, Firefox, and Safari.
