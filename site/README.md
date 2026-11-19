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

## Preview locally

```bash
python -m http.server 8080 --directory site
```

Then open http://localhost:8080.

## Before launch: still needed from Pro-Lec

| Item | Where it goes |
|---|---|
| Logo (PNG/SVG) | `assets/img/logo.png`; swap the `brand-text` span in each header for the `<img>` in the comment |
| Hero photo | `assets/img/hero.jpg`; add `style="--hero-img:url('assets/img/hero.jpg')"` to `<section class="hero">` in `index.html` |
| Social preview image (1200x630) | `assets/img/og-image.jpg` |
| Service photos, project photos | Replace each `<div class="ph">` with `<img class="card-img" src="..." alt="..." loading="lazy">` |
| Project titles, locations, descriptions | `projects.html` (see the comment above the grid) and the 4 recent projects on `index.html` |
| About Us text, service areas, service lists | `about.html`, `services.html` (marked `CONTENT:`) |
| WhatsApp number | Currently `27638048504` (Operations 063 804 8504). Search and replace `wa.me/27638048504` if different |
| Facebook page name | Replace `PROLEC_FACEBOOK_PAGE` (Facebook and Messenger links) |
| Enquiry recipient email | Create a free Formspree form sent to that address; replace `YOUR_FORM_ID` in `contact.html` |
| Domain | Replace `DOMAIN` in `robots.txt` and `sitemap.xml`; make `og:image` URLs absolute |
| Privacy notice approval | `privacy.html`: standard POPIA wording, Pro-Lec to confirm |

## Launch checklist

- [ ] All placeholders above replaced (`grep -rn "PROLEC_FACEBOOK_PAGE\|YOUR_FORM_ID\|DOMAIN\|class=\"ph" site`)
- [ ] Photos compressed (under ~300 KB each)
- [ ] Enquiry form test message received
- [ ] HTTPS active on hosting
- [ ] Checked on phone, tablet and desktop
- [ ] Sitemap submitted in Google Search Console
