---
lastReviewedAt: 2026-10-30
lastReviewedNote: "PCR #159: reviewed stable product 0.4.10 preparation at 56e91285. Authority, three package mirrors and docs lock root metadata advance together; dependency resolutions, canonical content, methodology/translation state, reader minimum and runtime pins remain unchanged. Current preparation notes distinguish verified public 0.4.9 from pending new tag qualification, coordinated npm/site publication and exact workspace integration."
lastReviewedCommit: 56e912858aa769ff13075fa852a344d0b730a3b9
title: Generated PCR Documentation Site Contract
docType: contract
scope: repo
status: draft
authoritative: true
owner: tiangong-lca-pcr
language: en
whenToUse:
  - when implementing the generated public PCR documentation site
  - when changing document export, language inclusion, source coverage or SEO
whenToUpdate:
  - when source-to-page, download, language or publication boundaries change
checkPaths:
  - packages/pcr-docs/**
  - packages/pcr-core/src/languages.ts
  - packages/pcr-core/src/index.ts
  - edgeone.json
related:
  - architecture.md
  - pcr-library-release-policy.md
---

# Generated PCR Documentation Site

This contract implements the accepted Plan v2 in PCR #12. The site is a read-only,
reproducible view of a pinned repository snapshot. Website production deployment
does not promote candidate PCR methodology or certify a translation.

## Ownership and data flow

`packages/pcr-core/` owns consistent current PCR/module reads and verified artifacts.
Historical bundles reuse the Builder release-chain verifier through
`builder/lib/pcr-document-history.ts`, returning complete parsed models and
byte-exact artifacts without exposing internal revision bodies.
`packages/pcr-docs/scripts/` owns source inventory, Markdown rendering, metadata,
search and download generation. Fumadocs owns the public document layout,
navigation controls, typography and interaction primitives. The site uses the
TianGong documentation design system and Next.js static export on EdgeOne.

Canonical Markdown is parsed as ordinary CommonMark with GFM support. Content is
pre-rendered as semantic HTML; it is never evaluated as user-authored JSX or ESM.
The Fumadocs content source contains small page metadata and artifact references,
not one client-side object holding the entire library.

The generator selects methodology records through the core catalog. It does not
glob arbitrary `pcr.*.md` files: fixtures, authoring journals and internal plans
are not publication sources. Classification coverage remains a separate read
model, and retired IDs remain terminal coverage locators.

## Required and optional languages

English `en-US` is canonical and Chinese `zh-CN` is required. Both source files
must be complete for a PCR selected for publication by the site. Optional BCP 47
languages require explicit declarations, safe canonical language codes, titles,
source files and translation states. An undeclared optional language never blocks the required
pair; a declared missing file is an error. An absent or stale optional translation is unavailable, never an English
fallback masquerading as translated content.

Manifest translation state is authoritative. Candidate translations awaiting
review retain a visible warning and an explicit indexing decision. File presence
does not prove alignment or review. Formal PCR publication keeps its required
Chinese review gate and validates every included optional translation.

Existing v1 bilingual release bytes and fixed hash fields remain verifiable.
V2 multilingual manifests and releases use `markdown_sha256`, keyed by exactly
the declared source languages, plus the structured hash; release records also
bind the manifest snapshot. Generic release-history entries continue to bind the
exact release metadata bytes. Old snapshots are never rewritten by migration.

## Losslessness and generated artifacts

The core document bundle contains the complete manifest, verified structured
projection, declared languages and original artifact buffers. Downloads preserve those buffers byte for byte. Exact-byte download hashes are distinct from the
existing normalized-text projection fingerprint.

New exports store every original source download as a physical file under
`/generated/raw/<sourcePath>`, including candidate manifests and required-language
Markdown. One source path owns one exact byte sequence and original filename;
reading pages, split chapters and source-relative links reuse that URL with a
native `download` attribute. Physical responses retain attachment/noindex headers.
The exporter compares every download against its pinned Git source and checks the
rendered anchors. No source file is removed or shortened to reduce storage.

Immutable product exports through 0.4.8 may contain bounded native
`data:application/octet-stream;base64,` downloads. Their original decoder and
receipt fields remain available for verification; they are not rewritten. Current
sealed-site qualification always checks all three representative filenames
(`manifest.yaml`, `pcr.en-US.md`, `pcr.zh-CN.md`) without JavaScript in Chromium,
Firefox and WebKit, with observed native filenames and exact downloaded bytes.
An empty inline set cannot silently remove those nine download checks.

Intentional JavaScript disablement can reject Chromium script preloads. The native
probe distinguishes only source-bound declared script assets under the strict
[engineering classification](typescript-engineering.md), with no document CSP
header/meta or explicit policy error. It retains the original failures and still
requires exact native downloads. This does not waive normal JavaScript-enabled
script, policy, navigation, search or asset failures.

### Exact Next navigation aliases

After Next export, a measured preparation stage validates every emitted
`__next._full.txt` against its regular same-directory `index.txt`. Only complete,
byte-identical pairs may share physical storage. Preparation validates all pairs
before removing any duplicate file from the new owned export; it publishes a
source-bound `generated/static-route-aliases.json` with each original URL, retained
target, byte count and SHA-256. Verification requires the complete current route
inventory and exact target bytes. Missing, malformed, foreign-source or unequal
pairs fail the build. Other Next navigation payloads remain physical and unchanged.

EdgeOne internal rewrites retain HTTP 200 access to `/__next._full.txt` and every
nested `/*/__next._full.txt`, serving `/index.txt` and `/:splat/index.txt`
respectively, following the provider's [URL path matching contract](https://pages.edgeone.ai/document/edgeone-json).
These are internal rewrites rather than browser redirects. The
sealed local server honors only verified declared aliases. Product 0.4.9 and
later require the alias profile; older immutable products remain readable without
it. Live acceptance binds the alias manifest and root/English/Chinese catalog
representatives, checks both original and target URLs with and without queries,
and requires exact decoded bytes, MIME, revalidation and nosniff behavior. Existing
HTML, raw-download, search and browser-navigation checks remain required. Static
configuration alone does not establish actual provider rewrite behavior.

An independently collected source inventory accounts for every rendered block,
rule identifier, table value, link and code block. Rendering may add navigation,
context and disclosure controls, but must preserve original content and order.
Every source block is mapped to a page/anchor or explicit source appendix.
Unsupported source constructs, missing required files and stale projections
cannot become empty successful output.

Generation parses each source document once. A private per-call preparation step
finishes the complete value-only source inventory before the renderer modifies
its syntax tree. No syntax-tree references or caches are exposed through the
public inventory API. The complete export verifier independently reads original
source and compares the rendered blocks, tables, links, rules and ordering.

Generated metadata lives in `.generated/site.json`; page HTML and complete
structured data are separate artifacts read only at build time. Physical downloads
and search shards live under `public/generated/`. These directories are derived
and excluded from manual authoring and Git. Generation stages a complete artifact
set and never overwrites canonical PCR sources.

PCR page metadata, including historical pages and continuations, does not repeat
the record's download list. The owning current or historical record retains the
complete list and renders the same native download anchors on each reading page.
Module and guide page metadata keeps its existing download fields. This removes
redundant worker input without changing source bytes, reading routes or downloads.

### Page summaries

`meta[name="description"]`, the Open Graph description and the search-record description are one
bounded projection of text that already exists in the rendered source, produced by
`packages/pcr-docs/scripts/summaries.ts`:

- the page's own title, followed by up to two paragraphs from that page's own source scope;
- for a chapter, only nodes inside that chapter's `sourceNodeIds`, so a record and each of its
  chapters publish different summaries instead of the document opening repeated on every page;
- only a document's first page may fall back to the document opening, so a chapter never borrows
  another chapter's text;
- for a domain or subdomain catalog page, its actual category title, its position in the tree and
  the real record count;
- bounded to 170 Unicode code points, cut on a source sentence or word boundary, and never inside a
  surrogate pair. `packages/pcr-docs/scripts/verify.ts` fails a page that exceeds the bound.

A page whose retained summary is the title alone publishes no reader-facing context. That residual is
counted in `.generated/report.json` under `summaries.title_only` and printed by the generation stage.
`summaries.context_dropped` breaks out the subset where an available paragraph was removed by the
bound — a title long enough to leave no usable room — while a chapter whose own scope carries only
headings and structured rule tables is counted in `title_only` without `context_dropped`. Both flags
and `summaries.clipped` are derived from the retained output, never from the intent to include
context: a summary is never credited with context the reader cannot see, and a title that had to be
cut is a clipped summary. Nothing is padded with generated prose: a title-only summary is honest, an
invented sentence is not.

The projection is presentation only. It changes no canonical Markdown, YAML or JSON byte, no
rendered block order, no download hash, no lifecycle or translation state, and no indexing policy;
descriptions are not evidence about methodology quality or coverage.

## Routes and indexing

The complete default Chinese home is `/`. Localized homes and document routes use
the registry's URL aliases, initially `/zh/`, `/en/` and `/{locale}/docs/**`.
`/zh` and `/zh/` carry that same Chinese home: they are generated, canonicalized
to `/` and kept out of the sitemap. The provider preserves these explicit language
URLs at HTTP 200; live release acceptance compares both Chinese aliases with
the sealed Chinese-home bytes and also verifies the neutral and English homes.
A provider redirect is not accepted as language-home evidence. `/en/` is a real
localized home, and the document routes keep their locale segment.
In a JavaScript-enabled browser, only `/` negotiates a reading language: a valid
manual `pcr-docs-language` localStorage value wins, then the browser's language
list is checked in preference order against emitted route/code identities and
regional aliases, with English as the final fallback. Static Chinese HTML and
its SEO identity remain unchanged. Explicit localized URLs override detection
and saved preferences. Only a language-selector click writes the preference;
automatic navigation and ordinary localized links never write it. Storage denial
does not stop reading or switching. A manual Chinese home switch uses `/zh/`,
including when persistence is unavailable. All language navigation preserves the
current query string and fragment; a document switch prefers a verified counterpart.
Manual language changes load that exported HTML document through native browser
navigation. This establishes the target's HTML language directly without an
intermediate client-router RSC transition. Ordinary same-language links and neutral
entry detection retain their existing behavior.
PCR document slugs retain semantic domain/subdomain/record identity under
`docs/pcr/`. Exceptionally long documents may have stable subpages with a complete
chapter inventory. All normative content remains in the HTML of those pages.

Each real document has its own canonical URL. Hreflang lists only verified,
existing counterparts at the same version. Current complete public candidates
may be indexed with their status visible. Scaffolds, unavailable translations,
internal revisions, search/filter permutations and raw downloads are not normal
indexing targets. Physical raw download responses carry attachment and noindex headers.
Distinct historical versions are not blindly canonicalized to different text.

## Reader navigation and presentation

The Agent onboarding entry `/getting-started.md` is authored in
`packages/pcr-docs/public/getting-started.md` and exported byte-for-byte. It is a
single English operational guide, available without JavaScript or authentication,
with installation, bundled Skill discovery, immutable task preparation, the three
consumption routes and explicit offline use. It links to the consumer contracts
and never supplies canonical methodology or changes the language requirements for
PCR records. The hosting contract serves it inline as UTF-8 Markdown with cache
revalidation. Export verification checks its bytes and required header policy;
actual availability follows the normal qualified website publication.

The authored English source and its complete Chinese counterpart
`packages/pcr-docs/public/getting-started.zh-CN.md` render as the normal
indexable pages `/en/docs/getting-started/` and `/zh/docs/getting-started/`.
Each page uses its own pinned Markdown source, block inventory, table of
contents, sitemap and language search index. The Chinese raw entry
`/getting-started.zh-CN.md` is also exported byte-for-byte with the same inline
Markdown headers. Only actual authored counterparts appear in hreflang and the
language selector; switching keeps the guide and preserves query/fragment.
Homepage entries follow the reading language. Documentation navigation keeps
one sidebar list for Getting started, the PCR library and classification
coverage; the shell retains the related-sites menu without repeating that list.
The prompt copy action reads the displayed first code block and gives localized
success or manual-copy feedback. Each page links to its corresponding raw guide.
The generator binds every translation to the pinned Git source, and export
verification checks source fidelity, discovery links and unique sidebar entries.
Sealed desktop/mobile browser qualification covers both languages, counterpart
switching, unique navigation, search and accepted/denied clipboard writes.
Clipboard transport is mocked for deterministic cross-browser checks; actual
host permission remains a browser concern. Website guide translations do not
change the English-only npm methodology package or the methodology catalog.


The library index keeps every record link in static HTML behind native subdomain
disclosures. Domain catalog pages group the same exact record set by subdomain,
offer links to each subdomain directory, and expose those headings in the on-page
contents. Subdomain pages show their complete scoped record list. The export
verifier checks each directory's record URL set and every contents anchor.
Record pages retain a small nearby-record sidebar and explicit chapter inventory
on split documents. That inventory has a visible current state and previous/next
chapter actions. Fumadocs' automatic page footer and breadcrumb are disabled:
its flat page-tree order can duplicate or misidentify chapter neighbours, while
the site's scoped directories and source-aware chapter links own those routes.

Generated bounded descriptions serve metadata, Open Graph and search. They
begin with the page title, so the UI does not repeat them below the visible H1;
record source text, catalog counts and the coverage explanation remain in the
article. Very long titles remain complete in the H1 with a smaller responsive
type scale. The four record status facts use two balanced columns in narrow
containers and four when space allows. Source tables keep readable cell widths
and scroll within their own box instead of widening the page. Coverage pages
show one localized summary and one download action; raw classification keys are
not passed off as reader-facing translations. Record breadcrumb structured data
uses the same translated category titles as the catalog.

## Validation and production

Automated build verification compares source inventory with exported HTML without
executing JavaScript, including original downloads, block order, tables, list
hierarchy, code and links. It checks document and home canonicals/hreflang, complete
404 HTML, source modification dates, sitemap and the static hosting configuration.
Browser acceptance separately checks keyboard access, themes, responsive layouts,
search and disclosures. Live production acceptance verifies actual HTTP status,
headers, HTTPS and redirects on EdgeOne; static configuration checks cannot prove
that the provider applied its rules.

Measure the real full corpus and largest records. Enforce provider limits on
individual files, total file count and build resources, and partition search and
source-map artifacts. Production uses the existing `pcr.tiangong.earth` project
and the `release/production` deployment pointer; `main` remains the sole code trunk.
Unified tag qualification builds and seals the complete web export. The provider runs
`product-web-materialize.ts` to verify and atomically import that exact artifact; it
does not rebuild it. Preview auto deployment remains disabled. Failed import or
builds leave the previous verified deployment intact. The product identity endpoint
and per-route hashes bind live acceptance to the two paired npm artifacts; see
[the unified release contract](offline-distribution.md#npm-release-automation).

Provider execution uses the preinstalled Node 24.18.0 selected by `edgeone.json`.
Development, CI and artifact construction retain `.nvmrc` / product Node 24.19.0;
provider imports do not construct artifacts. The separate provider-importer CI lane
qualifies this runtime boundary. Real provider logs must additionally establish
runtime selection and importer entry; local configuration assertions cannot prove
the service's `nodeVersion` versus `.nvmrc` precedence. A bounded manual preview
may verify that boundary without enabling preview auto deployment or moving the
production pointer. Its incomplete/missing release must still fail source guards.

### Measured output and build resources

The first real-corpus export showed that a full-library sidebar on every page
produced almost 5 GB. The library index alone serializes the complete expandable
domain, subdomain and record tree. Domain and subdomain catalog pages include
their own leaves; ordinary record pages include a small window of nearby sibling
leaves, a link to the complete subdomain catalog and the open PCR's chapters.
Other domains remain directory entry points, so the complete tree is not
repeated on every record page. The library index also keeps every record link
in static HTML inside native disclosures, available without JavaScript.
The narrow PCR page table of contents shows H2 sections, or H3 processes on
continuation pages with no H2. Machine identifiers are omitted from these H3
navigation labels; full source headings and stable anchors remain in the article.
The earlier compact export measured about 1.44 GB across 12,758 files with semantic chapters and
server-rendered structured rule views; the scoped navigation must pass the same
full-corpus export gate.
Next.js retains both initial HTML and static navigation payloads; these are part
of its supported export and are not deleted after building.

The export has no project-owned total-byte cap. The former 1.5 GB budget was a
local retention allowance and was removed by the owner's decision in PCR #61.
The output-size stage reports logical file bytes, file count, largest file and
artifact-category totals. It emits an `export-size` console event and writes
`.generated/export-size.json` before provider file checks so an oversized artifact
remains diagnosable. Successful `.generated/verification.json` also includes those
measurements. Size statistics measure disk artifacts before
HTTP transfer compression and do not grant methodology or deployment approval.

The export still requires fewer than 20,000 files and less than 25 MB per file.
The provider's [current free-edition limits](https://pages.edgeone.ai/document/limits-and-quotas)
state 5 GB combined storage across all projects under a site. Actual account
capacity and retained deployments must be checked before deployment; the builder
cannot infer remaining remote storage from the size of one export. Corpus growth
is assessed from measured composition and useful rendering behavior rather than
an arbitrary aggregate-size rejection. Supported Next navigation payloads and
complete source artifacts remain subject to the existing fidelity contract.

The complete export runs locally or in GitHub qualification and has no project-owned
elapsed-time acceptance budget. CI bounds its instrumented documentation job to
60 minutes; stage and total durations remain reported. A separate required product
job performs SEO and sealing under its own 60-minute limit. The documentation job
hands off the complete verified export through an explicit current-run artifact ID
and a checkpoint binding source/product identity, CI plan, run/attempt, successful
build metrics and every sorted file path, byte count and SHA-256. Full mode binds
the current qualification and successful unchanged complete-build coverage command.
The product job verifies the entire export before the existing canonical hosting
transformation. Hidden files are preserved; missing, extra, changed, symlinked,
nonregular, stale-attempt or foreign-source inputs fail closed. The handoff uses
bounded file reads and retains the original export. Its low-compression transport
does not alter any delivered byte. Only the product job's final sealed bundle may
feed platform/browser qualification or publication. The old 18-minute full-build
cap incorrectly applied the provider deadline to this offline work. EdgeOne runs
only the sealed-product importer, whose separate 15-minute download/materialization
deadline, cleanup and atomic handoff remain enforced. The export uses two workers
with at most one static page render in flight per worker. Its 4 GiB Node heap
ceiling per process and 6 GB process-tree memory guard remain unchanged; a heap
ceiling is not proof of total resident memory.

Each attempted stage emits `build-stage` diagnostics with its command, duration,
sampled peak process-tree RSS, measurement availability, child exit code and
passed/failed status. A zero-exit child that exceeds the RSS guard is a failed
stage. The final `build-result` diagnostic reports failure even when cleanup or
handoff fails after all stages. Failed runs write
`.generated/build-failure-metrics.json` after cleanup returns, separately from
the last successful `.generated/build-metrics.json`; neither failure receipt
claims a successful export or relaxes the atomic output handoff.

### Build workspace storage

The sealed-product importer reads the checkout's actual filesystem facts directly
before scratch selection. Its integration tests exercise the shared selector and
atomic handoff on both native and explicitly forced memory-backed origins. A
memory-backed origin automatically uses hardlinked provider assets even under
forced relocation; only an ordinary disk checkout needs the explicit opt-in flag.


The provider's temporary build filesystem is separate from its deployed-asset
allowance. The first EdgeOne production build at source `9fe6486d` generated every
page but failed with `ENOSPC` while Next copied `.next` pages into `out` under
`/dev/shm/repo`. Final artifact size alone does not bound intermediate storage.

When a provider checkout uses that constrained shared-memory filesystem, the build
adapter must use a unique disk-backed scratch workspace, preserve the exact Git
source identity and pinned dependencies, and run the same generation, Next export
and verification stages there. Check storage capacity before work and before
artifact handoff. Destination staging accounts for each file rounded up to the
actual destination filesystem block size, plus the existing 512 MiB reserve;
logical bytes alone do not prove that many small files fit. An unavailable or unsuitable scratch filesystem is a build
failure with diagnostics, not permission to trim source text or remove supported
Next navigation payloads. Publish output only after all existing fidelity, SEO,
size, memory and time checks pass, and preserve a previous output on failure.
Temporary cleanup is confined to directories created by the current build.

After the scratch copy passes byte-fidelity checks, a relative worktree/submodule
gitfile is rebound to its resolved Git directory. Scratch commands explicitly
select the copied working tree and a private index, so clean-source checks inspect
the copied files without refreshing the original index or changing repository
configuration. Both source and scratch HEAD are still resolved and rechecked by Git.

Relocation retains `out/` as the standalone export and writes small build metrics in the original
checkout. Its original `.generated/` is not the relocated generation metadata;
use the complete build command rather than standalone `verify` there. Relocation
probes `/tmp`, `/var/tmp`, and the OS default in order, deduplicates their real paths,
and skips constrained, insufficient or unwritable parents. EdgeOne's effective OS
default remained `/dev/shm/tmp` even after a project-level `TMPDIR=/tmp` setting,
so the selector does not rely on that reserved/default variable. Set the explicit
`PCR_BUILD_SCRATCH_DIR` override to choose one parent without silent fallback;
`PCR_BUILD_RELOCATE=1` exercises relocation on an ordinary local/CI checkout.
Candidate errors report storage facts, and selection reports marker presence
without logging environment values. Interrupted `out.stage-*` and `out.prev-*`
directories are excluded from the source copy, but are not automatically removed
by later runs; inspect ownership before cleaning them when destination space is low.

The EdgeOne packager copies ordinary configured output into `.edgeone/assets`
after the build command. On the observed 3.4 GB shared-memory filesystem, a second
1.45 GB allocation fails even when generation and verification succeeded on disk.
For that constrained origin, prepare the documented Build Output API assets as
ordinary hard-linked files from the verified output stage. Both trees share file
bytes on the same filesystem; this is not a symlinked export or content reduction.
The platform then consumes the prepared assets instead of making another copy.
`PCR_EDGEONE_PREBUILT_ASSETS=1` exercises the same handoff in relocated CI builds.

Stage provider assets before the final resource gate and retain the old output
until both handoffs succeed. An existing unowned provider assets target is refused;
failed preparation or final handoff removes only this run's stages and restores
previous output. Provider output is excluded from source copying and Git. The
actual provider still owns packaging, configured routing/headers and final publish;
live checks are required after its processing.

Search is loaded only on reader intent, in a dedicated Worker. Per-language raw
indexes must stay under 20 MB and the gzip transfer for each language under 4 MB. The
Worker and tokenization module are compiled TypeScript browser modules shipped with the pinned
FlexSearch browser bundle, preserving its license header. Static exports must
not ship an uncompiled TypeScript Worker. No search backend is needed at this size.

Search manifest version 2 uses `schemaVersion: 2`: each shard's `entries` object stores
the pinned FlexSearch export as native JSON arrays. Generation requires every
export value to parse as an array and stringify back to the exact original engine
string. The Worker stringifies those arrays before engine import and also accepts
version 1 manifests with their original string entries. Unsupported manifest
versions and entry types inconsistent with the declared version fail initialization;
failed loads remain retryable. This representation preserves export key order,
terms, postings, IDs and complete records. The 2 MB text buckets, tokenization,
30-candidate limit per shard, global ranking and browser size budgets are unchanged.

Search manifest version 3 retains native export arrays and complete result records,
but marks supported FlexSearch map keys in each shard's `sparseMaps` list. Each
marked term stores its original score-vector length and ordered non-null slot
positions with unchanged posting lists. The Worker restores every null slot and
stringifies the exact original engine export before import. The pinned nine-slot
bound prevents malformed sparse lengths from allocating unbounded arrays. Dense
or unsupported map shapes stay native; compression is used only when smaller.
Version 1 string entries and version 2 native arrays remain readable and reject
version 3 sparse metadata. Missing, duplicate, foreign or malformed sparse metadata
fails initialization and remains retryable. Export key order, terms, posting IDs,
slot positions, complete records, tokenization, text buckets, ranking and both
browser budgets remain unchanged. The shared codec is an emitted TypeScript
browser module with the same executable MIME/noindex checks as the Worker.

Search manifest version 4 adds bounded score-slot masks, reversible numeric posting
ID deltas and optional columnar maps. The generator selects supported encodings
only when smaller and verifies exact restoration of every original engine export.
The Worker retains version 1, 2 and 3 readers, validates version-specific metadata
and rejects malformed masks, columns or posting deltas before import; failed loads
remain retryable. Complete result records, export and posting order, tokenization,
ranking, text buckets and the 20 MB raw / 4 MB gzip per-language budgets remain
unchanged. Build diagnostics report actual raw/gzip bytes, shards and records.

Search manifest version 5 packs at most sixteen consecutive **logical v4 shards**
into one physical file. The manifest binds the source commit and language, a unique
URL and actual UTF-8 byte length / SHA-256 / gzip length for each physical file,
and the contiguous logical range with every original v4 wire length, SHA-256 and
record count. Each physical envelope uses `schemaVersion: 1` and
`encoding: "v4-columnar-term-dictionary-delta"`; its source commit, language and
first logical position must match the manifest. Its first-appearance dictionary
replaces only explicitly marked columnar term strings with signed dictionary-ID
deltas, reset to zero for each map. Unsupported/native map entries and all record
fields remain unchanged. Dictionaries use explicit arrays and maps, including for
Unicode and strings resembling object property names.

Generation and export verification restore each original v4 JSON string exactly.
The Worker verifies actual decoded response bytes with WebCrypto SHA-256, validates
bounded dictionary references and restored lengths before expansion, then verifies
each restored logical hash and record count before engine import. Physical files
and their manifest count once toward the unchanged 20 MB raw / 4 MB gzip language
budgets; declared logical wire sizes are verification evidence, not additional
assets. Physical and total restored wire bytes per pack are bounded by 20 MB, and
the existing 25 MB hosting file limit remains in force. Gzip accounting uses level
9. Build diagnostics distinguish logical shard count from physical file count.

Each logical shard still owns an independent engine and record map, even when IDs
repeat in different shards. Original logical order, the strict 2 MB source-text
bucket boundary, per-logical-shard thirty-hit cutoff, first-record URL deduplication
before global title ranking, final thirty-result limit and dialog's twenty-four
visible results remain unchanged. Initialization publishes no partial indexes;
failed fetches, physical identities, late logical members or imports discard the
private load and permit a fresh retry. Concurrent requests share one successful
initialization and fetch each physical file once. The Worker retains literal v1–4
readers; older Workers reject the new manifest version. The shared codec is emitted
with the pinned compiler alongside the existing Worker modules. Synthetic and
captured-input checks do not replace complete final-source and sealed-web browser
qualification.

### Inspector data transport

The field inspector groups complete generated records into versioned JSON packs,
using positional entries `[key, manifest, structured]`. Each record carries its
exact transport key; current records and historical releases have distinct keys.
Packs target at most 1,000,000 bytes and 32 records. A single larger record stays
whole and must satisfy the unchanged 25 MB file limit. No PCR field, scalar type,
array position, object-key order or empty value is removed. Generation requires
each decoded record to serialize exactly as its original generated data; export
verification repeats that comparison against the shipped pack for every record.
The reader retains support for older unkeyed single-record payloads, rejects
unknown versions, duplicate or missing keys and malformed records, and preserves
the inspector's visible retry behavior. Browser qualification exercises the actual
inspector in both languages and for available historical releases.

This is lossless file packing to reduce the number of exported transport files.
Server-side record data, byte-exact raw downloads and complete static HTML remain
intact. Inspector packing itself requires no rewrite; the separate exact Next
navigation alias profile above preserves every supported navigation URL and byte.

Large documents split preferentially before semantic H2/H3 boundaries; bounded
continuations retain their chapter context. Chapter URLs use source heading
identities, with content-derived continuation suffixes. Tables remain whole, and
ragged GFM tables preserve source cells beyond the header width by adding empty
header cells. Source spelling, including a literal `undefined` cell, is retained.

On the initial corpus, five Chinese records remain pending translation review and
are readable with noindex. Two conflicting frontmatter states were aligned to the
existing authoritative manifest (cotton sewing thread and television cameras),
without changing body text or upgrading review status. Future state conflicts fail
generation. Optional bare `en` and `zh` use distinct URL aliases so they cannot
collide with the required `en-US`/`zh-CN` routes.

The generator accepts explicit `--source-root` / `--output-root` pairs for isolated
verification fixtures. A custom source requires a separate output root; source and
output paths are canonicalized, and output inside canonical data or Git directories
is rejected. End-to-end generator tests cover a three-language immutable release,
private open revisions, exact downloads, deterministic repeated output and failed
required-language generation preserving the previous verified artifact set.

Common structured rules and process/flow counts are rendered as semantic tables in
native disclosures in initial HTML. Their identifiers and text are verified against
the complete structured projection; the on-demand field tree remains available for
all remaining metadata. Canonical English rule text is labelled as such on Chinese
pages instead of being passed off as translated methodology.

Historical navigation uses each record's exact emitted chapter URLs, never a shared
PCR-ID-only page set. Current and historical sidebars use distinct cache identities,
and every historical record links the complete immutable version list. Home-page
language alternatives point to canonical homes; the default Chinese alternative
and x-default both use `/`, while `/zh/` remains an explicit Chinese reader URL.

Production resource checks fail when memory measurement is unavailable or empty.
POSIX builds inspect process-tree RSS; Windows uses its native CIM working-set
statistics. No unmeasured zero is accepted as evidence that a production build fits
within the memory budget. Browser chrome, including the visible brand lockup, is
localized consistently in English and Chinese;
optional reading-language pages currently use English controls unless additional
UI translations are registered. Their actual document bodies are never substituted.

Per-file modification dates require complete Git ancestry. A shallow hosting clone
fetches origin history without advancing its pinned HEAD before collecting dates;
if ancestry cannot be obtained, generation fails. Local full clones and the
full-history CI checkout require no additional fetch.

All declared original language files remain downloadable, including optional files
that are unavailable as current translated HTML. Their manifest state and original
bytes are preserved, and raw responses remain noindex attachments. The Fumadocs
content registry follows all emitted languages, including languages found only in
historical versions; it is separate from the English/Chinese UI translation set.
An optional translation removed in a new release leaves the current workspace in
the declared file state while its immutable older release stays downloadable.

For an authorized Search Console URL-prefix property, production may set the public
`PCR_GOOGLE_SITE_VERIFICATION` build variable. When configured, the Metadata API
emits the corresponding verification tag and the output gate checks it. An unset
variable emits no ownership marker. Changing this binding and verifying ownership
is a separate authorized operation from deploying the documentation code.

Baidu ownership uses the independently configured public
`PCR_BAIDU_SITE_VERIFICATION` build variable. It emits a
`baidu-site-verification` meta tag; the output gate requires an exact match on
every locale home. Surrounding whitespace is trimmed; an unset or whitespace-only
value requires no marker. Relocated
builds preserve both providers' variables and log presence only. These public
ownership markers are not submission API credentials. Keep the configured marker
after verification; registration and actual crawl/index processing are separate
provider operations.

The product CI job validates the authenticated existing export with the generated
shared checker snapshot in `scripts/vendor/workspace-seo/` after the documentation
job's full fidelity build, without rebuilding the library. The producer checks
that snapshot against its `manifest.json`; the consumer binds the same exact source
before running it, so the pipeline fetches no private-repository
action and needs no token. PCR supplies hreflang in HTML; the sitemap need not
duplicate that supported representation. The shared check validates those actual
language links, canonical URLs, index policy, structured metadata and local
targets. Its JSON report is retained independently of CI success. This is
additional regression protection, not a replacement for the complete
canonical-content verifier or post-deployment header/redirect checks.

A language retained only by historical releases keeps its immutable document URLs,
search entries and version navigation. Its empty current catalog and locale home
are noindex, and the home is omitted from sitemap and home hreflang. Home examples
are selected only from current records available in the requested language.

## Generated shared SEO checker

The workspace source repository is private. Public CI runs the generated
`scripts/vendor/workspace-seo/check.py` snapshot locally, verifies its SHA-256
against `manifest.json`, and retains the JSON report. It does not fetch a private
GitHub Action or require a PAT. The snapshot is maintained only in workspace
source; do not edit its generated bytes in this repository. Its files use LF
checkout rules so the receipt is portable. Python 3.10 or later is sufficient.

From an authorized workspace checkout, update or verify this consumer with
`python3 scripts/seo/export.py --commit <reviewed-full-sha> --target <child-root>`
(add `--check` for read-only exact-source verification). The public CI hash
check proves local integrity, not the private source identity; workspace
integration additionally compares the selected Git blob.

The offline consumption package described in [offline distribution](offline-distribution.md)
contains English bodies only. This does not change the site exporter: repository mode
continues to export and verify every declared language through complete core bundles.
The offline storage context is scoped to explicit consumer calls and is never enabled
by the documentation build.

Projection v2 adds source units and ancestor context to exact structured downloads and complete record JSON. Canonical language bodies remain the displayed methodological source; flat structured summaries do not independently establish applicability. Historical projection v1 remains readable and is not rewritten by export. The [semantic projection contract](semantic-projection-contract.md) governs these fields; publication and translation approval remain separate.

Chinese catalog presentation labels cover every domain and subdomain in the
material index. A corpus-backed contract rejects missing Chinese category labels;
this presentation dictionary never rewrites canonical titles, IDs or source files.

The child build environment preserves existing Node runtime/instrumentation
options and appends the required 4096 MiB heap setting last. The same rule applies
to ordinary and relocated builds. A real subprocess test proves both preload
execution and the effective heap bound; environment diagnostics still log presence
only. Coverage never substitutes for the actual build time/RSS/provider gates.
