/**
 * Categorias da loja.
 * O "id" é usado nos produtos (campo `category`) e na URL do catálogo.
 * `image` é opcional: coloque o caminho de uma foto para usar como fundo do card.
 */
Ibiza.categories = [
  {
    id: 'brasileiros',
    name: 'Times brasileiros',
    shortName: 'Brasileiros',
    description: 'Os mantos dos clubes do Brasil.',
    image: null,
  },
  {
    id: 'europeus', // id mantido para não quebrar links antigos
    name: 'Times internacionais',
    shortName: 'Internacional',
    description: 'Os gigantes do futebol mundial.',
    image: null,
  },
  {
    id: 'selecoes',
    name: 'Seleções',
    shortName: 'Seleções',
    description: 'Vista as cores do seu país.',
    image: null,
  },
];
