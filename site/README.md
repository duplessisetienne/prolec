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
| Logo (PNG/SVG) | `assets/img/logo.png`; swap the `brand-text` span in each header for the `<img>` in the comment |
| Hero photo | Replace `assets/img/stock/hero.jpg`, or point `--hero-img` at the top of the `.hero` rule in `style.css` to a new file |
| Social preview image (1200x630) | Replace `assets/img/og-image.jpg` (currently a crop of the stock hero) |
| Service, project, about photos | Currently CC0 stock placeholders in `assets/img/stock/` (credits in `CREDITS.md` there). Swap the `src` of each `<img class="card-img">` for Pro-Lec's own photos. **Project photos must be Pro-Lec's real work before launch**; stock photos there would misrepresent the company. |
| Project titles, locations, descriptions | `projects.html` (see the comment above the grid) and the 4 recent projects on `index.html` |
| About Us text, service areas, service lists | `about.html`, `services.html` (marked `CONTENT:`) |
| Facebook page name | Replace `PROLEC_FACEBOOK_PAGE` (Facebook and Messenger links) |
| Enquiry recipient email | Create a free Formspree form sent to that address; replace `YOUR_FORM_ID` in `contact.html` |
| Domain | Replace `DOMAIN` in `robots.txt` and `sitemap.xml`; make `og:image` URLs absolute |
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

- [ ] All placeholders above replaced (`grep -rn "PROLEC_FACEBOOK_PAGE\|YOUR_FORM_ID\|DOMAIN\|class=\"ph\|img/stock/" site`)
- [ ] Photos compressed (under ~300 KB each)
- [ ] Enquiry form test message received
- [ ] HTTPS active on hosting
- [ ] Checked on phone, tablet and desktop
- [ ] Sitemap submitted in Google Search Console
