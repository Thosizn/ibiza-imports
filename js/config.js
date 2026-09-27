/**
 * Configurações gerais da loja.
 * Altere aqui nome, textos institucionais, contatos e redes sociais.
 * Deixe um link vazio ("") para esconder a rede social correspondente.
 */
window.Ibiza = window.Ibiza || {};

Ibiza.config = {
  storeName: 'Ibiza Imports',
  tagline: 'Camisas de time • Importadas',
  description:
    'Camisas de futebol importadas dos maiores clubes e seleções do mundo, com curadoria e qualidade para quem vive o esporte.',

  currency: 'BRL',
  locale: 'pt-BR',

  // Chave usada para salvar o carrinho no navegador
  cartStorageKey: 'ibiza-imports:cart',

  // Valores usados quando o produto não informa `price` ou `sizes`
  defaultPrice: 169.99,
  defaultSizes: ['P', 'M', 'G', 'GG'],
  defaultGender: 'Masculina',
  defaultVersion: 'Torcedor',

  // Personalização opcional com nome e número (valor extra por camisa)
  customizationPrice: 25,
  customization: { nameMaxLength: 12, numberMax: 99 },

  // Ordem em que os tamanhos aparecem
  sizeOrder: ['PP', 'P', 'M', 'G', 'GG', 'XG', 'XGG', '2XL', '3XL', '4XL'],

  contact: {
    email: '',     // ex.: 'contato@ibizaimports.com.br'
    // Atendimento (rodapé) — somente números: DDI + DDD + número
    whatsapp: '5579998486145',
    whatsappLabel: '(79) 99848-6145',
    // Número que recebe os pedidos ao clicar em "Finalizar compra"
    checkoutWhatsapp: '5579996880999', // (79) 99688-0999
    city: '',      // ex.: 'São Paulo — SP'
  },

  social: {
    instagram: 'https://www.instagram.com/ibiza_.imports/',
    tiktok: '',
    facebook: '',
    x: '',
  },
};
