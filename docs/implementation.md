# Implementation notes — v0.1

## Experience
Six steps: arrival (30 seconds by default, skip available), Scripture, prayer, gratitude, news, and departure. User controls the pace after arrival. The breathing animation is decorative; reduced-motion preferences are respected. Prayer and gratitude require no input.

## Trust boundaries
Crossway text is display-only; it is never supplied to Ollama. Human-written BibleRef commentary opens externally, with a distinct source label. The verse/context list and related readings are editorial suggestions and need human review before expansion; BibleRef links have not all been individually checked. The app has no AI theology mode. News selection uses exact source headline IDs with strict local validation. It is a limited headline scan, not fact checking, exhaustive monitoring, or a personal risk assessment. For more consequential news, cross-check in the original sources. Official weather alerts bypass AI. All remote content is inserted as text, never HTML; renderer is sandboxed and no remote page is embedded. Links open in the system browser.

## Data
Settings JSON in Electron userData includes optional display name, source choices, model, audio file path, weather zone, volume and last briefing date. The ESV key is in an ignored local .env file. Session contents live in process memory. No logs of prayers, no analytics, no database. Public repository defaults contain no personal profile or credentials.

## Known limitations / acceptance checks
- Run on Windows/macOS/Linux with Node and Ollama; desktop window/audio and network integration require actual device testing.
- Verify all source feeds and study links live; confirm publisher terms for personal headline selection. Add direct licensed wire-service feeds if available. BBC/NPR/official agency feeds are the initial mix; no claim of neutral coverage.
- Add more human-reviewed passages and source links; add historical commentary in-app only when licensed and reviewed.
- Improve positive selection and coverage with fixtures, duplicate detection across publishers, source diversity, and corroboration. Current model selects headlines, not full-article factual summaries.
- NWS zone must be configured manually. Broader regional alerts and other safety agencies are not yet implemented. Never replace normal emergency alerts.
- No installer, automatic startup, or signed release yet. No automatic daily notification.
- Random choices can repeat by design since there is no session history. No journaling or AI-generated prayer.
- Check ESV attribution, actual key, connection failures, sound toggle, local file playback, window resizing, keyboard navigation, reduced motion and daily completion on a real machine.

## v0.2 — fullscreen, study, briefing and packaging

- Native fullscreen with no kiosk lock, Esc/F11, persistent Close control, windowed launch preference. External links leave fullscreen. Scrollable main content keeps controls visible.
- Optional study uses four compact choices: Context (ESV), Explanation (human-authored BibleRef link), Related verses, Reflect. No model sees Scripture or generates theology. Commentary is still external and individual links need review.
- 16 default feeds; migrate old preferences while respecting existing disabled feeds. Recent headline IDs classified positive/negative/neutral/unclear with relevance and impact (0–3 each); score = 2×relevance + impact. Invalid and missing rows are not silently classified. Default negative selection requires relevance and impact >=2; source caps reduce duplication, not proof of corroboration. More headlines are optional. Weather remains model-independent. Headline classification is not fact-checking; source access, AI ranking quality and publisher terms still need live review. Batches may take several minutes on slower models.
- Portable unsigned Windows x64 preview via electron-builder; exact package versions pinned but no committed transitive lock yet. CI performs syntax/unit checks, production dependency advisory gate, packaged renderer startup smoke test and records SHA256/signature. Not a malware certification; actual portable wrapper launch, Defender scan, UI behavior, audio, ESV and local model still need device verification.
- Renderer sandbox, context isolation, no Node integration, permission denial, explicit link allowlist, bounded feed parsing and no XML DTD/entities. ESV token can be encrypted with OS-backed safeStorage; no secrets or settings included in package. Smoke uses temporary isolated settings and disables news, models and API key. No startup task or automatic updates.

## v0.3 — offline study and worship audio
- All fourteen daily references have original matching verse-range commentary from a pinned CC0 Matthew Henry transcription. Source path, blob hash and license included. Explanation is offline; BibleRef optional. Related verses expand inside the ESV study tab. No ESV is bundled or provided to Ollama. Historical devotional interpretation is not modern scholarly consensus.
- Three public-domain hymn melodies and two original ambient compositions, locally synthesized with Web Audio. Rotation chooses a hymn per session; settings preview; silent default; no third-party recordings. Audio quality and melody review, live ESV and desktop usability still require human/device validation.
- Updated Windows artifact filename and CI checks. Unsigned build limitations unchanged.
