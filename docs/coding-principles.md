---
title: PCR Repository Coding Principles
docType: guide
scope: repo
status: draft
authoritative: true
owner: tiangong-lca-pcr
language: en
whenToUse:
  - when implementing, reviewing, testing, or refactoring code
  - when deciding whether code quality, structure, or test coverage is acceptable
whenToUpdate:
  - when general coding quality principles change
  - when a principle is no longer broadly applicable across implementation areas
checkPaths:
  - docs/coding-principles.md
lastReviewedAt: 2026-06-24
lastReviewedCommit: 08707c730a7e4a04331ae5f93a1101eae286ece4
---

# Coding Principles

This document defines general coding quality principles. It should stay stable across implementation changes and should not encode repository layout or current command structure.

Repository-specific applications of these principles live in `docs/repository-coding-guidelines.md`.

## 1. Prefer Clarity Over Cleverness

Code should be easy to read, review, debug, and change.

Prefer direct control flow, explicit names, and small local decisions over clever abstractions or dense expressions. A future maintainer should be able to understand the main path and the failure path without reconstructing hidden context.

## 2. Keep Cohesion High and Coupling Low

A module should have one clear reason to change.

Avoid files that mix unrelated responsibilities such as command dispatch, file I/O, parsing, validation, rendering, templates, normalization, and mutation. Split by behavior and stable responsibility: parser, renderer, validator, command adapter, repository I/O, and domain operation are usually different units.

## 3. Validate at Boundaries

External input should be checked where it enters the system.

CLI arguments, file paths, output formats, pagination values, version values, selectors, parsed files, and environment-derived values are boundary input. Invalid boundary input should fail with an actionable error instead of being silently coerced into a default. Defaults are acceptable when input is absent and the default is documented.

## 4. Separate Core Logic From Side Effects

Core operations should compute results from explicit inputs.

Keep filesystem writes, stdout, stderr, process exit, network access, timestamps, and environment access at the edge of the program. Core logic should return values or throw errors; command boundaries should decide how to print, persist, or exit.

## 5. Use Structured Data for Structured Domains

When code reads, writes, or transforms structured information, model it as structured data.

Avoid regex or ad hoc string replacement for YAML, JSON, manifests, structured projections, and public command contracts unless the format is intentionally treated as plain text. If comments or formatting must be preserved, make that preservation requirement explicit.

## 6. Keep Public Contracts Single-Sourced

Public behavior should not be redefined in multiple places.

Command names, required options, accepted values, output formats, exit behavior, help text, schema fields, and machine-readable JSON shapes should have one authoritative contract where practical. Tests and documentation should verify that contract instead of becoming independent competing definitions.

## 7. Make Behavior Deterministic

Given the same inputs, code should produce the same outputs.

Generated files, JSON fields, table rows, lint findings, pagination, and error lists should use stable ordering. Timestamps, hashes, filesystem traversal order, locale-sensitive sorting, and other unstable values should be deliberate and visible in the command behavior.

## 8. Test Observable Behavior

Tests should protect behavior users and dependent code can observe.

Prioritize tests for exit status, stdout, stderr, help text, JSON shape, generated files, mutation results, parser outputs, validator findings, and actionable errors. Avoid tests that lock in private helper structure unless that helper is itself a public contract.
