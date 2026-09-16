# Run Review — Melody Objective System / Package 2

## Meta
- type: improver
- package: 2 — Tier 1 core mechanics, phần A
- date: 2026-09-16
- related compose runs:
  - `runs/compose/2026-09-08-vi-yeu-la-vui-v3/`
  - `runs/compose/2026-09-08-vi-yeu-la-vui-v4/`
  - `runs/compose/2026-09-08-vi-yeu-la-vui-v2/`
- roadmap:
  - `runs/upgrade/2026-09-15-melody-objective-system/ROADMAP.md`

## Evidence / problem statement
The existing melody knowledge already covers contour, phrase structure, motif development, catchy hooks and basic vocal phrasing, but three Tier-1 objectives remain without a dedicated objective page:

1. `singability` is scattered across vocal range, tessitura, breath and melisma guidance. This makes it difficult to select it as an explicit objective and difficult to distinguish "easy to sing" from "too flat/repetitive".
2. `emotional_contour` is represented indirectly by contour/intensity hints, but there is no dedicated page that explains rising/falling contour as tendencies over an emotional arc without turning them into fixed formulas.
3. `tension_release` is present implicitly in phrase/cadence guidance but lacks a standalone objective definition with controllable evidence at phrase/section level.

The observed compose problems motivating the objective system include repetitive/near-repetitive phrases, insufficient section contrast and weak musical progression. The repository's current `catchiness.md` already states that memorability requires repetition-with-variation, a clear contour, rhythmic identity, singable range, section contrast and a developed final payoff. The new pages therefore complement rather than replace existing melody pages.

## Duplication audit
| Proposed page | Existing related page(s) | Decision |
|---|---|---|
| `singability.md` | `knowledge/vocal/phrasing-breath-and-melisma.md`, `knowledge/melody/contour.md`, `knowledge/melody/phrase-structure.md` | Create new objective page. Existing pages contain supporting rules but do not define `singability` as an objective with its own selection/evaluation contract. |
| `emotional-contour.md` | `knowledge/melody/contour.md`, `knowledge/melody/phrase-structure.md`, `knowledge/melody/composition-planning.md` | Create new objective page. Existing pages describe contour/phrase mechanics, not an emotional-arc objective and evidence model. |
| `tension-release.md` | `knowledge/melody/phrase-structure.md`, `knowledge/melody/motif-development.md`, `knowledge/melody/catchiness.md` | Create new objective page. Existing pages mention opening/closing and development, but not a dedicated tension/release framework. |

## Scope decision
Included:
- 3 new Tier-1 knowledge pages.
- Objective-schema-compatible front matter.
- 3 catalog entries with `[compose, melody]` tags.

Excluded:
- `pipeline/step-03-compose.md`.
- `objective-selection.md`.
- `composition-planning.md` section objectives.
- `musical-quality-gate.md` hard thresholds.
- Tier-2/Tier-3 objective pages.

## Design constraints
- Use tendencies, not deterministic mappings, for emotional contour.
- Do not equate singability with low range, stepwise-only motion, or low complexity.
- Do not treat tension as "high notes = tension" or release as "tonic = release" in every context.
- Preserve user-explicit melody requirements and allow composer judgment where no hard constraint exists.
- No new hard PASS/FAIL numeric threshold is introduced in this package.
