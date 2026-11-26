# Be Still

A quiet, local-first Christian morning ritual. Begin with God, remember what matters, then go live your life.

## Run locally

Install Node.js 22 or newer and Git. From a terminal:

```sh
git clone https://github.com/TimothyAllgood/bestill.git
cd bestill
npm install
npm start
```

For the initial feature branch, use `git switch feat/local-morning-ritual` before installing if it has not been merged.

No cloud account, database, telemetry or paid model is required. Ollama is optional: start your existing local Ollama server and choose an installed model in Settings. Nothing downloads a model automatically.

### ESV setup

Get a free personal noncommercial API token at https://api.esv.org/. Copy `.env.example` to `.env`, enter the token and restart. Without a token or network connection, the app offers a link to the authentic passage rather than inventing Scripture. The ESV API text and token never enter any model prompt. See https://www.crossway.org/permissions/ and https://api.esv.org/.

### Sound

Silent by default. Toggle a gentle original sustained ambient pad, or choose your own legally obtained instrumental worship track (MP3/WAV/OGG/M4A/FLAC up to 50 MB) in Settings. No third-party worship recordings are bundled. Audio stays local.

### News and study

- Optional study opens the surrounding ESV passage and links to human-authored BibleRef commentary, related readings and original reflection questions. No generated theology.
- A once-daily briefing uses publisher RSS headlines from BBC, NPR, BLS, NASA and NIH. These are starting sources, not a guarantee of neutrality or full coverage. Links and headlines come from the feed, never the model. Ollama selects IDs only; no generated summaries or personal risk judgments. A 72-hour window gives quiet news days some context. Offline or failed selection is labeled unclassified.
- Optionally set an official US NWS county/forecast zone code. Alerts are retrieved independently of the model, and failed checks are identified. Not an emergency warning system.
- The local model is sent only news headline text and source labels, not name, location, Scripture, or prayer prompts. Feed headlines remain untrusted data. The application does not fetch full article text.
- Check publisher terms before any redistribution or additional AI use. This is a personal-use reader; no publisher content is bundled.

The ritual randomly selects from curated reference and prompt lists on every launch; a repeat is possible. Only settings and the last successfully displayed briefing date persist. No journal, prayer history, or news cache. External sites opened in your browser follow their own privacy policies.

## Development

```sh
npm run check
npm test
```

Electron desktop shell, vanilla HTML/CSS/JavaScript, Node main process and a restricted IPC bridge. No local web server or agent tool calls. The small stack is a deliberate V1 alternative to Tauri/React to avoid Rust setup and extra frontend tooling; desktop packaging is not yet configured.

See [implementation notes](docs/implementation.md) for boundaries and remaining work.

## v0.2 Windows preview

The **Checks and Windows preview** workflow builds a portable x64 EXE, tests the packaged app startup in an isolated profile, checks production dependencies for high/critical advisories and attaches a SHA-256 checksum, signature status and resolved dependency lockfile. Download the artifact from the successful workflow run for the exact commit. No release is automatically published. It is unsigned unless a valid signing certificate is configured; SmartScreen may warn. Do not bypass Windows security controls. Scan the file with Microsoft Defender, compare its SHA-256 to the matching workflow artifact and inspect the signature. A checksum detects changes but does not guarantee malware-free software. The launch smoke test is not a malware scan or an end-to-end test.

Build locally from this branch with Node 22+: `npm install`, `npm run check`, `npm test`, `npm run build:win`. The portable executable is in dist. Build dependencies are pinned directly; the full transitive lockfile is generated at build time and included as an artifact, not yet committed. No administrator privileges, startup registration, or auto-updater are required by the app. ESV keys can now be entered in Settings, stored using Electron safeStorage when backed by OS encryption; the dev .env remains supported. Fullscreen starts by default; Esc exits it, F11 toggles it, and Close × quits. External source links leave fullscreen so the browser is visible.

News now has 16 feeds, up to 96 unique recent candidate headlines, and local model tone/relevance/impact classification in batches of 24. The default displays up to five constructive and three consequential negative headlines, with optional ranked details. Counts represent classified headlines, not world conditions; partial model failures and feed failures are visible. Good News Network is explicitly a positive-story outlet, not a neutral wire service. New feeds and their publisher terms need live verification before redistribution. No article text or generated news summaries are used.

## v0.3 — offline study and instrumental library
The Explanation tab includes complete matching verse-range commentary sections for every current daily verse, from a pinned CC0 Matthew Henry transcription. Related verses expand inside the app via the separate ESV API. Built-in music includes Amazing Grace, Doxology, Abide with Me and two original ambient pieces, hymn rotation and sound preview. Silent remains default. See [audio provenance](docs/audio-attribution.md) and [commentary attribution](src/study/ATTRIBUTION.md). Windows artifact: BeStill-0.3.0-win-x64.exe.

## v0.4 — reliable, relevant briefing
26 configured feeds, including Axios National and New Orleans, Louisiana Illuminator, The Register, TechCrunch AI, MIT Technology Review, Hugging Face, GitHub Blog, Science News and NPR Economy. Upgrade retains prior disabled sources. Company blogs are primary announcements, not independent reporting. The app exposes feed errors and count, original headlines as soon as fetching finishes, partial classification progress, and an explicit manual refresh even after daily completion. Only continuing from a finished nonempty briefing marks it complete; no article cache or new stored history. Ranking prioritizes relevant terms, scans up to 96 candidates, and attempts local classification of up to 48 within a bounded 50-second classification budget (plus feed/model discovery). No AI classification means original headlines remain visible and unclassified. New endpoints are configured from published feed information, not all live-tested. Windows artifact: BeStill-0.4.0-win-x64.exe.

## v0.5 — a quieter reading experience
News uses a short editorial layout: up to three constructive, two neutral and two consequential negative stories, with optional extra stories and source/AI diagnostics collapsed. Official weather alerts remain independent of the model and visible when present. Study offers curated BibleProject video links for every daily selection; videos open on the official website, with production credit and no stored media. The Explore tab also links to NET Bible notes, BibleRef and The Gospel Coalition; historical Matthew Henry text is optional and collapsed by default. Scripture expands to 26 passages with matching offline commentary; 24 arrival, 22 prayer, 22 gratitude and 12 closing prompts. No new saved history. Windows artifact: BeStill-0.5.0-win-x64.exe.

## v0.6 — whole-Bible exploration and a final thought
Short reflections now span all 66 books in the Protestant ESV canon. Settings also offers random full-chapter reading across all 1,189 chapters, with no reading history stored; selection changes on next launch. ESV still fetched directly from Crossway; no Bible text bundled. BibleProject overviews map to book and chapter range, with shared and split videos and an official collection link. The original 26 passages retain offline Matthew Henry commentary and curated cross-references; additional passages have chapter context, BibleProject and general study resources, but no invented commentary or cross-references. Prayer prompt library now has 62 entries and gratitude 34. The last screen presents one of 12 attributed public-domain literary/philosophical excerpts, then a short sendoff. Quotes are separate from Scripture and not an endorsement of an author's worldview. Sources open only when requested. Windows artifact: BeStill-0.6.0-win-x64.exe.

## v0.7 — more depth, quiet variation
485 short-reading references across the ESV canon (plus full-chapter mode), 112 prayer prompts, 64 gratitude prompts, 40 opening reflections, 28 short sendoffs and 60 literary excerpts. 51 new literary excerpts checked against public-domain source transcriptions, with source file and blob identity; two previously unverified attributions and a duplicate fragment removed/replaced. Five restrained session palettes (woodland, dawn, rain, ember, night), CSS-only ambient light and a softer breathing animation. Classic mode disables ambient motion; OS reduced-motion settings are respected. No images, extra network requests, reading history or additional ritual stages. Original offline commentary coverage unchanged. New scripture references and live video/ESV links still need review. Windows artifact: BeStill-0.7.0-win-x64.exe.

## v0.8 — optional ritual variations
The original morning remains the default six-step flow. Settings for next launch offer difficult, grateful, quiet, evening and automatic time-of-day modes; every mode includes Scripture and personal prayer, and difficult/quiet/evening omit news. Full-chapter preference remains independent. Optional expandable wonder (8 sourced facts) and action (20 suggestions) are inside existing gratitude and closing screens. Closing literature grows to 69 selections, including nine source-checked Christian excerpts by Brother Lawrence, Chesterton and Bunyan; choose mixed, Christian or poetry. Reviewed original AI-assisted prompt copy for plain, specific phrasing; not attributed to human writers. No new saved journal or history.

### More soundscapes
Seven local procedural soundscapes: window rain, creek, waves, woodland, wind, distant thunder, brown noise. Two additional original synthesized music pieces, Window Light (piano-style) and Still Air (strings-style), plus existing hymns and ambient tracks. Stereo nature-inspired audio, overlapping loop, smooth fade-in, cancellation during preparation. Silent remains the default; preview through Settings. These are synthesized approximations, not nature recordings or sampled piano/strings. No network or new dependencies. Actual listening review remains necessary.

## v0.9 — actual recordings and broader offline study
Four optional, original Ogg recordings from Wikimedia Commons: Swale (Siddharth Patil, CC0), Rain and thunder (Caesar, public domain), Forest Lawn Creek (Dsw4, public domain), Amazing Grace solo organ (The Uninvited Co., Inc., CC BY-SA 2.5). In Settings select a recording, download explicitly, preview and save. Original bytes verified against published size, Ogg header and SHA-1 before storage and on playback; no streaming, no auto-download, no alteration. Source and license links visible. Recordings stored locally, not bundled. Existing synthesized choices remain and silence is default. 14 additional historical commentary chapters with 59 source sections, local and optional. Build: BeStill-0.9.0-win-x64.exe.

News quality pass: source/topic-balanced candidate selection; optional publisher excerpts and exact matching headlines from other publisher families, explicitly not independent corroboration. No generated summaries. Packaged smoke test traverses original ritual, study tabs, offline news fixture, closing and back navigation, without accessing live services.

Added 7 source-checked excerpts by MacDonald, Thoreau and Chesterton (now 76 closing readings); further 17 original prompt rewrites. Optional seasonal palette uses local calendar month in Northern Hemisphere; no location service. Changes to the palette selection apply on next session; classic motion-off still works immediately.
