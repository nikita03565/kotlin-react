export function tryParseJSONroles(str) {
  try {
    return JSON.parse(str);
  } catch (e) {}
  return [];
}
