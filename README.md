# Wearza – AI-Powered E-Wardrobe (R26-IT-053)

Research project website built with plain HTML, CSS and JavaScript. Ready for GitHub Pages.

## Folder structure
```
index.html          → the whole one-page site
css/style.css       → styles (purple & white theme, dark mode supported)
js/main.js          → menu, interactive wardrobe demo, contact form
assets/img/         → logo + diagrams from the research paper
assets/docs/        → proposal report PDFs
.nojekyll           → tells GitHub Pages to serve files as-is
```

## Host on GitHub Pages (username.github.io/Wearza-Website)
1. Create a new **public** repository on GitHub, e.g. `Wearza-Website`.
2. Upload every file and folder in this directory (keep the structure), or:
   ```bash
   git init
   git add .
   git commit -m "Wearza website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/Wearza-Website.git
   git push -u origin main
   ```
3. In the repo go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
5. After about a minute the site is live at `https://<your-username>.github.io/Wearza-Website/`.

## Things to update
- **GitHub repo link & contact email**: edit `CONFIG` at the top of `js/main.js`.
- **Milestone dates / status**: edit the `<ol class="timeline">` list in `index.html`
  (`class="done"` = completed, `class="now"` = in progress, no class = upcoming).
- **Team photos**: put photos in `assets/img/` and replace the initials inside
  `<div class="avatar">AP</div>` with `<img src="assets/img/perera.jpg" alt="Perera A.A.E.A">`.
- **Slides / charter / thesis**: add PDFs to `assets/docs/` and replace the
  "Coming soon" badge with a link, like the proposal links.
- **Background photos**: the three images in the Background section load from Unsplash.
  To use your own, put them in `assets/img/` and change the `src` values.
