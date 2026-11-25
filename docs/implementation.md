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
