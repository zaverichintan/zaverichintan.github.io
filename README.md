# zaverichintan.github.io

Personal site of **Chintan Zaveri** — Deep Learning / Machine Learning Engineer, Berlin.

Live at **<https://zaverichintan.github.io/>**, served by GitHub Pages from the `master` branch.

---

## What this is

A single static page generated from my résumé. No build step, no framework, no
dependencies — one HTML file, one stylesheet, ~40 lines of vanilla JavaScript.
Open `index.html` in a browser and it works.

The page covers: summary, experience timeline, skills, projects, publications,
education, open source, and contact.

## Layout

```
index.html                     the entire site — content lives here, in plain HTML
css/site.css                   all styling; design tokens at the top of the file
js/site.js                     theme toggle, scroll-spy nav, footer year
img/profile.jpg                profile photo
file/Chintan_Zaveri_Resume.pdf downloadable résumé, linked from the hero and contact
_config.yml                    Jekyll config (site metadata; Pages builds with it)
robots.txt, sitemap.xml        crawler hints
legacy/                        the previous version of this site — see below
```

### Why there's no build step

The site is small enough that a generator would cost more than it saves. GitHub
Pages runs Jekyll over the repo, but `index.html` has no front matter, so Jekyll
copies it through untouched. `_config.yml` exists only to set site metadata and
keep `legacy/` out of the generated sitemap.

That means **you can edit `index.html` and see the result by opening the file
directly** — no server, no `bundle exec`, no npm.

## Running it locally

Opening `index.html` in a browser is enough for most changes. To exercise it over
HTTP the way Pages serves it (absolute paths, correct MIME types):

```sh
python3 -m http.server 8000
# then visit http://localhost:8000/
```

To reproduce the actual Pages build, install Jekyll and run `bundle exec jekyll serve`.
This is rarely necessary — nothing on the page depends on Jekyll.

## Making changes

### Content

All of it is in `index.html`, as ordinary semantic HTML. There is no data file and
no templating; a job is an `<article class="job">`, a project is an
`<article class="card">`. Copy an existing block and edit the text.

The `<script type="application/ld+json">` block near the top is
[schema.org](https://schema.org/Person) structured data for search engines. If you
change your job title, employer, or links in the page body, update it there too —
nothing keeps the two in sync automatically.

### Résumé PDF

`file/Chintan_Zaveri_Resume.pdf` is the file behind both "Download résumé" buttons.
To refresh it from a `.docx`:

```sh
soffice --headless --convert-to pdf --outdir file/ path/to/Chintan_Zaveri_Resume.docx
```

Check the output before committing — LibreOffice's conversion is usually faithful
but not guaranteed to be.

### Styling and theme

`css/site.css` defines every colour as a custom property on `:root`, then redefines
the same set for light mode in two places:

- `@media (prefers-color-scheme: light)` guarded by `:root:not([data-theme="dark"])`,
  so the system preference applies *unless* the visitor has explicitly chosen dark
- `:root[data-theme="light"]`, for an explicit light choice

Dark is the default when nothing else applies. `js/site.js` writes the visitor's
choice to `localStorage`, and a small inline script in `<head>` reads it back
*before* first paint so there's no flash of the wrong theme. Changing colours means
editing the token blocks; you should not need to touch individual rules.

## The `legacy/` directory

This repo previously hosted a forked portfolio template that still contained the
original author's content — their projects, their tagline, and a résumé link
pointing at a file that was never in the repo. Rather than delete it, the whole
thing is archived at **<https://zaverichintan.github.io/legacy/>**, self-contained
with its own `css/`, `js/`, `img/` and `projects/`, so it still renders as it did.

It is excluded from `sitemap.xml` and disallowed in `robots.txt`, so it stays out
of search results. If you no longer want it, deleting the directory is safe — the
only thing pointing at it is the footer link in `index.html`.

## Deploying

Push to `master`. GitHub Pages rebuilds automatically and the change is usually
live within one to two minutes.

```sh
git add -A
git commit -m "..."
git push origin master
```

Verify afterwards, since Pages fails quietly:

```sh
curl -sI https://zaverichintan.github.io/ | head -1
```

A change that works locally but 404s once deployed is almost always Jekyll
declining to publish a path — check `exclude` in `_config.yml`, and note that
Jekyll ignores top-level files and directories beginning with `_` or `.`.

## Browser support

Modern evergreen browsers. The page uses CSS custom properties, `color-mix()`,
`backdrop-filter` and `IntersectionObserver`; each degrades to something readable
rather than breaking. It honours `prefers-reduced-motion` and `prefers-color-scheme`,
renders without horizontal scrolling down to 320px, and remains fully legible with
JavaScript disabled — the toggle and scroll-spy simply stop working.

## Licence

Content (résumé text, photo) © Chintan Zaveri. The `legacy/` directory derives from
a third-party portfolio template and retains its original authorship.
