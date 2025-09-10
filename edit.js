const namaInput = document.getElementById('nama-input');
const umurInput = document.getElementById('umur-input');
const alamatInput = document.getElementById('alamat-input');
const updateBtn = document.getElementById('update-btn');

const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get('id'));

let data = JSON.parse(localStorage.getItem('dataPengguna')) || [];
let item = data.find(d => d.id === id);

// Kalau data ga ketemu
if (!item) {
  alert('Data tidak ditemukan!');
  window.location.href = 'index.html';
} else {
  namaInput.value = item.nama;
  umurInput.value = item.umur;
  alamatInput.value = item.alamat;
}

updateBtn.addEventListener('click', () => {
  item.nama = namaInput.value.trim();
  item.umur = umurInput.value.trim();
  item.alamat = alamatInput.value.trim();

  if (item.nama && item.umur && item.alamat) {
    localStorage.setItem('dataPengguna', JSON.stringify(data));
    window.location.href = 'index.html';
  } else {
    alert('Semua field wajib diisi!');
  }
});

// Loading Screen
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loading").style.display = "none";
    document.querySelector(".container").classList.remove("hidden");
  }, 1000);
});
