# My First Website

Portfolio site for Bedour, Business System Analyst — ready to deploy to AWS Amplify via GitHub.

## What is included

- `index.html` — single page
- `css/style.css` — basic styles
- `js/main.js` — tiny JS interaction
- `amplify.yml` — Amplify build config for static sites
- `.gitignore` — helpful ignores

This version includes a contact form that can be configured to use Formspree or a mailto fallback.

## Quick local preview

If you have Python installed, from the project root run:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy to AWS Amplify via GitHub

1. Initialize a git repo, commit, and push this folder to GitHub.
2. In the AWS Amplify Console choose "Connect app" → GitHub and select the repository and branch.
3. Amplify will read `amplify.yml`. No build is required for this static site.
4. Confirm and deploy.

## Notes

- To add a build step (e.g., bundling), update `amplify.yml` accordingly.
- This scaffold is intentionally minimal — extend it as needed.

## Contact form configuration

- Option A — Formspree (recommended if you want inbound emails without exposing your address):
	1. Create a free Formspree form at https://formspree.io and copy the form endpoint URL.
	2. Open `index.html` and set the `data-formspree-endpoint` attribute on the `#contactForm` element to the endpoint URL.

- Option B — Mailto fallback (no server):
	1. Open `index.html` and set `data-email="your-email@example.com"` on the `#contactForm` element.
	2. When users submit, their email client will open with a prefilled message.

If you'd like, I can initialize git here and create a README-friendly first commit and push commands for GitHub.
