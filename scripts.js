// --- Boot ---
document.addEventListener("DOMContentLoaded", init);

// --- Cached static elements (single-instance nodes) ---
const els = {};

function cacheEls() {
  els.songCount    = document.querySelector("#song-count");
  els.container    = document.querySelector("#songList");
  els.dialog       = document.querySelector(".dialog-backdrop");
  els.newSongBtn   = document.getElementById("add-song");
  els.dialogCancel = document.getElementById("dialog-cancel"); // make sure this id exists in HTML
}

// --- Helpers (query dynamic stuff fresh each time) ---
function renumber() {
  const rows = document.querySelectorAll("#songList .row"); // fresh snapshot
  rows.forEach((row, index) => {
    const numberCell = row.querySelector(".n");
    if (numberCell) numberCell.textContent = index + 1;
  });
}

function updateSongCount() {
  const rows = document.querySelectorAll("#songList .row"); // fresh snapshot
  if (els.songCount) els.songCount.textContent = rows.length;
}

// --- Events wiring (one place) ---
function bindEvents() {
  // Delete buttons (event delegation on the list container)
  els.container?.addEventListener("click", (event) => {
    const deleteBtn = event.target.closest('[data-action="delete"]');
    if (!deleteBtn) return;

    deleteBtn.closest(".row")?.remove();
    renumber();
    updateSongCount();
  });

  // Open dialog
  els.newSongBtn?.addEventListener("click", () => {
    if (els.dialog) els.dialog.style.display = "flex";
  });

  // Close dialog
  els.dialogCancel?.addEventListener("click", () => {
    if (els.dialog) els.dialog.style.display = "none";
  });
}

// --- Entry point ---
function init() {
  cacheEls();
  bindEvents();
  renumber();        // sync numbering on first paint
  updateSongCount(); // sync total on first paint
}
