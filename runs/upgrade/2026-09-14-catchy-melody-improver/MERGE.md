# MERGE

- from: `runs/upgrade/2026-09-14-catchy-melody-improver/proposed/`
- to: `docs/m-guide/`
- status: proposal only
- instruction: Chỉ merge khi user yêu cầu rõ ràng.

## Proposed files
- `docs/m-guide/knowledge/melody/catchiness.md`
- `docs/m-guide/knowledge/melody/anti-patterns.md`
- `docs/m-guide/knowledge/melody/musical-quality-gate.md`
- `docs/m-guide/pipeline/step-03-compose.md`
- `docs/m-guide/catalog.yml`
- `docs/m-guide/prompts/improver.md` (optional follow-up only; not required for core behavior)

## Approval-required constraints
- `REQUIRE_CATCHY_HOOK`
- minimum candidate count / independent composer passes
- reference-song analysis before invention
- candidate selection process
- catchiness score thresholds and listener-proxy tests
