export async function getCategories() {
  const BASE = await fetch('https://api.mercadolibre.com/sites/MLB/categories')
    .then((response) => response.json())
    .then((data) => data);
  return BASE;
  // https://api.mercadolibre.com/sites/MLB/search?q=$QUERY
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
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  const ProductId = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${id}`);
  return ProductId;
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras. https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID
}
