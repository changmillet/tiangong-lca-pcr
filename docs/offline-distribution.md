---
lastReviewedAt: 2026-10-30
lastReviewedCommit: 56e912858aa769ff13075fa852a344d0b730a3b9
lastReviewedNote: "PCR #159: reviewed stable product 0.4.10 preparation at 56e91285. Authority, three package mirrors and docs lock root metadata advance together; dependency resolutions, canonical content, methodology/translation state, reader minimum and runtime pins remain unchanged. Current preparation notes distinguish verified public 0.4.9 from pending new tag qualification, coordinated npm/site publication and exact workspace integration."
title: Offline PCR distribution contract
docType: contract
scope: repo
status: active
authoritative: true
owner: tiangong-lca-pcr
language: en
whenToUse:
  - when building or consuming offline PCR packages
whenToUpdate:
  - when package layout, snapshot format, compatibility or npm release automation changes
checkPaths:
  - .github/workflows/publish.yml
  - .github/workflows/tag-release-from-merge.yml
  - builder/scripts/npm-release*.ts
  - builder/scripts/product-*.ts
  - builder/scripts/reader-compatibility.ts
  - product-release.json
  - packages/tiangong-pcr-library/package.json
  - builder/scripts/build-offline-*.ts
  - packages/pcr-core/src/offline-library.ts
  - packages/pcr-core/src/source-context.ts
  - packages/tiangong-pcr-cli/**
  - skills/tiangong-pcr/**
  - docs/offline-distribution.md
related:
  - docs/plans/offline-distribution.md
  - docs/pcr-library-release-policy.md
---

# Offline PCR distribution

`@tiangong-lca/pcr` contains the CLI, shared semantic reader, schemas, bundled locked
runtime dependencies and the thin consumer Skill. `@tiangong-lca/pcr-library` contains
`library.sqlite`, its adjacent `library.sqlite.json` manifest and notices. Each
package includes its own consumer README and the repository MIT `LICENSE`. The tool
has no dependency on the data package. Its generated root
`reader-capabilities.json` declares the reviewed offline reader capabilities.
Completed unified product releases give
both packages the same product SemVer as the website. They remain separate
installation units.
The source package directories are development inputs; publish only generated packages.

Starting with 0.1.2, npm distribution uses the `@tiangong-lca` organization scope.
The command remains `tiangong-pcr`; installation paths are
`node_modules/@tiangong-lca/pcr` and `node_modules/@tiangong-lca/pcr-library`.
The snapshot kind `tiangong-pcr-library` and format version remain unchanged.
Existing unscoped packages and their tags remain historical releases. Install the
scoped pair for automatic discovery; an existing snapshot can still be selected
explicitly with `--library`. Renaming both package identities does not automatically
publish them: first publication and new package-specific trusted publishers are
set up explicitly before normal version-increase automation resumes.

Node 24.19+ is required for offline SQLite reads. The implementation uses the built-in
SQLite module (release-candidate API in this runtime), without native npm addons.
Supported targets are macOS ARM64, Linux x64/ARM64 and Windows x64. A Windows source
checkout used for building needs `core.longpaths=true` and `core.autocrlf=false`
before checkout, so long paths and exact-byte source fingerprints are preserved.
Installed content packages do not require Git. Prepare Node separately
on a connected machine if the destination has no runtime. No install hooks, runtime
network calls or implicit content downloads are used.

## Combined batch and provider repair

The six original PRs #134–#139 and preparation #147 merged on main at product
0.4.8, preserving 1,457 material PCRs, 1,306 accepted classification edges and
1,647 legacy aliases. The exact 0.4.8 source qualified fully and its npm pair was
accepted, but provider staging failed because the complete 4.31 GB web export
exceeded the destination filesystem's available capacity plus required reserve.
That release remains incomplete; its tag, sealed assets, packages and attempt
journals are immutable evidence and must not be replaced.

Product 0.4.9 prepares the necessary repair under #148. It stores original native
downloads physically and uses source-bound, byte-exact Next navigation aliases
under the [site contract](pcr-documentation-site-contract.md). The new product
requires fresh complete qualification, actual provider admission and coordinated
GitHub/npm/latest/live acceptance before stable completion. Exact workspace
inclusion remains separately required. All prior source contributions, individual
methodology, translations and immutable PCR release bytes remain unchanged.
Reader compatibility stays at minimum 0.4.1; Node 24.19.0/npm 12.2.0 remain pinned,
and the dependency-free provider importer retains Node 24.18.0. This patch makes
no dependency or runtime upgrade, raises no resource limit and permits no retry
of unchanged failed artifacts.

## Product 0.4.10 preparation

Product 0.4.10 prepares the reviewed dependency updates on Main: fast-uri 3.1.9,
paired site React/react-dom 19.3.1 and mdast-util-to-markdown 2.2.0, together with
Node-type monitoring and corrected documentation source locators. At preparation
on 2026-10-30, GitHub stable/latest, both npm latest channels and the verified
production website remain at 0.4.9. Version metadata alone does not establish
0.4.10 publication; the immutable tag still requires fresh full qualification,
coordinated npm/web acceptance and exact workspace integration under PCR #159.

The source authority and three package mirrors advance together. The site lockfile
changes only its two root version fields; dependency resolutions are preserved.
Canonical PCR/classification bytes, methodology and translation states, reader
compatibility minimum 0.4.1, Node 24.19.0/npm 12.2.0 construction pins and provider
Node 24.18.0 remain unchanged. Existing immutable release assets and receipts stay
intact. Publish only the tag's sealed bundle through the existing unified workflow.

## Build and transport

The release-preparation examples below target product 0.4.6. At preparation on
2026-10-09, the latest completed GitHub product release and the verified live
website identity were 0.4.4.
Verify completed guarded publication before using 0.4.6 registry instructions;
source version metadata and a preparing release do not prove public availability.

For production transport, take the two tarballs from one completed product
GitHub Release and verify its `SHA256SUMS`, or create and verify a complete bundle
with the [product build commands](#build-and-operator-commands). Those packages
include the common product identity.

The lower-level commands below are for local development and packaging tests.
They do not inject `product-release.json` or qualify a unified release, and their
output must not be published as the complete product. Run them from a validated
source checkout with locked dependencies already installed:

```sh
npm run offline:tool -- --output dist/tiangong-pcr --version 0.4.6
npm run offline:library -- --output dist/tiangong-pcr-library --version 0.4.6
npm pack ./dist/tiangong-pcr --pack-destination dist --ignore-scripts
npm pack ./dist/tiangong-pcr-library --pack-destination dist --ignore-scripts
```

Run `npm pack` using the canonical build path printed by the builder (avoid a symlink
alias for its directory: npm may omit bundled dependencies when packing through one).
Build outputs must not already exist. The builder stages a complete snapshot before
renaming the directory; it never modifies an installed library. Run the content build
from a clean, qualified release commit. The manifest records that commit and a
separate exact-byte fingerprint of all consumed sources. Generated timestamps and
absolute source paths are excluded. Identical inputs and the same Node/SQLite/zlib
versions produce identical bytes; different toolchains may produce a different file
checksum while preserving the logical source fingerprint.

Transfer both verified product tarballs and a suitable Node runtime to the offline machine. In a local
installation directory, run:

```sh
npm install --offline --ignore-scripts --no-audit --no-fund ./tiangong-lca-pcr-0.4.6.tgz ./tiangong-lca-pcr-library-0.4.6.tgz
./node_modules/.bin/tiangong-pcr library verify --library ./node_modules/@tiangong-lca/pcr-library/library.sqlite --format json
./node_modules/.bin/tiangong-pcr list --library ./node_modules/@tiangong-lca/pcr-library/library.sqlite --format json
```

On Windows use `node_modules/.bin/tiangong-pcr.cmd`. Alternatively unpack the tool
package and run its bin with Node; copy `library.sqlite` and `library.sqlite.json`
together to any local directory. npm is a transport option, not a runtime service.

The selection order is explicit `--library`, then `PCR_LIBRARY`, then an installed
`@tiangong-lca/pcr-library` package when running outside the source repository. Explicit
`--root` selects repository mode and suppresses defaults; it conflicts with
`--library`. Source checkout defaults retain repository behavior. Follow-up commands
include the selected absolute snapshot path and an explicit checksum pin if supplied.

## Snapshot and integrity contract

Format 1 is an immutable SQLite file with metadata, records, aliases, coverage and
files tables. Catalog rows preserve readiness from source verification. Bodies and
supporting source evidence are individually DEFLATE-compressed and hash-bound.
List/tree read catalog indexes without decompressing PCR bodies. Coverage is a
separate derived index. Reading one PCR decompresses only that record's declared
current artifacts; projection schema/fingerprint, release hashes, completeness and
readiness use the same core as repository mode. Accepted mapping resolution rechecks
the selected edge against its preserved canonical mapping. Alias semantics and
coverage source relationships are verified when building and bound into the snapshot.

Every open verifies metadata index digests against the adjacent manifest. Selected
artifacts are checked against their exact-byte digests. `library verify` additionally
streams the entire file SHA-256 and runs SQLite integrity_check. `--library-sha256`
requires a trusted `sha256:<64 lowercase hex digits>` pin and verifies the complete
file before any operation. This costs a full-file read; ordinary indexed reads do not.
Checksums establish integrity against trusted metadata, not publisher authenticity.
Obtain the manifest/pin through a trusted release channel. Protect installed files
from concurrent modification. The reader never writes to or migrates a snapshot.

Retain tool version, content version, format version, source fingerprint, file hash
and selected PCR id/version with each task. Updates install a new file alongside the
old one, verify it and explicitly change selection for new work. Unsupported formats,
invalid metadata, missing artifacts and checksum failures fail closed with PCR error
codes. A future domain split can reuse the same artifact contract; there is no shard
download protocol or implicit fallback in format 1.

Current canonical records with **English Markdown only**, structured YAML, compatibility identities and mapping
or alias evidence are included. Chinese and other language bodies are excluded. Original
manifest bytes preserve source language/translation declarations; these describe the
source record, not installed language availability. Snapshot metadata explicitly sets
`available_languages: ["en-US"]`. `show --lang zh-CN` fails with
`PCR_LIBRARY_LANGUAGE_UNAVAILABLE`. Build-time release validation checks the complete
source record; runtime rechecks hashes only for the included English/structured artifacts.
Open revisions, historical release bodies, raw source
PDFs, authoring traces and documentation-site outputs are excluded. Content versions
do not change per-PCR lifecycle: candidates still require review and partial
validation is still partial. Repository Markdown/YAML is the authoring authority.

## Reader compatibility metadata

New product builds include the following field in the sealed `release.json`:

```json
{
  "compatibility": {
    "schema": 1,
    "libraryFormat": 1,
    "projectionContracts": ["1", "2"],
    "minimumReaderVersion": "0.4.1",
    "commandProtocol": 1
  }
}
```

New tool packages include `reader-capabilities.json` at the package root:

```json
{
  "schema": 1,
  "kind": "pcr-reader-capabilities",
  "libraryFormats": [1],
  "projectionContracts": ["1", "2"],
  "commandProtocol": 1
}
```

The reviewed constants and strict validators live in
`builder/scripts/reader-compatibility.ts`. Both objects reject missing or unknown
keys, unsupported schemas, malformed values and duplicate array entries.
Qualification checks the declarations against the implemented SQLite format and
both supported projection contracts. Sealing and verification read the actual
capability file from the hash-bound tool tarball, check the capability declaration
against the qualified implementation, and bind `libraryFormat` to the sidecar in
the hash-bound library tarball and matching portable SQLite assets.

A compatible reader has a stable tool version at least `minimumReaderVersion`,
supports the selected library format and every required projection contract, and
uses the declared command protocol. Compatibility does not require equal tool
and content SemVers; a unified product release still gives its own three outputs
one product version. The common product `sourceFingerprint` and the English-only
SQLite `snapshot.source_sha256` hash different source domains and must never be
compared for equality.

Historical product manifests with no `compatibility` field remain verifiable as
legacy manifests without being rewritten. A present malformed field always
fails. Previously published 0.4.1 release assets remain immutable; absence is not
an unrestricted compatibility declaration. A consumer's audited legacy policy
must separately establish whether it can use an older release. New builders
always emit both declarations, and changes to the declarations require a new
reviewed product release rather than modifying an existing release.

## Skill and publication

Copy `skills/tiangong-pcr/` from the tool package into the host agent's configured
Skill directory. npm does not activate Skills. The thin Skill prepares a dedicated
PCR task through Tiangong CLI, then routes native reader commands through its
verified immutable task pin. Tiangong CLI owns compatible published-snapshot
discovery, downloads, cache and task locks; PCR does not acquire a network runtime
dependency. Existing tasks never refresh implicitly. Explicit standalone/repository
selection remains available. See `docs/agentic-consumption.md` for the preparation
boundary and `skills/tiangong-pcr/SKILL.md` for commands.
The qualified preparation runtime is Node 24.19.0; Tiangong CLI supports
`>=24.19.0 <25`. Its qualified minimum package is released `@tiangong-lca/cli` 0.1.25.
Confirm its publication before installation. It selects the installed PCR reader
independently; the compatibility minimum remains 0.4.1 rather than being raised
to the new content release's 0.4.6 version.
The Skill teaches readiness, general LCA authoring, optional TIDAS authoring and Agent-led
process/model review. The tool bundles inspection, cited guidance, arithmetic and
review-envelope support; no model runtime or TIDAS schema implementation is embedded.
Inspection and arithmetic do not require a PCR library. Review preparation/checking
uses the selected library and native local inputs. Optional TIDAS SDK/toolkit assets
must be provisioned separately before offline use; fully offline semantic review
also requires an offline-capable host Agent/model. The snapshot format is unchanged.

TianGong LCA code and authored methodology content use the MIT License. Both
source manifests and generated packages declare `license: MIT`; builders copy
`LICENSE` from the repository root into each package. The tool README is sourced
from `packages/tiangong-pcr-cli/README.md`, and the content README from
`packages/tiangong-pcr-library/README.md`. These are consumer instructions; this
contract remains the maintainer reference. Bundled dependencies retain their own
license files and notices. Source citations and third-party terms remain applicable;
MIT does not relicense referenced external standards or publications.
The workflows below publish generated artifacts only after release setup is enabled.
Implementing these workflows does not itself publish either package.


## npm release automation

The current product release is one version, one immutable `v<version>` tag and
one coordinated release of the tool, content package and existing production
website. `product-release.json` is authoritative; the tool, library and private
documentation package manifests are checked mirrors. The private repository-root
package version is unrelated. Unified production releases use stable SemVer only.

A release PR changes the product version and all three mirrors together. After
review and merge to `main`, `tag-release-from-merge.yml` creates an immutable tag
and dispatches `publish.yml`. Introducing the product version source does not
implicitly publish the first unified version; its first tag is an explicit main
workflow dispatch. Historical `pcr-v*` and `library-v*` tags keep their original
commits and package-only workflows. Do not create new package-specific tags from
the unified source or move any existing tag.

`publish.yml` keeps the existing npm trusted-publisher identity and `npm-release`
environment. It binds canonical owner/repository IDs, tag/event/workflow/checkout
SHAs and `main` ancestry. Its reusable qualification workflow runs complete Linux
validation, documentation/source/SEO checks and offline distribution on Linux,
Windows and macOS. The documentation job builds and verifies the website once.
A source/run/attempt-bound complete-file checkpoint transfers that exact export
by artifact ID to the required product job, which verifies it before SEO and
sealing the two npm packages and web archive from the same source. The intermediate
export cannot be published. All sealed consumers and the reusable workflow output
select the product job's one final bundle. The publish job downloads
the exact Actions artifact ID produced by that qualification and rechecks source
identity after environment admission. Product publication is globally serialized.

### Product identity and immutable artifacts

Each npm package in a sealed product bundle contains `product-release.json`. The website exposes
the same object at `/generated/product-release.json`, and `/generated/version.json`
also reports `releaseVersion`, `releaseTag`, `sourceCommit` and `sourceFingerprint`.
The common fingerprint hashes all regular Git-tracked raw files under `library/`
and `classifications/`, including Chinese and historical content. It is distinct
from the existing English-only SQLite payload fingerprint, which remains intact.
The source commit additionally binds tool code, configuration and workflows.

The immutable product `release.json` records this identity, exact Node/npm
versions, both npm tarball names/integrities/hashes, portable SQLite assets, and
the web archive/tree hashes, byte/file counts and live verification probes. The
web identity excludes its own output-tree hash to avoid recursive hashing.
`SHA256SUMS` covers the transport assets. The archive is streamed and deterministic
under the pinned toolchain; regular files and safe paths are required. Consumers
retain individual PCR versions, readiness and scientific-review boundaries.

The GitHub Release is initially visible as **preparing/prerelease**, allowing the
existing Git-connected provider to read its sealed assets. It is not a completed
product release. Existing same-name assets are verified rather than overwritten.
A separate build proof binds the original qualified Actions artifact, allowing
partial asset delivery to recover the original bytes. Attempt receipts record
intent, acceptance, verification and pending/uncertain outcomes; they do not
replace the immutable product manifest.

### Existing EdgeOne project

The existing international project is `tiangong-lca-pcr`
(`makers-5hadzwjpsblu`) at `https://pcr.tiangong.earth`. It remains Git-connected;
CLI/SDK direct uploads are not used for this project. Its production environment
must follow `release/production`, a deployment pointer that only advances to a
qualified product tag's exact `main` commit. No code is authored on that pointer;
`main` remains the sole development trunk and workspace integration input.

The EdgeOne build command runs the dependency-free
`builder/scripts/product-web-materialize.ts`. It reads the checkout's product
identity, downloads only that canonical GitHub Release's manifest and web archive,
checks hashes and identity, safely extracts to owned disk scratch and atomically
hands the verified export to the provider. Routing headers/redirects are retained.
It does not rebuild the frontend. Existing disk/file limits, failure rollback and
provider asset handoff remain enforced.

Production auto-deployment is enabled by the provider. Advancing the deployment
pointer supplies the normal trigger; do not also send a Webhook for that same
change. A same-source retry first checks the public site. A previous accepted but
unverified deployment is uncertain, not proof of failure. Only after checking that
the previous provider deployment is terminal may an operator explicitly dispatch
`publish.yml` with `retry_web=true`; this uses the project Webhook bound to
`release/production`. Keep the Webhook URL only in the protected
`PCR_EDGEONE_DEPLOY_HOOK_URL` environment secret. It is a bearer trigger credential,
not public release metadata. No undocumented deployment API or guessed deployment
ID is used.

### Activation and completion

Before the first unified release:

1. Review and merge the source change and complete workspace integration.
2. Permit `v*` tags in the existing `npm-release` GitHub environment while retaining
   historical tag policies. Verify both npm trusted publishers still name owner
   `tiangong-lca`, repository `pcr`, workflow `publish.yml`, environment `npm-release`.
3. Enable the trusted publisher's **Allow npm dist-tag** for both packages. npm
   12.2.0 is pinned with Node 24.19.0; it supports OIDC channel management, so no
   long-lived npm token is needed. The repository variable
   `PCR_NPM_DIST_TAG_OIDC_ENABLED=true` records operator setup, but real operations
   still have to succeed and be verified.
4. Associate the existing EdgeOne production environment with `release/production`
   and configure its scoped retry Webhook. Verify the existing custom domain,
   public ownership markers, provider capacity and previous stable deployment.
5. Confirm no historical `publish.yml` run is queued or in progress, disable
   independent legacy automation with `PCR_NPM_RELEASE_ENABLED=false`, then set
   `PCR_PRODUCT_RELEASE_ENABLED=true` and explicitly dispatch the first product
   tag. This avoids old tag workflows promoting a separate package release while
   the unified workflow is running. Do not infer activation from source merge or
   a local browser login.

The workflow stages npm publication under a candidate channel, verifies registry
identity and actual tarball bytes, and tests installation of the exact pair. It
then advances/validates the website and promotes the verified pair to `latest`.
Only after both npm channels and live source identity/probes agree does the
GitHub Release become complete/stable. npm upload acceptance alone is not proof
that a package is available to install. Stale retries cannot downgrade npm
channels or the deployment pointer.

These external operations are not one atomic transaction. Preserve per-target
receipts and continue missing verified steps. An earlier accepted npm upload that
still returns 404 is pending; do not blindly republish it. Conflicting bytes or
source identities fail closed. Retry uses the original sealed bundle, not a newly
rebuilt replacement. If original required bytes are no longer recoverable, retain
that failure and prepare a new reviewed version. Do not delete the prior stable
provider deployment as part of retry. Product release never approves a candidate
methodology or replaces a PCR's own immutable scientific release lineage.

An npm intent can also survive a crash before the upload was sent, or a rejected
upload. Ordinary retries still cannot infer non-acceptance from HTTP 404. After
confirming that the previous upload was rejected or never accepted and fixing
its cause, an operator may explicitly dispatch with `retry_npm=tool` or
`retry_npm=library`. This permits at most one retry for that package in the new
Actions run, using the original sealed tarball and all source/channel guards.
It first checks registry visibility; matching existing bytes are reused and
uncertain responses remain blocked. An accepted upload awaiting processing is
not eligible. Keep prior receipts; never delete them to force a publish.

### Memory-backed provider import and patch recovery

The importer obtains the origin filesystem facts directly and passes that snapshot
into the shared scratch selector. Memory-backed and explicitly forced relocation
must not rely on an optional field of a relocation-decision object. A real
memory-backed origin always receives the provider hardlink handoff, including
when relocation is explicitly forced; ordinary disk checkouts require the explicit
provider-assets flag for that handoff. Source identity, streamed archive integrity,
capacity, final deadline, atomic rollback and owned cleanup remain mandatory.

The initial `v0.3.0` attempt exposed a missing filesystem constraint on the provider's
memory-backed clone. Its two npm candidate packages and sealed assets remain
unchanged and the release remains incomplete. The reviewed repair uses product
`0.3.1`; that recovery remains immutable. The current TypeScript release examples
below target `0.4.6`. Never repair this by moving the old
tag, replacing sealed assets, or overriding source guards in the provider console.

### Provider runtime selection and v0.4.0 recovery

The v0.4.0 product passed its tag-bound quality gates and both npm candidate
packages were verified, but EdgeOne deployment `dppp7t19r5fd` failed during Node
selection before the importer ran: the service could not select Node 24.19.0.
The previous verified website and npm latest stayed at 0.3.1. The v0.4.0 tag,
accepted packages, sealed assets and receipts remain immutable.

The patch line separates provider import from product construction: `edgeone.json`
requests the provider-preinstalled Node 24.18.0, while `.nvmrc`, product metadata
and construction qualification retain Node 24.19.0 / npm 12.2.0. Actual importer
contracts run under the provider runtime as an additional CI lane. The provider
still imports only the original sealed bytes and validates their construction
metadata; no frontend rebuild or identity exception is introduced. Check a real
provider log for runtime selection before claiming the configuration is effective.
Official references: [build guide](https://pages.edgeone.ai/document/build-guide)
and [configuration](https://pages.edgeone.ai/document/edgeone-json).

### Browser cancellation qualification and v0.4.5 recovery

The immutable `v0.4.5` preparing release retains its original sealed assets and
receipts. [PCR #106's verified recovery](https://github.com/tiangong-lca/pcr/pull/109#issuecomment-6065383398)
installed both exact npm packages and deployed the sealed web candidate. Stable
publication remains incomplete: the historical verifier demanded a Chinese-home
redirect, although the accepted site contract preserves explicit language URLs.
At that recovery, both npm `latest` channels still pointed to `0.4.4`. Preserve the immutable tag and
receipts; do not replay that publisher or substitute rebuilt assets.

Product `0.4.6` repairs classification only when an engine-specific cancellation
has explicit non-navigation prefetch evidence. Real navigation, resource, HTTP
and unmarked failures remain blocking. Browser diagnostics project scalar context
explicitly so partial language evidence remains serializable.

New sealed web probes bind both catalogs and the neutral, Chinese and English
homes to exact export bytes. Live acceptance requires HTTP 200 and HTML at `/`,
`/zh`, `/zh/`, `/en` and `/en/`; the two slashless URLs use their corresponding
localized home probes. Redirects or changed home content fail closed. Existing
identity/cutover, counts, bounded-body, freshness and raw-download header/hash
checks remain mandatory. Historical two-catalog manifests remain readable for
exact artifact verification and materialization; they cannot qualify a fresh
live publication without sealed homepage proofs. Their original manifests are
never rewritten.

Fresh complete qualification and the same coordinated npm/web publication
contract apply to the new immutable tag. See
[the request evidence contract](typescript-engineering.md#site-and-release-runtime-cutover).
Canonical candidate PCR status and English-only npm methodology are unchanged.

### Build and operator commands

Use the pinned Node/npm versions from `product-release.json`. On a clean reviewed
checkout, prepare artifacts without any remote publication:

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm --prefix packages/pcr-docs ci
npm run docs:build
npm run product:build -- v0.4.6 dist/product-release packages/pcr-docs/out
npm run product:verify -- dist/product-release
```

Release CI supplies the production site's public Google/Baidu ownership markers
when building; local review builds must use those same public values for a
production-equivalent artifact. The tag passed above must match the sole product
version. Output directories must be new. Builder qualification, source hashes and
actual provider limits remain mandatory; there is no replacement aggregate-byte
budget.

After activation, create/resume the first product tag from the exact current main
version through the guarded workflow:

```sh
gh workflow run tag-release-from-merge.yml --repo tiangong-lca/pcr --ref main -f tag_name=v0.4.6
```

Retry an existing unified release without moving its tag:

```sh
gh workflow run publish.yml --repo tiangong-lca/pcr --ref v0.4.6 -f tag_name=v0.4.6
```

A `retry_web=true` dispatch is an explicit provider-terminal confirmation, not an
automatic reaction to a timeout. Both recovery inputs require a new explicit
workflow dispatch when a new operation is intended: GitHub's “Re-run jobs” keeps
the same run ID and cannot authorize another hook or npm upload. If an incomplete
preparing release loses its original Actions artifact before all sealed files
exist, preserve that public release and its evidence and prepare a new version;
do not recreate different bytes under its existing tag.

Historical package releases retain their original tag/workflow and recorded
artifact versions. A necessary historical repair uses an explicit maintenance
window: suspend unified publication, confirm no product publisher is running,
then enable the legacy switch only for that repair and restore the switches
after verification. Do not run the two publication modes concurrently. Legacy
package bootstrap is unrelated to first unified-product activation.

Upstream contracts: [npm trusted publishing and dist-tags](https://docs.npmjs.com/trusted-publishers/#managing-dist-tags-with-trusted-publishing),
[EdgeOne Git deployment hooks](https://pages.edgeone.ai/document/create-deploys),
[EdgeOne project environments](https://pages.edgeone.ai/document/project-management).

## Compiled runtime staging

The TypeScript offline-tool builder compiles core and CLI sources with the pinned
local compiler before atomic staging. The consumer runtime graph now consists of strict TypeScript; source TS
imports become runtime JS imports without an allowJs bridge. Site, Viewer and release
source also use TypeScript; final coverage and sealed-product qualification remain
tracked by #79 before the formal cutover in #69.
Schemas, Skill and license assets retain their relative locations; executable
bins follow the emitted extension. Only locked runtime dependencies are bundled,
including the YAML reader; development/compiler packages are excluded. Source maps embed original source content and use a fixed logical source root, so temporary/host paths do not leak
into tarball bytes. Actual installed-package probes use `--no-strip-types`.

The publisher/provider validation path continues to load without node_modules;
build-only imports remain lazy. The provider still imports the same sealed web
archive and does not compile TypeScript or rebuild the frontend. Historical
published artifacts are unchanged.

## Normative context compatibility

SQLite storage format stays unchanged. The reader accepts both historical projection v1 and generated v2. Guidance schema 2 adds complete normative units and ancestor context; legacy enrichment carries its own provenance instead of changing the stored projection digest. Actual npm library 0.3.1 is a compatibility input, never a migration output. See [the semantic projection contract](semantic-projection-contract.md).

## Owned consumer read sessions

`withPcrReadSession` selects an explicit repository or immutable SQLite source for one synchronous callback. Its complete `guidanceMany` and `projectionMany` methods preserve order and duplicates, with at most 100 requested IDs. A private bounded cache reuses verified projections only within that lifetime. Repository sessions retain exact artifact bindings even after cache eviction and recheck selected records before returning; library sessions own and close one readonly transaction. No callback Promise or cross-session validation receipt is accepted.

Library sessions verify the complete file by default; an explicit boolean `verify: false` retains mandatory metadata/selected-artifact checks, and an expected SHA-256 pin still requires full verification. Source identity records the actual verification choice. CLI `guidance batch` always uses the verified default and carries source identity, input hash, ordered items and statistics. Existing single-command indexed reads retain their established verification contract.


## Sealed candidate qualification

Every candidate validation build seals the two npm packages, SQLite assets and
complete website once, binding them to the exact tested source commit. PR artifacts
are development qualification inputs even when their version matches an existing
release; they never authorize publishing replacement registry/tag bytes. The formal
workflow uses the immutable product tag and the same verified artifact ID for
publication only after all reusable qualification jobs succeed.

`qualify:sealed` verifies the existing bundle before empty-cache offline installation
on Linux x64/ARM64, Windows x64 and macOS ARM64. It checks installed identities,
compiled bins with type stripping disabled, complete SQLite integrity, real catalog,
resolve/guidance/batch behavior and invalid-source rejection. `qualify:web` extracts
the same sealed archive, verifies its complete file tree and runs actual browser
acceptance. Both require an expected source commit and a new external report
directory; neither builds, repacks or publishes. Reports preserve failures and
owned-scratch cleanup. Registry bytes, npm latest and actual EdgeOne responses
still require post-publication verification.
