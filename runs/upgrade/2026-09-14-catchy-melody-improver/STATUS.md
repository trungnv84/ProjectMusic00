# Upgrade STATUS
- type: improver
- related_compose_run: runs/compose/2026-09-08-nang-som-tinh-khoi/
- status: proposed
- layers: [knowledge, prompt, pipeline, catalog]
- step_failed: [3]
- date: 2026-09-14
- merge: forbidden until user explicitly approves

## Scope
The compose run produced a technically valid MusicXML artifact but the user reports that the melody is disconnected, repetitive, boring and not catchy.

This proposal does **not** modify `docs/m-guide/` directly. It proposes a stronger composition process centered on deliberate catchiness, reference-song analysis at the feature level, multiple independently generated melody candidates, and adversarial selection before export.
