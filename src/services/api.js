export async function getCategories() {
  const BASE = await fetch('https://api.mercadolibre.com/sites/MLB/categ7Bid%7Dories')
    .then((response) => response.json())
    .then((data) => data);
  return BASE;
}

export async function getQuery(query) {
  const getQueryapi = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`)
    .then((response) => response.json())
    .then((data) => data);
  return getQueryapi;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const ProductCategoryQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`)
    .then((response) => response.json())
    .then((data) => data);
  return ProductCategoryQuery;
}

export async function getProductById(id) {
  const ProductId = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${id}`)
    .then((response) => response.json())
    .then((data) => data);
  return ProductId;
}
