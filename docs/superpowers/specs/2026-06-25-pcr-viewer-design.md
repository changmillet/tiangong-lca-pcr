---
title: PCR Viewer Design
docType: design
scope: repo
status: draft
authoritative: false
owner: tiangong-lca-pcr
language: en
createdAt: 2026-06-25
---

# PCR Viewer Design

## Goal

Add a small local frontend for browsing and reading PCR content in this repository without changing PCR authoring truth.

The viewer is for PCR authors, reviewers, and data-production agents who need to quickly inspect available PCR records, open bilingual Markdown, and review structured guidance generated from `structured.yaml`.

## Selected Approach

Use a static viewer generated from repository data.

The implementation will add a small `packages/pcr-viewer/` package containing:

- a Node data-build script that reads the existing repository through `packages/pcr-core`
- static browser assets under `packages/pcr-viewer/static/`
- generated viewer data under `packages/pcr-viewer/dist/data/pcr-viewer-data.json`

No React, Vite, database, or long-running API server is required for the first cut.

## Source Of Truth

The viewer is read-only. PCR truth remains in:

- `library/pcrs/**/manifest.yaml`
- `library/pcrs/**/pcr.en-US.md`
- `library/pcrs/**/pcr.zh-CN.md`
- `library/pcrs/**/structured.yaml`

The viewer data build script must reuse existing `pcr-core` APIs where practical:

- `listPcrs`
- `readPcrMarkdown`
- `buildGuidance`

The generated data file is a consumption artifact. It must not become a new source of PCR methodology truth.

## User Experience

The first screen should be the working viewer, not a landing page.

Layout:

- left pane: PCR list, search box, and simple filters
- right pane: selected PCR details and content

Selected PCR header:

- English and Chinese title when present
- PCR id
- lifecycle status
- version
- content maturity
- classification references

Content tabs:

- `Markdown`: rendered text for `en-US` or `zh-CN`
- `Guidance`: structured summary plus JSON details from `buildGuidance`
- `Sources`: data source records from guidance

Language handling:

- default to `en-US`
- allow switching to `zh-CN` when available
- show an empty-state message when a language file is unavailable

Filtering:

- text search over PCR id, path, titles, and classification refs
- status filter
- content maturity filter

## Commands

Add package-level scripts to root `package.json`:

- `viewer:build`: generate viewer data and copy static assets into `packages/pcr-viewer/dist/`
- `viewer:serve`: serve the built viewer locally from `packages/pcr-viewer/dist/`

The serve command can use a small Node static-file server so the browser can load JSON by HTTP. Opening the HTML file directly is not required.

## Testing

Use test-first implementation.

Minimum tests:

- the viewer data build script emits a JSON file with PCR records
- a generated record includes metadata, `en-US` Markdown, `zh-CN` Markdown when present, and guidance
- the generated data includes the recently authored farmed abalone PCR
- the static asset copy step emits `index.html`, `styles.css`, and `app.js`

Validation before handoff:

- targeted viewer test
- `npm run validate`
- `npm run viewer:build`
- `git diff --check`
- `docpact lint --worktree`

## Out Of Scope

This first cut will not include:

- editing PCR content
- writing feedback issues from the UI
- authentication
- remote deployment
- live filesystem watching
- full Markdown extension support beyond a pragmatic browser rendering
- framework migration

## Open Implementation Notes

Keep the viewer implementation plain and maintainable. If Markdown rendering needs more than simple formatting, prefer a small internal renderer for headings, paragraphs, lists, tables, fenced blocks, and links instead of adding a dependency in the first cut.

Generated viewer data may be large because this repository contains many PCR records. If build time or file size becomes a problem, add pagination or an index/detail split in a later change rather than overcomplicating the first version.
