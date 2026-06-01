/* Enigma do Minuto — lógica do jogo */
(function () {
  "use strict";

  const PUZZLES = window.PUZZLES || [];
  const STORAGE_KEY = "enigma-do-minuto:v1";

  // ----- Estado persistente -----
  function loadState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }
  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* ignora (modo privado etc.) */
    }
  }
  const state = loadState();
  if (!state.puzzles) state.puzzles = {}; // por id: { solved, revealed, hints }

  function puzzleState(id) {
    if (!state.puzzles[id]) {
      state.puzzles[id] = { solved: false, revealed: false, hints: 0, guesses: 0 };
    }
    return state.puzzles[id];
  }

  // ----- Seleção do enigma do dia -----
  function dailyIndex() {
    const epoch = Date.UTC(2024, 0, 1);
    const today = new Date();
    const days = Math.floor(
      (Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - epoch) /
        86400000
    );
    return ((days % PUZZLES.length) + PUZZLES.length) % PUZZLES.length;
  }

  let current = dailyIndex();

  // ----- Utilidades -----
  function normalize(str) {
    return str
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "") // remove acentos
      .replace(/[^a-zA-Z]/g, "")
      .toUpperCase();
  }

  function enumeration(answer) {
    return (
      "(" +
      answer
        .trim()
        .split(/\s+/)
        .map((w) => w.length)
        .join(", ") +
      ")"
    );
  }

  // ----- Referências do DOM -----
  const el = {
    clue: document.getElementById("clue"),
    enumeration: document.getElementById("enumeration"),
    cells: document.getElementById("cells"),
    feedback: document.getElementById("feedback"),
    check: document.getElementById("check-btn"),
    hint: document.getElementById("hint-btn"),
    reveal: document.getElementById("reveal-btn"),
    hints: document.getElementById("hints"),
    explanation: document.getElementById("explanation"),
    prev: document.getElementById("prev-btn"),
    next: document.getElementById("next-btn"),
    label: document.getElementById("puzzle-label"),
    status: document.getElementById("puzzle-status"),
    statSolved: document.getElementById("stat-solved"),
    statHints: document.getElementById("stat-hints"),
    statGuesses: document.getElementById("stat-guesses"),
    helpModal: document.getElementById("help-modal"),
    helpBtn: document.getElementById("help-btn"),
    helpClose: document.getElementById("help-close"),
    helpOk: document.getElementById("help-ok"),
    toast: document.getElementById("toast"),
  };

  let inputs = []; // células <input> em ordem

  // ----- Renderização -----
  function renderClue(p) {
    // Destaca a definição na pista (texto exato em p.definition)
    const safe = document.createTextNode("");
    el.clue.textContent = "";
    const idx = p.clue.indexOf(p.definition);
    if (idx >= 0 && puzzleState(p.id).hintsShownDef) {
      el.clue.append(
        document.createTextNode(p.clue.slice(0, idx))
      );
      const span = document.createElement("span");
      span.className = "def";
      span.textContent = p.definition;
      el.clue.append(span);
      el.clue.append(
        document.createTextNode(p.clue.slice(idx + p.definition.length))
      );
    } else {
      el.clue.textContent = p.clue;
    }
    el.enumeration.textContent = enumeration(p.answer);
  }

  function renderCells(p) {
    el.cells.innerHTML = "";
    inputs = [];
    const words = p.answer.trim().split(/\s+/);
    words.forEach((word, wi) => {
      if (wi > 0) {
        const gap = document.createElement("span");
        gap.className = "gap";
        el.cells.append(gap);
      }
      const wordEl = document.createElement("div");
      wordEl.className = "word";
      for (let i = 0; i < word.length; i++) {
        const cell = document.createElement("input");
        cell.className = "cell";
        cell.type = "text";
        cell.maxLength = 1;
        cell.autocomplete = "off";
        cell.inputMode = "text";
        cell.setAttribute("aria-label", "letra");
        wireCell(cell);
        wordEl.append(cell);
        inputs.push(cell);
      }
      el.cells.append(wordEl);
    });
  }

  function wireCell(cell) {
    cell.addEventListener("input", () => {
      cell.value = cell.value.toUpperCase().replace(/[^A-ZÀ-Ú]/gi, "");
      cell.classList.toggle("filled", !!cell.value);
      if (cell.value) focusNext(cell);
    });
    cell.addEventListener("keydown", (e) => {
      const i = inputs.indexOf(cell);
      if (e.key === "Backspace" && !cell.value && i > 0) {
        inputs[i - 1].focus();
        inputs[i - 1].value = "";
        inputs[i - 1].classList.remove("filled");
        e.preventDefault();
      } else if (e.key === "ArrowLeft" && i > 0) {
        inputs[i - 1].focus();
        e.preventDefault();
      } else if (e.key === "ArrowRight" && i < inputs.length - 1) {
        inputs[i + 1].focus();
        e.preventDefault();
      } else if (e.key === "Enter") {
        e.preventDefault();
        checkAnswer();
      }
    });
  }

  function focusNext(cell) {
    const i = inputs.indexOf(cell);
    if (i < inputs.length - 1) inputs[i + 1].focus();
  }

  function getGuess() {
    return inputs.map((c) => c.value).join("");
  }

  // ----- Ações -----
  function checkAnswer() {
    const p = PUZZLES[current];
    const ps = puzzleState(p.id);
    if (ps.solved || ps.revealed) return;

    const guess = normalize(getGuess());
    if (guess.length < normalize(p.answer).length) {
      flash("Preencha todas as letras.", "bad");
      shake();
      return;
    }

    ps.guesses = (ps.guesses || 0) + 1;
    if (guess === normalize(p.answer)) {
      ps.solved = true;
      saveState();
      inputs.forEach((c) => c.classList.add("correct"));
      flash("Acertou! 🎉", "good");
      showExplanation(p, true);
      lockBoard();
    } else {
      saveState();
      flash("Ainda não… tente de novo ou peça uma dica.", "bad");
      shake();
    }
    updateStats();
    updateStatus();
  }

  function giveHint() {
    const p = PUZZLES[current];
    const ps = puzzleState(p.id);
    if (ps.solved || ps.revealed) return;

    const total = 3; // dicas progressivas
    if ((ps.hints || 0) >= total) {
      flash("Não há mais dicas — só revelando a resposta.", "bad");
      return;
    }
    ps.hints = (ps.hints || 0) + 1;
    if (ps.hints === 2) ps.hintsShownDef = true;
    saveState();
    renderHints(p);
    if (ps.hints === 2) renderClue(p); // destaca a definição
    updateStats();
  }

  function hintText(p, n) {
    const norm = normalize(p.answer);
    switch (n) {
      case 1:
        return `<strong>Dica 1 — Tipo:</strong> o jogo de palavras é um <strong>${p.type}</strong>.`;
      case 2:
        return `<strong>Dica 2 — Definição:</strong> a parte que define a resposta é «${p.definition}» (destacada na pista).`;
      case 3:
        return `<strong>Dica 3 — Início:</strong> a resposta começa com «${norm[0]}» e tem ${norm.length} letras.`;
      default:
        return "";
    }
  }

  function renderHints(p) {
    const ps = puzzleState(p.id);
    el.hints.innerHTML = "";
    for (let i = 1; i <= (ps.hints || 0); i++) {
      const div = document.createElement("div");
      div.className = "hint";
      div.innerHTML = hintText(p, i);
      el.hints.append(div);
    }
  }

  function revealAnswer() {
    const p = PUZZLES[current];
    const ps = puzzleState(p.id);
    if (ps.solved) return;
    ps.revealed = true;
    ps.hintsShownDef = true;
    saveState();
    // preenche as células
    const letters = p.answer.replace(/\s+/g, "");
    inputs.forEach((c, i) => {
      c.value = (letters[i] || "").toUpperCase();
      c.classList.add("filled");
    });
    renderClue(p);
    flash("Resposta revelada.", "bad");
    showExplanation(p, false);
    lockBoard();
    updateStatus();
  }

  function showExplanation(p, solved) {
    el.explanation.hidden = false;
    el.explanation.innerHTML = `
      <h3>${solved ? "Mandou bem! Veja como funciona:" : "Como a pista funciona:"}</h3>
      <p class="answer-reveal">${p.answer.toUpperCase()}</p>
      <p><span class="label">Tipo</span><br>${p.type}</p>
      <p><span class="label">Definição</span><br>«${p.definition}» — ${p.defNote}</p>
      <p><span class="label">Jogo de palavras</span><br>${p.wordplay}</p>
      <button id="share-btn" class="share-btn" type="button">📋 Compartilhar resultado</button>
    `;
    const shareBtn = document.getElementById("share-btn");
    if (shareBtn) shareBtn.addEventListener("click", () => shareResult(p));
    el.explanation.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // ----- Compartilhar (estilo Wordle) -----
  const SHARE_URL = "https://tobson04.github.io/enigma-do-minuto/";

  function buildShareText(p) {
    const ps = puzzleState(p.id);
    const hints = Math.min(ps.hints || 0, 3);
    const guesses = ps.guesses || 0;
    let bar, line;
    if (ps.solved) {
      bar = "🟩".repeat(3 - hints) + "🟨".repeat(hints);
      const gWord = guesses === 1 ? "tentativa" : "tentativas";
      const hWord = hints === 1 ? "dica" : "dicas";
      const bravo = hints === 0 && guesses <= 1 ? " — perfeito!" : "";
      line = `Resolvi com ${hints} ${hWord} e ${guesses} ${gWord}${bravo}`;
    } else {
      bar = "🟥🟥🟥";
      line = "Acabei revelando a resposta 🙈";
    }
    return `🧩 Enigma do Minuto #${p.id}\n${bar}\n${line}\n${SHARE_URL}`;
  }

  async function shareResult(p) {
    const text = buildShareText(p);
    // Em celulares, usa o menu nativo de compartilhamento quando disponível.
    if (navigator.share) {
      try {
        await navigator.share({ title: "Enigma do Minuto", text });
        return;
      } catch (e) {
        if (e && e.name === "AbortError") return; // usuário cancelou
        // senão, cai para a cópia
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      toast("Resultado copiado! 📋 Cole onde quiser.");
    } catch (e) {
      window.prompt("Copie seu resultado:", text);
    }
  }

  let toastTimer = null;
  function toast(msg) {
    el.toast.textContent = msg;
    el.toast.hidden = false;
    el.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.toast.classList.remove("show");
      setTimeout(() => (el.toast.hidden = true), 250);
    }, 2400);
  }

  function lockBoard() {
    inputs.forEach((c) => (c.disabled = true));
    el.check.disabled = true;
    el.hint.disabled = true;
    el.reveal.disabled = true;
  }

  function unlockBoard() {
    el.check.disabled = false;
    el.hint.disabled = false;
    el.reveal.disabled = false;
  }

  // ----- Feedback / stats -----
  function flash(msg, kind) {
    el.feedback.textContent = msg;
    el.feedback.className = "feedback " + (kind || "");
  }

  function shake() {
    el.cells.classList.remove("shake");
    void el.cells.offsetWidth; // reinicia a animação
    el.cells.classList.add("shake");
  }

  function countSolved() {
    return Object.values(state.puzzles).filter((p) => p.solved).length;
  }

  function updateStats() {
    const ps = puzzleState(PUZZLES[current].id);
    el.statSolved.textContent = countSolved();
    el.statHints.textContent = ps.hints || 0;
    el.statGuesses.textContent = ps.guesses || 0;
  }

  function updateStatus() {
    const p = PUZZLES[current];
    const ps = puzzleState(p.id);
    el.label.textContent =
      current === dailyIndex() ? `Enigma de hoje · #${p.id}` : `Enigma #${p.id}`;
    if (ps.solved) {
      el.status.textContent = "✓ Resolvido";
      el.status.className = "puzzle-status solved";
    } else if (ps.revealed) {
      el.status.textContent = "Revelado";
      el.status.className = "puzzle-status";
    } else {
      el.status.textContent = "Em aberto";
      el.status.className = "puzzle-status";
    }
  }

  // ----- Troca de enigma -----
  function load(index) {
    current = ((index % PUZZLES.length) + PUZZLES.length) % PUZZLES.length;
    const p = PUZZLES[current];
    const ps = puzzleState(p.id);

    el.explanation.hidden = true;
    el.explanation.innerHTML = "";
    flash("", "");
    unlockBoard();

    renderClue(p);
    renderCells(p);
    renderHints(p);

    if (ps.solved || ps.revealed) {
      const letters = p.answer.replace(/\s+/g, "");
      inputs.forEach((c, i) => {
        c.value = (letters[i] || "").toUpperCase();
        c.classList.add("filled");
        if (ps.solved) c.classList.add("correct");
      });
      showExplanation(p, ps.solved);
      lockBoard();
    } else if (inputs[0]) {
      inputs[0].focus();
    }

    updateStats();
    updateStatus();
  }

  // ----- Modal -----
  function openHelp() {
    el.helpModal.hidden = false;
  }
  function closeHelp() {
    el.helpModal.hidden = true;
  }

  // ----- Listeners -----
  el.check.addEventListener("click", checkAnswer);
  el.hint.addEventListener("click", giveHint);
  el.reveal.addEventListener("click", revealAnswer);
  el.prev.addEventListener("click", () => load(current - 1));
  el.next.addEventListener("click", () => load(current + 1));
  el.helpBtn.addEventListener("click", openHelp);
  el.helpClose.addEventListener("click", closeHelp);
  el.helpOk.addEventListener("click", closeHelp);
  el.helpModal.addEventListener("click", (e) => {
    if (e.target === el.helpModal) closeHelp();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !el.helpModal.hidden) closeHelp();
  });

  // ----- Primeira execução: mostra a ajuda uma vez -----
  if (!state.seenHelp) {
    openHelp();
    state.seenHelp = true;
    saveState();
  }

  // ----- Inicia -----
  if (PUZZLES.length) {
    load(current);
  } else {
    el.clue.textContent = "Nenhum enigma disponível.";
  }
})();
