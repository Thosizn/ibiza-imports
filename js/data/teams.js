/**
 * Times da loja, na ordem em que aparecem na faixa de escudos e no catálogo.
 *
 *   id        Usado na URL (#/catalogo?categoria=...&time=<id>).
 *   name      Deve ser igual ao campo `team` dos produtos.
 *   category  'brasileiros' | 'europeus' | 'selecoes'
 *   crest     Caminho da imagem do escudo (PNG com fundo transparente).
 *             Enquanto for null, o site mostra as iniciais do time.
 *   short     (opcional) Iniciais exibidas quando não há escudo.
 *
 * Times sem camisas cadastradas não aparecem no site.
 */
Ibiza.teams = [
  // Brasileiros
  { id: 'flamengo', name: 'Flamengo', category: 'brasileiros', crest: 'assets/teams/flamengo.png', short: 'FLA' },
  { id: 'corinthians', name: 'Corinthians', category: 'brasileiros', crest: 'assets/teams/corinthians.png', short: 'COR' },
  { id: 'palmeiras', name: 'Palmeiras', category: 'brasileiros', crest: 'assets/teams/palmeiras.png', short: 'PAL' },
  { id: 'sao-paulo', name: 'São Paulo', category: 'brasileiros', crest: 'assets/teams/sao-paulo.png', short: 'SPFC' },
  { id: 'santos', name: 'Santos', category: 'brasileiros', crest: 'assets/teams/santos.png', short: 'SFC' },
  { id: 'cruzeiro', name: 'Cruzeiro', category: 'brasileiros', crest: 'assets/teams/cruzeiro.png', short: 'CRU' },
  { id: 'vasco', name: 'Vasco', category: 'brasileiros', crest: 'assets/teams/vasco.png', short: 'VAS' },
  { id: 'botafogo', name: 'Botafogo', category: 'brasileiros', crest: 'assets/teams/botafogo.png', short: 'BOT' },
  { id: 'fluminense', name: 'Fluminense', category: 'brasileiros', crest: 'assets/teams/fluminense.png', short: 'FLU' },
  { id: 'atletico-mineiro', name: 'Atlético Mineiro', category: 'brasileiros', crest: 'assets/teams/atletico-mineiro.png', short: 'CAM' },
  { id: 'gremio', name: 'Grêmio', category: 'brasileiros', crest: 'assets/teams/gremio.png', short: 'GRE' },
  { id: 'internacional', name: 'Internacional', category: 'brasileiros', crest: 'assets/teams/internacional.png', short: 'INT' },

  // Europeus
  { id: 'real-madrid', name: 'Real Madrid', category: 'europeus', crest: 'assets/teams/real-madrid.png', short: 'RMA' },
  { id: 'barcelona', name: 'Barcelona', category: 'europeus', crest: 'assets/teams/barcelona.png', short: 'FCB' },
  { id: 'manchester-city', name: 'Manchester City', category: 'europeus', crest: 'assets/teams/manchester-city.png', short: 'MCI' },
  { id: 'bayern-de-munique', name: 'Bayern de Munique', category: 'europeus', crest: 'assets/teams/bayern-de-munique.png', short: 'BAY' },
  { id: 'liverpool', name: 'Liverpool', category: 'europeus', crest: 'assets/teams/liverpool.png', short: 'LFC' },
  { id: 'psg', name: 'PSG', category: 'europeus', crest: 'assets/teams/psg.png', short: 'PSG' },
  { id: 'manchester-united', name: 'Manchester United', category: 'europeus', crest: 'assets/teams/manchester-united.png', short: 'MUN' },
  { id: 'inter-de-milao', name: 'Inter de Milão', category: 'europeus', crest: 'assets/teams/inter-de-milao.png', short: 'INT' },
  { id: 'arsenal', name: 'Arsenal', category: 'europeus', crest: 'assets/teams/arsenal.png', short: 'ARS' },
  { id: 'chelsea', name: 'Chelsea', category: 'europeus', crest: 'assets/teams/chelsea.png', short: 'CHE' },
  { id: 'borussia-dortmund', name: 'Borussia Dortmund', category: 'europeus', crest: 'assets/teams/borussia-dortmund.png', short: 'BVB' },
  // Seleções (o nome inclui "Seleção", igual ao campo `team` dos produtos)
  // label: nome curto na faixa de escudos · plate: escudo sobre disco branco (escudos claros)
  { id: 'brasil', name: 'Seleção Brasil', label: 'Brasil', category: 'selecoes', crest: 'assets/teams/brasil.png', short: 'BRA' },
  { id: 'argentina', name: 'Seleção Argentina', label: 'Argentina', category: 'selecoes', crest: 'assets/teams/argentina.png', plate: true, short: 'ARG' },
  { id: 'espanha', name: 'Seleção Espanha', label: 'Espanha', category: 'selecoes', crest: 'assets/teams/espanha.png', short: 'ESP' },
  { id: 'franca', name: 'Seleção França', label: 'França', category: 'selecoes', crest: 'assets/teams/franca.png', plate: true, short: 'FRA' },
  { id: 'portugal', name: 'Seleção Portugal', label: 'Portugal', category: 'selecoes', crest: 'assets/teams/portugal.png', short: 'POR' },
  { id: 'inglaterra', name: 'Seleção Inglaterra', label: 'Inglaterra', category: 'selecoes', crest: 'assets/teams/inglaterra.png', short: 'ING' },
  { id: 'alemanha', name: 'Seleção Alemanha', label: 'Alemanha', category: 'selecoes', crest: 'assets/teams/alemanha.png', plate: true, short: 'ALE' },

  { id: 'tottenham', name: 'Tottenham', category: 'europeus', crest: 'assets/teams/tottenham.png', short: 'TOT' },
];
