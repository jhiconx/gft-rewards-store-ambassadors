# GFT Rewards Store Ambassadors

Standalone GFT Rewards field-recruiting page for **Florida and New York**, coordinated by **Iconx.io, A Registered GFT Rewards Agency**. Its styling and payout values intentionally follow the existing Sampling For Good ambassador page, but this is a **separate project**. It is not a sampling program.

## Design and content

- Original visual system: Manrope + DM Sans, lavender gradient hero, white illustration card, rounded buttons, compensation cards, application and FAQ.
- **$25** per qualifying, approved store signup (not for a meeting alone).
- **$1** per verified unique shopper redemption during each attributed store's *first eligible promotion*.
- **$500** one-time territory completion bonus after every store on the pre-approved roster is enrolled and runs its first eligible promotion.
- **$0.02 (2¢)** per verified, eligible reward redemption on an ongoing basis at the stores attributed to the ambassador while they participate under the written compensation agreement, including after the first promotion. The $1 first-promotion incentive remains separate.
- The interface is fully bilingual **English/Español** with a persistent language switch in the header, including the application, map controls, FAQs, and compensation terms.
- Ambassadors **must speak English and Spanish** and **must complete GFT platform training**.
- 18 proposed Florida and 20 proposed New York city-centered territories, each approximately **20 × 20 statute miles (400 square miles)**. Overlapping squares are planning concepts, not exclusivity promises. Assigned store rosters are definitive.
- Searchable city list, state toggle, click-to-select geographic tiles and application territory picker.
- The street map uses Leaflet / OpenStreetMap tiles when available. If tiles do not fully load, a real embedded map (Google Maps, with an OpenStreetMap alternative) appears beneath the pink 20 × 20-mile planning box. The embedded view's box is illustrative; Leaflet's geographic rectangle follows the approximate mile coordinates.

## Application delivery — existing Iconx stack

Applications are posted to the dedicated Supabase Edge Function `gft-store-ambassador-apply` in existing project `yxfqfrgjjbxagrioeqzz`. The handler writes to a separate private RLS table `public.gft_store_ambassador_applications` and uses the existing Supabase server-side `RESEND_API_KEY` and existing verified sender configuration (`AMBASSADOR_FROM_EMAIL` or `SAMPLE_FROM_EMAIL`, with fallback `no-reply@send.iconx.io`). It submits recruiting notifications to **rcramer@iconx.io** and **support@gftrewards.com**. No applicant email app is involved. The application form displays a confirmation only after Resend accepts the notification request; otherwise it shows an inline error and retains the submission ID for safe retries.

The website uses the Edge Function directly; `api/apply.js` is a same-origin proxy fallback for connectivity issues. Application data is not public, and the Sampling For Good application function/table are unchanged.

## Deploy on a completely NEW GitHub repository and Vercel project

1. Create a **new**, empty GitHub repository named `gft-rewards-store-ambassadors` (not in `sampling-for-good-marketplace`).
2. Upload *these files* to that new repository, preserving `api/apply.js`.
3. In Vercel, select **Add New → Project → Import Git Repository**, select the new repository and use Framework Preset **Other**, Root Directory **./**, Build Command **none**, Output Directory **leave blank**.
4. Deploy. Vercel will serve `/` from `index.html` and expose `/api/apply` as a serverless function.
5. The dedicated GFT Supabase Edge Function uses Resend credentials already managed as secrets in the existing Iconx Supabase project. No new email keys are required in Vercel.
6. Test a form submission and confirm receipt in the recruitment inbox before using the page publicly.

**When Resend is unavailable or rejects a notification:** the application form displays an inline error; it never opens a local email program. If storage already succeeded, the saved submission can be retried without a duplicate application.

## Local preview

Run `python3 -m http.server 8000` from this folder and open `http://localhost:8000`. The interface, territory map and email draft fallback work, but direct `/api/apply` delivery requires Vercel and the configured Resend environment variables.

## Data handling / limitations

The website does not store applications in a public browser database or log applicant data. Direct applications are sent via Resend to the configured recruiting inbox; no CRM or application dashboard is included. The client includes a bot honeypot and the server validates required fields. Production hardening can add a rate limiter, CAPTCHA, or an application tracking database as needed.

The city-center coordinates are representative planning points. The website is not a GIS survey or a legal definition of territory. Adjacent city squares may overlap. Written store rosters and verified payout rules govern.

The $25 / $1 / $500 incentives and language/training requirements were provided for product implementation and do not by themselves establish employment classification or compliance with wage-and-hour law. Have the written compensation plan reviewed before launching recruitment.

**Existing Sampling For Good repository and site are not changed by this project.**
## Bilingual website

The language selector (EN / ES) changes visitor-facing content, including dynamic territory text, instructions and application feedback. Language choice is retained locally when the browser permits it. The English source remains the default. Ongoing 2¢ redemption commissions are conditional on verified eligible redemptions and the written active-store attribution agreement.
