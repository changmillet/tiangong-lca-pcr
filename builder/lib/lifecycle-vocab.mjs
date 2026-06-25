export const PCR_STATUS_VALUES = ["scaffold", "candidate", "active", "published", "deprecated"];

export const CONTENT_MATURITY_VALUES = [
  "empty_scaffold",
  "draft_methodology",
  "authored_methodology",
  "reviewed_methodology",
  "published_methodology",
  "deprecated_methodology",
];

export const TRANSLATION_STATUS_VALUES = [
  "not_available",
  "scaffold",
  "scaffold_pending_translation",
  "draft_translation",
  "aligned",
  "reviewed",
  "out_of_sync",
];

export function formatOneOf(values) {
  if (values.length === 0) {
    return "";
  }
  if (values.length === 1) {
    return values[0];
  }
  return `${values.slice(0, -1).join(", ")}, or ${values.at(-1)}`;
}
