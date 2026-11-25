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
