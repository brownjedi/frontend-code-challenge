/**
 * Gracefully borrowed it from https://github.com/appmotion/apollo-augmented-hooks/blob/master/src/helpers/fieldNames.js
 * @param fieldName string
 * @returns object
 */

// Apollo offers no streamlined way to extract the query variables for the cache object we are
// modifying, so this helper has to exist.
export const extractVariablesFromFieldName = (fieldName: string) => {
  const variableString = fieldName.match(/\((.+)\)/)?.[1] || fieldName.match(/:(.+)/)?.[1]

  return variableString ? JSON.parse(variableString) : null
}
