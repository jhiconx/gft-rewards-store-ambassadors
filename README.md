# GFT Rewards Store Ambassadors

Standalone GFT Rewards field-recruiting page for **Florida and New York**, coordinated by **Iconx.io, A Registered GFT Rewards Agency**. Its styling and payout values intentionally follow the existing Sampling For Good ambassador page, but this is a **separate project**. It is not a sampling program.

## Design and content

- Original visual system: Manrope + DM Sans, lavender gradient hero, white illustration card, rounded buttons, compensation cards, application and FAQ.
- **$25** per qualifying, approved store signup (not for a meeting alone).
- **$1** per verified unique shopper redemption during each attributed store's *first eligible promotion*.
- **$500** one-time territory completion bonus after every store on the pre-approved roster is enrolled and runs its first eligible promotion.
- Ambassadors **must speak English and Spanish** and **must complete GFT platform training**.
- 18 proposed Florida and 20 proposed New York city-centered territories, each approximately **20 × 20 statute miles (400 square miles)**. Overlapping squares are planning concepts, not exclusivity promises. Assigned store rosters are definitive.
- Searchable city list, state toggle, click-to-select geographic tiles and application territory picker.
- The street map uses Leaflet / OpenStreetMap tiles when available. If tiles do not fully load, a real embedded map (Google Maps, with an OpenStreetMap alternative) appears beneath the pink 20 × 20-mile planning box. The embedded view's box is illustrative; Leaflet's geographic rectangle follows the approximate mile coordinates.

## Deploy on a completely NEW GitHub repository and Vercel project

1. Create a **new**, empty GitHub repository named `gft-rewards-store-ambassadors` (not in `sampling-for-good-marketplace`).
2. Upload *these files* to that new repository, preserving `api/apply.js`.
3. In Vercel, select **Add New → Project → Import Git Repository**, select the new repository and use Framework Preset **Other**, Root Directory **./**, Build Command **none**, Output Directory **leave blank**.
4. Deploy. Vercel will serve `/` from `index.html` and expose `/api/apply` as a serverless function.
5. Configure environment variables in Vercel for production and preview: `RESEND_API_KEY`, `GFT_APPLICATION_FROM` (a verified Resend sender for Iconx), and optional `GFT_APPLICATION_TO` (default `rcramer@iconx.io`). Redeploy.
6. Test a form submission and confirm receipt in the recruitment inbox before using the page publicly.

**When Resend is not configured or returns an error:** the application page opens the user's email app with the application populated for `rcramer@iconx.io`. The user must press Send; the site explicitly does **not** claim that an application was received.

## Local preview

Run `python3 -m http.server 8000` from this folder and open `http://localhost:8000`. The interface, territory map and email draft fallback work, but direct `/api/apply` delivery requires Vercel and the configured Resend environment variables.

## Data handling / limitations

The website does not store applications in a public browser database or log applicant data. Direct applications are sent via Resend to the configured recruiting inbox; no CRM or application dashboard is included. The client includes a bot honeypot and the server validates required fields. Production hardening can add a rate limiter, CAPTCHA, or an application tracking database as needed.

The city-center coordinates are representative planning points. The website is not a GIS survey or a legal definition of territory. Adjacent city squares may overlap. Written store rosters and verified payout rules govern.

The $25 / $1 / $500 incentives and language/training requirements were provided for product implementation and do not by themselves establish employment classification or compliance with wage-and-hour law. Have the written compensation plan reviewed before launching recruitment.

**Existing Sampling For Good repository and site are not changed by this project.**