// Develop a program “Object Projection”.
// Input: any JSON object; prototype object.
// Output: projected object.
// Projected object structure shall be intersection
// of source object and prototype object structures.
// Values of properties in projected object shall be the same
// as values of respective properties in source object.

const isObject = (value) => typeof value === "object" && value !== null;

const objectProjector = (src, proto, copySrcIfProtoEmpty) => {
  if (copySrcIfProtoEmpty && !Object.keys(proto).length) {
    return src;
  }

  const projectedObj = {};

  for (const key in src) {
    if (!(key in proto)) {
      continue;
    }

    const [isProtoObject, isSrcObject] = [isObject(proto[key]), isObject(src[key])];

    if ((!isProtoObject && isSrcObject) || (!isProtoObject && !isSrcObject)) {
      projectedObj[key] = src[key];
    }

    if (isProtoObject && isSrcObject) {
      projectedObj[key] = objectProjector(src[key], proto[key], true);
    }
  }

  return projectedObj;
};

const src = {
  prop11: {
    prop111: "value", //prop11.prop111
    prop112: {
      prop112: null, //prop11.prop112.prop112
    },
  },
  prop22: null, //prop22
  prop33: {
    prop331: 1, //prop33.prop331
    prop332: 2, //prop33.prop332
  },
};

const proto = {
  prop11: {
    prop22: null, //prop11.prop22
    prop111: {
      prop111: null, //prop11.prop111.prop111
    },
    prop112: null, //prop11.prop112
  },
  prop22: 2, //prop22
  prop33: {}, //prop33
};

console.log(objectProjector(src, proto));
// Output:
//{
//   prop11: { prop112: { prop112: null } },
//   prop22: null,
//   prop33: {
//     prop331: 1,
//     prop332: 2,
//   }
// }
