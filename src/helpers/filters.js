export const filterByOption = (products, option) => {
  debugger;
  if (!option || products.length <= 0) return;
  return products.filter((product) =>
    product.categories.some(
      (cat) => cat.name.toLowerCase() === option.toLowerCase()
    )
  );
};
