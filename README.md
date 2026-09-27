# Ibiza Imports — Site da loja

Site de camisas de futebol (tailandesas 1.1 premium). Feito em HTML, CSS e JavaScript puros,
sem dependências nem instalação: basta abrir o `index.html` no navegador ou publicar a pasta
inteira em qualquer hospedagem de site estático (Netlify, Vercel, GitHub Pages, Hostinger…).

## Estrutura

```
index.html                 Página única que carrega tudo
assets/
  img/                     Logo (logo.jpg), marca do header (wordmark.png) e favicon (emblem.png)
  products/                Fotos das camisas (uma pasta por produto)
  teams/                   Escudos dos times e seleções (PNG)
css/
  base.css                 Cores, fontes, espaçamentos e animações globais
  components.css           Estilos dos componentes (header, cards, carrinho, footer…)
  pages.css                Estilos específicos de cada página
js/
  config.js                Loja: preço padrão, tamanhos, personalização, WhatsApp, Instagram
  data/categories.js       Categorias (brasileiros, europeus, seleções)
  data/teams.js            Times/seleções, ordem da faixa de escudos e escudos
  data/products.js         CATÁLOGO — onde as camisas são cadastradas
  services/catalog.js      Nome automático, filtros, camisas principais, busca
  services/cart.js         Carrinho (salvo no navegador)
  components/              Componentes reutilizáveis
  pages/                   Páginas: início, catálogo, produto, carrinho, 404
  router.js                Navegação entre páginas (#/rota)
  app.js                   Inicialização, finalização pelo WhatsApp, botão flutuante
```

## Páginas

| Endereço                                        | Página                                      |
| ----------------------------------------------- | ------------------------------------------- |
| `#/`                                            | Início                                      |
| `#/catalogo`                                    | Catálogo completo                           |
| `#/catalogo?categoria=brasileiros`              | Categoria: escudos + 6 camisas principais   |
| `#/catalogo?categoria=brasileiros&todas=1`      | Todas as camisas da categoria               |
| `#/catalogo?categoria=brasileiros&time=flamengo`| Todas as camisas de um time                 |
| `#/catalogo?busca=termo`                        | Resultado da busca                          |
| `#/produto/<id-do-produto>`                     | Página individual da camisa                 |
| `#/carrinho`                                    | Carrinho                                    |

## Como adicionar uma camisa

1. Crie uma pasta em `assets/products/` com o id do produto, ex.: `assets/products/flamengo-i-2026-2027/`.
2. Coloque as fotos nela (`1.jpg`, `2.jpg`…). A primeira é a principal; a segunda aparece ao passar o mouse no card.
3. Em `js/data/products.js`, adicione o produto seguindo o modelo do arquivo. O nome é montado sozinho:
   `Camisa Flamengo I 2026/2027 - Adidas Masculina Torcedor - Vermelha`.
4. Se for um time novo, adicione-o em `js/data/teams.js` (com o escudo em `assets/teams/`).

Campos úteis: `price` (preço diferente do padrão), `version: 'Jogador'`, `player` (ex.: `'Neymar Jr 11'`),
`badge` (selo no card), `notice` (aviso destacado), `featured: true` (Camisas em destaque).

## Configurações (js/config.js)

- Preço padrão: R$ 169,99 · Tamanhos: P, M, G, GG · Personalização: + R$ 25,00
- `contact.whatsapp`: número do suporte (rodapé, botão flutuante, "Não encontrou sua camisa?")
- `contact.checkoutWhatsapp`: número que recebe os pedidos ("Finalizar compra")
- `social.instagram`: link do Instagram

## Pedidos

"Finalizar compra" abre o WhatsApp com o pedido completo (camisas, tamanhos, personalização,
quantidades e subtotal). Pagamento online, frete e cupons ainda não foram implementados.
