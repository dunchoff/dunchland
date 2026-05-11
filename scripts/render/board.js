"use strict";

/* ===== scripts/render/board.js ===== */

function renderBoard(ctx) {
  const { el, store } = ctx;
  const { state } = store;
  if (!el.board) return;

  el.board.innerHTML = "";
  const center = document.createElement("div");
  center.className = "board-center";
  center.innerHTML = `
    <img src="./assets/bg/563d57da-194c-4745-bae1-1ff79ddce59f.png" alt="DunchLand" />
  `;
  el.board.append(center);

  state.sectors.forEach((sector, index) => {
    const coords = boardPath[index];
    if (!coords) return;
    const [col, row] = coords;
    const node = document.createElement("button");
    node.type = "button";
    node.className = `sector sector-${sector.type} ${sector.id === state.selectedSectorId ? "is-selected" : ""}`;
    node.style.gridColumn = String(col);
    node.style.gridRow = String(row);
    node.style.setProperty("--sector-color", sector.color);
    node.innerHTML = `
      <div class="sector-color"></div>
      <div class="sector-top"><span>${typeIcons[sector.type] || "."}</span><span>#${sector.id}</span></div>
      <div class="sector-name">${escapeHtml(sector.name)}</div>
      <div class="sector-meta"><span>${typeLabels[sector.type] || sector.type}</span><span class="sector-action" title="${escapeHtml(formatSectorAction(sector))}">${actionIcons[sector.action] || "-"}</span><span>${sector.points}</span></div>
      ${state.players.dunchoff.sectorId === sector.id ? `<span class="player-token token-a ${store.landingPlayer === "dunchoff" ? "is-landing" : ""}" style="--player-color:${state.players.dunchoff.color};"></span>` : ""}
      ${state.players.chat.sectorId === sector.id ? `<span class="player-token token-b ${store.landingPlayer === "chat" ? "is-landing" : ""}" style="--player-color:${state.players.chat.color};"></span>` : ""}
    `;
    node.addEventListener("click", () => {
      state.selectedSectorId = sector.id;
      addLog(state, "select", `Відкрито поле #${sector.id}: ${sector.name}.`);
      ctx.render();
      ctx.openSectorInfo();
    });
    el.board.append(node);
  });
}
