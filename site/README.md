# Pro-Lec website (Phase 1)

Static site: plain HTML, Bootstrap 5.3 (CDN), Bootstrap Icons, one CSS file and one JS file. No build step. Upload the contents of this folder to the web root of any host.

```
site/
  index.html  about.html  services.html  projects.html  contact.html  privacy.html
  assets/css/style.css   brand colours are the tokens at the top of the file
  assets/js/main.js      footer year, project filters, enquiry form
  assets/img/            logo, favicon, photos
  robots.txt  sitemap.xml
```

Header and footer are repeated in every page. Change them in all six files.

After changing `style.css` or `main.js`, bump the `?v=` number on their links in all six pages so browsers fetch the new file instead of a cached copy.

## Preview locally

```bash
python -m http.server 8080 --directory site
```

Then open http://localhost:8080.

## Before launch: still needed from Pro-Lec

| Item | Where it goes |
|---|---|
| Transparent logo (optional) | The supplied logo has a black background (the "SVG" is a PNG inside an SVG wrapper). `assets/img/logo.png` is cropped from the desktop background and its black keyed out to transparency, so it only works on dark backgrounds (the silver parts vanish on white). A transparent PNG or true vector SVG from the designer would be cleaner. |
| Service, project, about photos | Currently CC0 stock placeholders in `assets/img/stock/` (credits in `CREDITS.md` there). Swap the `src` of each `<img class="card-img">` for Pro-Lec's own photos. **Project photos must be Pro-Lec's real work before launch**; stock photos there would misrepresent the company. |
| Project titles, locations, descriptions | `projects.html` (see the comment above the grid) and the 4 recent projects on `index.html` |
| Messenger link check | Facebook page has no username, so Messenger links use the page ID (`m.me/61589092294598`). Test that it opens a chat with Pro-Lec; if not, set a page username and update the 2 `m.me` links. |
| Enquiry recipient email | Create a free Formspree form sent to that address; replace `YOUR_FORM_ID` in `contact.html` |
| Domain transfer | `prolec.co.za` is set throughout (canonical links, `og:` tags, `robots.txt`, `sitemap.xml`). Pro-Lec is transferring it; point it at HostAfrica when done. `.htaccess` redirects `www` and `http` to `https://prolec.co.za`, so SSL must be active first. |
| Privacy notice approval | `privacy.html`: standard POPIA wording, Pro-Lec to confirm |

## Deployment

Workflow: `.github/workflows/pages.yml`.

- **Preview:** every push to `main` that changes `site/` publishes to https://duplessisetienne.github.io/prolec/ (marked noindex). Share this link with Pro-Lec for review.
- **Live (HostAfrica):** only when run by hand, after Pro-Lec approves: Actions > Deploy site > Run workflow > tick "Also publish to the live site".

One-time setup for live deploys:

1. Pro-Lec opens the HostAfrica hosting account and domain in their name.
2. In cPanel, create an FTP account limited to `public_html` (or use the main one).
3. In GitHub: Settings > Secrets and variables > Actions > New repository secret. Add `FTP_SERVER` (e.g. `ftp.prolec.co.za`), `FTP_USERNAME`, `FTP_PASSWORD`, and optionally `FTP_DIR` (default `public_html/`; with a limited FTP account use `./`).
4. Enable SSL in cPanel (AutoSSL / Let's Encrypt).

## Launch checklist

- [ ] All placeholders above replaced (`grep -rn "YOUR_FORM_ID\|class=\"ph\|img/stock/" site`)
- [ ] Photos compressed (under ~300 KB each)
- [ ] Enquiry form test message received
- [ ] HTTPS active on hosting
- [ ] Checked on phone, tablet and desktop
- [ ] Sitemap submitted in Google Search Console
- [ ] Google Business Profile set up for Pro-Lec (same name, address and phone as the site)
- [ ] Update `<lastmod>` dates in `sitemap.xml` when pages change
