# Enigma do Minuto 🧩

Versão em **português** de um jogo no estilo do
[MinuteCryptic](https://www.minutecryptic.com/): **um enigma de palavra cruzada
críptica por dia**. Você decifra uma única pista usando o menor número de dicas
possível.

## Como jogar

Cada pista críptica tem **duas partes** que apontam para a **mesma** resposta:

1. **A definição** — o significado direto, como num dicionário. Fica sempre no
   **começo** ou no **fim** da pista.
2. **O jogo de palavras** — soletra a resposta de outra forma.

O número entre parênteses indica quantas letras tem a resposta. Acentos não
importam ao digitar.

### Tipos de jogo de palavras

| Tipo | O que faz | Indicadores comuns |
|------|-----------|--------------------|
| **Anagrama** | Letras embaralhadas | confuso, transformado, revirado, bagunçado |
| **Palavra escondida** | A resposta aparece dentro de outras palavras | em, esconde, parte de |
| **Reversão** | A palavra ao contrário | invertido, de trás pra frente, ao contrário |
| **Dupla definição** | Duas definições lado a lado | — |
| **Junção (charada)** | Pedaços somados | — |
| **Homófono** | Soa como outra palavra | no ouvido, soa como, dizem |

**Exemplo:** _"Amor transformado vira a capital (4)"_ → **ROMA**
- Definição: "a capital" (Roma é a capital da Itália).
- Jogo de palavras: anagrama de **AMOR** (indicado por "transformado") = ROMA.

## Como rodar

É um site estático (sem build). Basta abrir `index.html` no navegador, ou servir
a pasta:

```bash
# Python
python -m http.server 8000
# depois acesse http://localhost:8000
```

## Estrutura

- `index.html` — marcação da página e do modal "Como jogar".
- `style.css` — estilo (tema escuro responsivo).
- `script.js` — lógica do jogo (entrada por células, dicas, progresso salvo).
- `puzzles.js` — banco de enigmas. **Adicione os seus aqui!**

## Adicionando enigmas

Cada item de `window.PUZZLES` segue este formato:

```js
{
  id: 10,
  clue: "Sua pista críptica aqui",
  answer: "RESPOSTA",          // a comparação ignora acentos e espaços
  type: "Anagrama",            // mostrado na Dica 1
  definition: "trecho exato",  // precisa aparecer literalmente em `clue`
  wordplay: "Como o jogo de palavras forma a resposta.",
  defNote: "Por que a definição corresponde à resposta.",
}
```

O enigma do dia é escolhido pela data (rotaciona a lista). Use as setas ‹ › para
navegar pelo arquivo de enigmas. O progresso fica salvo no navegador
(`localStorage`).
