const paramsToKeys = (
  obj: Record<string, any>,
  parentKey: string = '',
  result: string[] = [],
): string[] => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        paramsToKeys(obj[key], newKey, result);
      } else {
        result.push(`${newKey}.${obj[key]}`);
      }
    }
  }
  return result;
};

export default paramsToKeys;
