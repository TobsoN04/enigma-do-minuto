/*
 * Enigma do Minuto — banco de enigmas crípticos em português.
 *
 * Cada pista críptica tem DUAS partes que apontam para a mesma resposta:
 *   1. uma DEFINIÇÃO (o significado direto, como num dicionário);
 *   2. um JOGO DE PALAVRAS (que soletra a resposta de outra maneira).
 *
 * Campos de cada enigma:
 *   id          número do enigma
 *   clue        a pista mostrada ao jogador
 *   answer      a resposta (a comparação ignora acentos e espaços)
 *   type        tipo de jogo de palavras (Dica 1)
 *   definition  trecho exato da pista que é a definição (Dica 2 e destaque)
 *   wordplay    explicação de como o jogo de palavras forma a resposta
 *   defNote     por que a definição corresponde à resposta
 *
 * São 33 enigmas — mais de um mês de jogo. A rotação diária é por data.
 */
window.PUZZLES = [
  // ---------- Anagramas ----------
  {
    id: 1,
    clue: "Amor transformado vira a capital",
    answer: "ROMA",
    type: "Anagrama",
    definition: "a capital",
    wordplay:
      "As letras de «AMOR» foram embaralhadas — o indicador de anagrama é «transformado» — formando R-O-M-A.",
    defNote: "Roma é a capital da Itália.",
  },
  {
    id: 2,
    clue: "Felino aparece na toga revirada",
    answer: "GATO",
    type: "Anagrama",
    definition: "Felino",
    wordplay:
      "«TOGA», com as letras reviradas (indicador de anagrama: «revirada»), dá G-A-T-O.",
    defNote: "Gato é um felino.",
  },
  {
    id: 3,
    clue: "Flor que nasce do raso bagunçado",
    answer: "ROSA",
    type: "Anagrama",
    definition: "Flor",
    wordplay:
      "«RASO» com as letras bagunçadas (indicador: «bagunçado») forma R-O-S-A.",
    defNote: "Rosa é uma flor.",
  },
  {
    id: 4,
    clue: "Fruta que vem do aroma transformado",
    answer: "AMORA",
    type: "Anagrama",
    definition: "Fruta",
    wordplay:
      "«AROMA» reorganizado (indicador: «transformado») resulta em A-M-O-R-A.",
    defNote: "Amora é uma fruta.",
  },
  {
    id: 5,
    clue: "Cômodo feito de alas embaralhadas",
    answer: "SALA",
    type: "Anagrama",
    definition: "Cômodo",
    wordplay:
      "«ALAS» com as letras embaralhadas (indicador: «embaralhadas») dá S-A-L-A.",
    defNote: "A sala é um cômodo da casa.",
  },
  {
    id: 6,
    clue: "Artista que surge do rato confuso",
    answer: "ATOR",
    type: "Anagrama",
    definition: "Artista",
    wordplay:
      "«RATO» confuso (indicador de anagrama: «confuso») vira A-T-O-R.",
    defNote: "O ator é um artista.",
  },
  {
    id: 7,
    clue: "Permuta que vem de 'corta' misturado",
    answer: "TROCA",
    type: "Anagrama",
    definition: "Permuta",
    wordplay:
      "«CORTA» com as letras misturadas (indicador: «misturado») forma T-R-O-C-A.",
    defNote: "Troca é uma permuta.",
  },
  {
    id: 8,
    clue: "Custoso como um arco torto",
    answer: "CARO",
    type: "Anagrama",
    definition: "Custoso",
    wordplay: "«ARCO» torto (indicador de anagrama: «torto») dá C-A-R-O.",
    defNote: "Algo caro é custoso.",
  },

  // ---------- Palavras escondidas ----------
  {
    id: 9,
    clue: "Em calma rara esconde-se a água salgada",
    answer: "MAR",
    type: "Palavra escondida",
    definition: "a água salgada",
    wordplay:
      "A resposta está escondida dentro de «calMARara»: cal-MAR-ara. Os indicadores são «Em» e «esconde-se».",
    defNote: "O mar é a água salgada.",
  },
  {
    id: 10,
    clue: "Numa branca saída fica o lar",
    answer: "CASA",
    type: "Palavra escondida",
    definition: "o lar",
    wordplay:
      "Escondida entre «branCA SAída»: bran-CA-SA-ída. Indicadores: «Numa» e «fica».",
    defNote: "A casa é o lar.",
  },
  {
    id: 11,
    clue: "Dentro de 'isso lá' brilha o astro-rei",
    answer: "SOL",
    type: "Palavra escondida",
    definition: "o astro-rei",
    wordplay:
      "Escondido em «isSO Lá»: is-SOL-á. Indicador: «Dentro de».",
    defNote: "O Sol é o astro-rei.",
  },
  {
    id: 12,
    clue: "No salário esconde-se um curso d'água",
    answer: "RIO",
    type: "Palavra escondida",
    definition: "um curso d'água",
    wordplay:
      "A resposta aparece dentro de «saláRIO»: salá-RIO. Indicadores: «No» e «esconde-se».",
    defNote: "O rio é um curso d'água.",
  },
  {
    id: 13,
    clue: "Em Madre Inês vive o monarca",
    answer: "REI",
    type: "Palavra escondida",
    definition: "o monarca",
    wordplay:
      "Escondido entre «madRE Inês»: mad-REI-nês. Indicadores: «Em» e «vive».",
    defNote: "O rei é o monarca.",
  },
  {
    id: 14,
    clue: "Num jeito aluado aparece o satélite",
    answer: "LUA",
    type: "Palavra escondida",
    definition: "o satélite",
    wordplay:
      "A resposta está dentro de «aLUAdo»: a-LUA-do. Indicadores: «Num» e «aparece».",
    defNote: "A Lua é o satélite natural da Terra.",
  },
  {
    id: 15,
    clue: "Na tropa zonza esconde-se o sossego",
    answer: "PAZ",
    type: "Palavra escondida",
    definition: "o sossego",
    wordplay:
      "Escondida entre «troPA Zonza»: tro-PAZ-onza. Indicadores: «Na» e «esconde-se».",
    defNote: "A paz é o sossego.",
  },

  // ---------- Reversões ----------
  {
    id: 16,
    clue: "Capital italiana invertida é puro sentimento",
    answer: "AMOR",
    type: "Reversão",
    definition: "puro sentimento",
    wordplay:
      "«Capital italiana» é ROMA; invertida (indicador: «invertida») fica A-M-O-R.",
    defNote: "Amor é um sentimento.",
  },
  {
    id: 17,
    clue: "Folhagem: 'amar' de trás pra frente",
    answer: "RAMA",
    type: "Reversão",
    definition: "Folhagem",
    wordplay:
      "«AMAR» lido de trás para frente (indicador: «de trás pra frente») dá R-A-M-A.",
    defNote: "A rama é a folhagem dos ramos.",
  },
  {
    id: 18,
    clue: "'Lavo', ao contrário, fica em forma de ovo",
    answer: "OVAL",
    type: "Reversão",
    definition: "em forma de ovo",
    wordplay:
      "«LAVO» ao contrário (indicador: «ao contrário») resulta em O-V-A-L.",
    defNote: "Oval é o que tem forma de ovo.",
  },
  {
    id: 19,
    clue: "Caminho: um ator de trás pra frente",
    answer: "ROTA",
    type: "Reversão",
    definition: "Caminho",
    wordplay:
      "«ATOR» lido de trás para frente (indicador: «de trás pra frente») vira R-O-T-A.",
    defNote: "Rota é um caminho.",
  },

  // ---------- Duplas definições ----------
  {
    id: 20,
    clue: "Fruta encontrada também na camisa",
    answer: "MANGA",
    type: "Dupla definição",
    definition: "Fruta",
    wordplay:
      "Duas definições para a mesma palavra: «Fruta» (a manga que se come) e «na camisa» (a manga da roupa).",
    defNote: "MANGA serve para as duas leituras.",
  },
  {
    id: 21,
    clue: "Guarda o dinheiro ou serve de assento na praça",
    answer: "BANCO",
    type: "Dupla definição",
    definition: "Guarda o dinheiro",
    wordplay:
      "Duas definições: «Guarda o dinheiro» (a instituição) e «assento na praça» (o banco de sentar).",
    defNote: "BANCO vale para as duas leituras.",
  },
  {
    id: 22,
    clue: "Ilumina a mesa e também impulsiona o veleiro",
    answer: "VELA",
    type: "Dupla definição",
    definition: "Ilumina a mesa",
    wordplay:
      "Duas definições: «Ilumina a mesa» (a vela de cera) e «impulsiona o veleiro» (a vela de pano).",
    defNote: "VELA vale para as duas leituras.",
  },
  {
    id: 23,
    clue: "O do pássaro, ou cada esquina da sala",
    answer: "CANTO",
    type: "Dupla definição",
    definition: "O do pássaro",
    wordplay:
      "Duas definições: «O do pássaro» (o canto, a melodia) e «cada esquina da sala» (o canto do cômodo).",
    defNote: "CANTO vale para as duas leituras.",
  },
  {
    id: 24,
    clue: "Cai da ave e também é dó",
    answer: "PENA",
    type: "Dupla definição",
    definition: "Cai da ave",
    wordplay:
      "Duas definições: «Cai da ave» (a pena, pluma) e «é dó» (pena no sentido de pena/compaixão).",
    defNote: "PENA vale para as duas leituras.",
  },
  {
    id: 25,
    clue: "Corta a madeira e também é cadeia de montanhas",
    answer: "SERRA",
    type: "Dupla definição",
    definition: "Corta a madeira",
    wordplay:
      "Duas definições: «Corta a madeira» (a ferramenta) e «cadeia de montanhas» (a serra geográfica).",
    defNote: "SERRA vale para as duas leituras.",
  },

  // ---------- Junções (charadas) ----------
  {
    id: 26,
    clue: "Doce que é bom e bom de novo",
    answer: "BOMBOM",
    type: "Junção (charada)",
    definition: "Doce",
    wordplay: "Junte BOM + BOM (bom repetido, «de novo») e forme BOMBOM.",
    defNote: "Bombom é um doce.",
  },
  {
    id: 27,
    clue: "Diversão em que se passa o tempo",
    answer: "PASSATEMPO",
    type: "Junção (charada)",
    definition: "Diversão",
    wordplay:
      "Some PASSA + TEMPO — as próprias palavras «passa o tempo» soletram a resposta.",
    defNote: "Um passatempo é uma diversão.",
  },
  {
    id: 28,
    clue: "Mar, no fim, dá o material da presa do elefante",
    answer: "MARFIM",
    type: "Junção (charada)",
    definition: "o material da presa do elefante",
    wordplay: "Junte MAR + FIM («Mar, no fim») e forme MARFIM.",
    defNote: "O marfim é o material da presa do elefante.",
  },
  {
    id: 29,
    clue: "Sol mais dado formam o militar",
    answer: "SOLDADO",
    type: "Junção (charada)",
    definition: "o militar",
    wordplay: "Some SOL + DADO («Sol mais dado») e forme SOLDADO.",
    defNote: "O soldado é o militar.",
  },
  {
    id: 30,
    clue: "Vaga com lume: o inseto que pisca no escuro",
    answer: "VAGALUME",
    type: "Junção (charada)",
    definition: "o inseto que pisca no escuro",
    wordplay:
      "Junte VAGA + LUME («Vaga com lume»; lume = fogo/luz) e forme VAGALUME.",
    defNote: "O vagalume é o inseto que pisca no escuro.",
  },

  // ---------- Homófonos ----------
  {
    id: 31,
    clue: "No ouvido vira 'sem', mas conta uma centena",
    answer: "CEM",
    type: "Homófono",
    definition: "conta uma centena",
    wordplay:
      "«CEM» soa igual a «sem» quando falado (indicador: «No ouvido»).",
    defNote: "Cem é uma centena (100).",
  },
  {
    id: 32,
    clue: "Soa como 'conserto', mas é a apresentação musical",
    answer: "CONCERTO",
    type: "Homófono",
    definition: "a apresentação musical",
    wordplay:
      "«CONCERTO» soa igual a «conserto» (reparo) quando falado (indicador: «Soa como»).",
    defNote: "Concerto é uma apresentação musical.",
  },
  {
    id: 33,
    clue: "No ouvido é 'acento', mas serve para sentar",
    answer: "ASSENTO",
    type: "Homófono",
    definition: "serve para sentar",
    wordplay:
      "«ASSENTO» soa igual a «acento» (sinal gráfico) quando falado (indicador: «No ouvido»).",
    defNote: "O assento serve para sentar.",
  },
];
