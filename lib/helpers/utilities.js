import has from 'has';

function hasProperties(obj, property) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }
  if (Array.isArray(property)) {
    return property.every((prop) => has(obj, prop));
  }
  return has(obj, property);
}

export default {
  hasProperties
};
