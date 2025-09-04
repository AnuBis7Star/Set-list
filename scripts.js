const container = document.querySelector("#songList");
container.addEventListener("click", (event) => {
  const deleteBtn = event.target.closest('[data-action="delete"]');
  if (!deleteBtn) return; // not a delete click
  // now deleteBtn is *the exact button* you clicked
  deleteBtn.closest('.row').remove();

  renumber();
});

const dialog = document.querySelector(".dialog-backdrop");

const new_song = document.getElementById("add-song");
new_song.addEventListener("click", () => {
  dialog.style.display = "flex";
});

const dialog_exit = document.getElementById("dialog-cancel");
dialog_exit.addEventListener("click", () => {
  dialog.style.display = "none";
})

// Renumber the list of songs

function renumber() {
  const rows = document.querySelectorAll("#songList .row");
  
  rows.forEach((row, index) => {
    const numberCell = row.querySelector(".n");
    numberCell.textContent = index + 1; // index starts at 0, so add 1
  });
}

const input_song_title = document.querySelector("#input-song-title");
let song_title = input_song_title.value;

