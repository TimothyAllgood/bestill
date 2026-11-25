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
