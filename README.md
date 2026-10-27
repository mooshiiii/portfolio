# graham.moshii.co.uk

Personal portfolio for Graham Reid: network and infrastructure projects, CV and contact.

Plain static HTML and CSS. No build step and no trackers. `assets/zoom.js` opens any project diagram full screen with zoom in/out when it's tapped or clicked. `assets/contact.js` builds the "Email me" and "Copy email address" buttons. The address is never shown on the page or written in the HTML, so harvesters can't read it. To change the address, base64-encode it (`printf '%s' 'you@example.com' | base64`) and put the result in the button's `data-email` attribute in `index.html`.

## Structure

```
index.html          the whole site (projects, case study, about, contact)
404.html            not-found page
_headers            Cloudflare Pages security and cache headers
assets/site.css     styles (navy, copper, IBM Plex, matching the CV)
assets/fonts/       self-hosted IBM Plex (SIL Open Font Licence, see OFL.txt)
assets/favicon.svg
cv/                 public copy of the CV (no phone number)
```

## Deploying on Cloudflare Pages

1. Workers & Pages → Create → Pages → Connect to Git → choose `mooshiiii/portfolio`.
2. Framework preset: **None**. Build command: *(leave empty)*. Build output directory: `/`.
3. After the first deploy: Custom domains → Set up a domain → `graham.moshii.co.uk`. Cloudflare adds the DNS record because `moshii.co.uk` is already on Cloudflare.

Every push to `main` redeploys automatically.

## Updating

- **New project or write-up:** copy an `<article class="card">` block in `index.html`.
- **Diagrams** are inline SVG inside each card, styled by the `.dg-*` classes in `site.css`.
- **CV:** replace `cv/Graham-Reid-CV.pdf`, keeping the same file name so links still work.
