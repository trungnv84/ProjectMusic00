# Upgrade STATUS

- type: improver
- related_compose_run: runs/compose/2026-09-08-vi-yeu-la-vui-v2
- also_reviewed: runs/compose/2026-09-08-vi-yeu-la-vui-v3
- follows: runs/upgrade/2026-09-08-piano-accompaniment
- status: merged
- merged_at: 2026-09-08
- layers: [pipeline, knowledge, prompt, artifacts, catalog, guide, style]
- date: 2026-09-08
- notes: >
  Follow-up: soft piano-reduction guidance was merged but v2/v3 still shipped whole-note pad
  and step4 “lock P2 unchanged”. Harden REQUIRE_PIANO_TEXTURE into quality gate; step4 done
  requires piano_texture_policy ≠ unchanged-pad.
