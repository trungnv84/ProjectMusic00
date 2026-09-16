# MERGE — Package 3

- from: `runs/upgrade/2026-09-16-melody-objective-package-3/proposed/`
- to: `docs/m-guide/`

## Files

- `docs/m-guide/knowledge/melody/melodic-rhythm.md`
- `docs/m-guide/knowledge/melody/contour.md`
- `docs/m-guide/knowledge/melody/phrase-structure.md`
- `docs/m-guide/knowledge/melody/hook-types.md`
- `docs/m-guide/catalog.yml`

## Approval items

- `melodic-rhythm.md` is a new knowledge page; new constraints are marked `needs-approval: true`.
- `hook-types.md` is a new knowledge page; new constraints are marked `needs-approval: true`.
- `contour.md` and `phrase-structure.md` are version bumps with additive hints/constraints; no new hard PASS/FAIL threshold is introduced.
- No pipeline or Objective Selector behavior is changed in Package 3.

## Instruction

Only copy the files under `proposed/` into `docs/m-guide/` after the user explicitly requests merge/apply.
