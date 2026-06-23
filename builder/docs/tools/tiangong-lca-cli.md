# Tiangong LCA CLI Identity Tool

Use the Tiangong LCA CLI to look up database-backed identity references during PCR production.

The CLI is an identity evidence tool. PCR Markdown and `structured.yaml` store selected UUIDs. Command traces, query logs, dataset versions, API keys, and private runtime paths stay outside PCR content.

## Availability

Prefer an installed `tiangong-lca` binary when available:

```bash
tiangong-lca --help
```

In the workspace checkout, the sibling CLI repository may also be used:

```bash
cd ../tiangong-lca-cli
node ./bin/tiangong-lca.js --help
```

If no entry point is available, continue with semantic candidates using blank UUID cells and record the identity gap in `manifest.yaml` review metadata according to the manifest contract.

## PCR Lookup Use

Use CLI lookup for:

- product, waste, and elementary flow UUIDs
- flow property UUIDs
- unit or unit group UUIDs when the CLI exposes them
- process or dataset references when a PCR needs database-backed identity

Typical lookup shape:

```bash
tiangong-lca search flow --input ./search-flow.request.json --json
tiangong-lca flow get --id <flow-id> --json
tiangong-lca search process --input ./search-process.request.json --json
```

Use `search flow` to find candidates, then use `flow get` or the most specific available command to confirm the selected row before copying UUIDs into PCR content.

## Storage Rules

PCR content may store:

- selected UUID
- selected flow property UUID
- selected unit or unit group UUID
- modelling role of the reference

Authoring artifacts stored outside PCR content:

- Tiangong dataset version
- CLI command output blocks
- lookup trace tables
- local request file paths
- credentials, tokens, or private endpoints

Tiangong is the identity source for UUID-bearing references. `Data Sources` records external sources and non-default quantitative or method evidence.

## Fallback Behavior

When the CLI cannot resolve a UUID:

1. Keep the human-readable flow candidate if it is useful for PCR drafting.
2. Leave the UUID or unit support cell empty.
3. Record the unresolved identity issue in `manifest.yaml` review metadata.
4. Re-run lookup before publish.
