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

## College ambassador store clusters — November 21, 2026

A separate bilingual page at `/college-clusters.html` is linked from the main GFT Rewards Store Ambassador homepage. It uses the existing GFT + Iconx branding, with no changes to the application or email delivery systems.

- **23 prospective stores:** 21 Florida, 1 New York, 1 Massachusetts, taken from the supplied target list.
- **12 field clusters:** 10 Florida, 1 Brooklyn, 1 Dorchester/Boston. Each store is assigned exactly once to a proposed cluster.
- **28 recommended campus candidates:** primary and alternate institutions, each with its own official college source URL and published campus address.
- **Wave 1:** 6 multi-store clusters and 17 prospective stores. **Wave 2:** 6 single-store/specialty clusters and 6 stores.
- The page supports search by college, store, city or market; state/launch-wave filters; campus and store map views; suggested multi-stop Google Maps routes; English/Spanish translation; and direct links to the existing ambassador application.
- Campus “lead” rankings and visit routes are qualitative planning recommendations, not measured drive times or enrollment statistics.
- Store addresses are **user supplied and not independently verified**. Flagged source records: Unidos 2 Kissimmee ZIP `24744`; Ocho Rios III street suffix; Boston ZIP `2122`. These remain displayed as supplied and should be confirmed before dispatch.
- The USF Sarasota-Manatee campus facilities transitioned to New College of Florida in July 2026; therefore SCF Bradenton and New College are the Bradenton recruiting targets rather than treating the old USF site as a standalone current school.

**New files:** `college-clusters.html`, `college-clusters-data.js`, `college-clusters.css`, `college-clusters.js`, `tests/college-clusters-smoke.cjs`, and `.github/workflows/college-clusters-qa.yml`.

All campus source links are listed in the `colleges` entries of `college-clusters-data.js`; store entries are prospective CRM targets, not verified active GFT merchants. The site does not claim any agreement with a college, student ambassador, or store. Recruitment, POS checks, and assignment require separate approval.

## Application delivery — existing Iconx stack

Applications are posted to the dedicated Supabase Edge Function `gft-store-ambassador-apply` in existing project `yxfqfrgjjbxagrioeqzz` and saved to the separate private RLS table `public.gft_store_ambassador_applications`. The Supabase project does not currently have its own `RESEND_API_KEY`, so the function uses the **existing Iconx.io Vercel Resend email service** at `https://iconx.io/api/gft-ambassador-mail`. This relay has fixed recipients **rcramer@iconx.io** and **support@gftrewards.com**, validates applications, and never accepts arbitrary email recipients. The browser never opens a local email application. The GFT form displays success only after Resend accepts the notification. Its stored submission ID supports safe retries.

The website uses the Edge Function directly; `api/apply.js` is a same-origin proxy fallback for connectivity issues. Application data is not public, and the Sampling For Good application function/table are unchanged.

## Deploy on a completely NEW GitHub repository and Vercel project

1. Create a **new**, empty GitHub repository named `gft-rewards-store-ambassadors` (not in `sampling-for-good-marketplace`).
2. Upload *these files* to that new repository, preserving `api/apply.js`.
3. In Vercel, select **Add New → Project → Import Git Repository**, select the new repository and use Framework Preset **Other**, Root Directory **./**, Build Command **none**, Output Directory **leave blank**.
4. Deploy. Vercel will serve `/` from `index.html` and expose `/api/apply` as a serverless function.
5. The dedicated GFT Supabase Edge Function uses Resend credentials from the existing Iconx.io Vercel project. No secret is exposed to the GFT public site or GitHub code.
6. Test a form submission and confirm receipt in the recruitment inbox before using the page publicly.

**When Resend is unavailable or rejects a notification:** the application form displays an inline error; it never opens a local email program. If storage already succeeded, the saved submission can be retried without a duplicate application.

## Local preview

Run `python3 -m http.server 8000` from this folder and open `http://localhost:8000`. The interface and territory map work locally; the form submits directly to the configured Supabase Edge Function, which sends via Resend. No Mac email application is used. The same-origin `/api/apply` proxy requires Vercel.

## Data handling / limitations

The GFT-specific Supabase table stores applications with Row Level Security enabled and no anonymous policies. The Edge Function sends via Resend to two defined recruiting inboxes; there is no public CRM or application dashboard. The client includes a honeypot; the Edge Function validates fields and rate-limits repeated submissions per email and territory. CAPTCHA can be added if spam appears.

The city-center coordinates are representative planning points. The website is not a GIS survey or a legal definition of territory. Adjacent city squares may overlap. Written store rosters and verified payout rules govern.

The $25 / $1 / $500 incentives and language/training requirements were provided for product implementation and do not by themselves establish employment classification or compliance with wage-and-hour law. Have the written compensation plan reviewed before launching recruitment.

**Existing Sampling For Good repository and site are not changed by this project.**
## Bilingual website

The language selector (EN / ES) changes visitor-facing content, including dynamic territory text, instructions and application feedback. Language choice is retained locally when the browser permits it. The English source remains the default. Ongoing 2¢ redemption commissions are conditional on verified eligible redemptions and the written active-store attribution agreement.

## Delivery verification

On November 17, 2026, an automated test application was saved in the private GFT applications table and the notification was accepted by the Iconx.io Resend email relay. The database reports `notification_status = sent`. These results verify email-provider acceptance, not final delivery to each inbox. The synthetic applicant is clearly labeled `GFT System Test Ignore` and is not a real applicant. GitHub Actions retains a health/CORS check that does not send recurring test emails.

Supabase function source is versioned at `supabase/functions/gft-store-ambassador-apply/index.ts`. Deploying that function is a separate Supabase operation. Vercel continues auto-deploying the standalone GFT website from this GitHub repository.

## Applicant acknowledgment email — GFT Retail Solutions

After a GFT Store Ambassador application is stored and the internal recruiting notification is accepted, the Iconx.io Resend relay attempts a separate applicant email from the **requested sender** `GFTAmbassadors@iconx.io`, shown as `GFT Retail Solutions`. The message follows the approved Campus Ambassador confirmation layout, updated to say **GFT Retail Ambassador**, **GFT Retail Solutions**, and **Retail Execution**. English/Spanish content follows the submitted form language. The internal recipients remain `rcramer@iconx.io` and `support@gftrewards.com`. Provider acceptance and applicant-confirmation status are tracked separately in `confirmation_status`, `confirmation_provider_id` and `confirmation_sent_at`. A rejected applicant sender does not erase a saved application or an accepted internal recruiting email; the website reports a confirmation-email warning without opening Mac Mail. Sending from the specified `@iconx.io` sender requires the domain to be authorized in Resend.
