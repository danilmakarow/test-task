// Extend JS Date object with a method daysTo() which returns
// number of complete days between any pair of JS date
// objects: d1.daysTo(d2) should return quantity of complete days from d1 to d2.

(() => {
  const mlsInOneDay = 24 * 60 * 60 * 1000;
  const daysTo = function (otherDate) {
    const mlsDifference = otherDate - this;
    return Math.trunc(mlsDifference / mlsInOneDay);
  };
  Date.prototype.daysTo = daysTo;
})();

const d1 = new Date("2024-01-03");
const d2 = new Date("2024-01-01T12:13:50.953Z");

console.log(d1.daysTo(d2)); // 365
