// Please order by Total
// Develop a program which produces ordered array of sales.
// Input: array of objects with the following structure
// {amount: 10000, quantity: 10}. Output: new array of ordered sales.
// Array element structure should be: {amount: 10000, quantity: 10, Total: 100000},
// where Total = amount * quantity. Please order by Total and note
// that input array shall remain intact.

const inputArray = [
  { amount: 10000, quantity: 10 },
  { amount: 5000, quantity: 5 },
  { amount: 20000, quantity: 2 },
];

const parseAndSortSales = (salesArr) => {
  const parsedSales = salesArr.map((sale) => ({
    ...sale,
    total: sale.amount * sale.quantity,
  }));
  return parsedSales.sort((a, b) => b.total - a.total);
};

console.log(parseAndSortSales(inputArray));
