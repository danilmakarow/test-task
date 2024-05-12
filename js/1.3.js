// Develop a program “Object Projection”.
// Input: any JSON object; prototype object.
// Output: projected object.
// Projected object structure shall be intersection
// of source object and prototype object structures.
// Values of properties in projected object shall be the same
// as values of respective properties in source object.

const objectProjector = (src, proto) => {
  const projectedObj = {};

  for (const key in proto) {
    if (!(key in src)) {
      continue;
    }

    if (typeof proto[key] === "object" && proto[key] !== null) {
      projectedObj[key] = objectProjector(src[key], proto[key]);
      continue;
    }

    projectedObj[key] = src[key];
  }

  return projectedObj;
};

const src = { prop11: { prop21: 21, prop22: { prop31: 31, prop32: 32 } } };
const proto = { prop11: { prop22: null } };

console.log(objectProjector(src, proto)); // { prop11: { prop22: { prop31: 31, prop32: 32 } } }
