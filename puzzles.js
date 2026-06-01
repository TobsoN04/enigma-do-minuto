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
 *   answer      a resposta (sem acento facilita; a comparação ignora acentos)
 *   type        tipo de jogo de palavras (Dica 1)
 *   definition  trecho exato da pista que é a definição (Dica 2 e destaque)
 *   wordplay    explicação de como o jogo de palavras forma a resposta
 *   defNote     por que a definição corresponde à resposta
 */
window.PUZZLES = [
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
    clue: "Em calma rara esconde-se a água salgada",
    answer: "MAR",
    type: "Palavra escondida",
    definition: "a água salgada",
    wordplay:
      "A resposta está escondida dentro de «calMARara»: cal-MAR-ara. Os indicadores são «Em» e «esconde-se».",
    defNote: "O mar é a água salgada.",
  },
  {
    id: 4,
    clue: "Capital italiana invertida é puro sentimento",
    answer: "AMOR",
    type: "Reversão",
    definition: "puro sentimento",
    wordplay:
      "«Capital italiana» é ROMA; invertida (indicador: «invertida») fica A-M-O-R.",
    defNote: "Amor é um sentimento.",
  },
  {
    id: 5,
    clue: "Fruta encontrada também na camisa",
    answer: "MANGA",
    type: "Dupla definição",
    definition: "Fruta",
    wordplay:
      "Duas definições para a mesma palavra: «Fruta» (a manga que se come) e «na camisa» (a manga da roupa).",
    defNote: "MANGA serve para as duas leituras.",
  },
  {
    id: 6,
    clue: "Doce que é bom e bom de novo",
    answer: "BOMBOM",
    type: "Junção (charada)",
    definition: "Doce",
    wordplay: "Junte BOM + BOM (bom repetido, «de novo») e forme BOMBOM.",
    defNote: "Bombom é um doce.",
  },
  {
    id: 7,
    clue: "Diversão em que se passa o tempo",
    answer: "PASSATEMPO",
    type: "Junção (charada)",
    definition: "Diversão",
    wordplay:
      "Some PASSA + TEMPO — as próprias palavras «passa o tempo» soletram a resposta.",
    defNote: "Um passatempo é uma diversão.",
  },
  {
    id: 8,
    clue: "Numa branca saída fica o lar",
    answer: "CASA",
    type: "Palavra escondida",
    definition: "o lar",
    wordplay:
      "Escondida entre «branCA SAída»: bran-CA-SA-ída. Indicadores: «Numa» e «fica».",
    defNote: "A casa é o lar.",
  },
  {
    id: 9,
    clue: "No ouvido vira 'sem', mas conta uma centena",
    answer: "CEM",
    type: "Homófono",
    definition: "conta uma centena",
    wordplay:
      "«CEM» soa igual a «sem» quando falado (indicador: «No ouvido»).",
    defNote: "Cem é uma centena (100).",
  },
];
