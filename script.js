// === AMBIL DATA ===
let data = JSON.parse(localStorage.getItem('dataPengguna')) || [];
const dataList = document.getElementById('data-list');
const searchInput = document.getElementById('search-input');
const goAdd = document.getElementById('go-add'); // 🔥 tombol Tambah Pekerja

// === NOTIFIKASI CUSTOM ===
function showNotification(message, type = "success") {
  const notif = document.createElement("div");
  notif.className = `notification ${type}`;
  notif.innerText = message;
  document.body.appendChild(notif);

  setTimeout(() => notif.classList.add("show"), 100);  
  setTimeout(() => {
    notif.classList.remove("show");
    setTimeout(() => notif.remove(), 500);
  }, 3000);
}

// === RENDER DATA ===
function renderData(filter = '') {
  if (!dataList) return;
  dataList.innerHTML = '';
  let filtered = data.filter(item =>
    item.nama.toLowerCase().includes(filter.toLowerCase()) ||
    item.pekerjaan.toLowerCase().includes(filter.toLowerCase())
  );

  if (filtered.length === 0) {
    dataList.innerHTML = `<p class="no-data">⚠️ Tidak ada data</p>`;
    return;
  }

  filtered.forEach(item => {
    const li = document.createElement('li');
    li.className = 'data-item fade-in';
    li.innerHTML = `
      <div class="data-info">
        <strong>Nama:</strong> ${item.nama} <br>
        <strong>Umur:</strong> ${item.umur} <br>
        <strong>Alamat:</strong> ${item.alamat} <br>
        <strong>Pekerjaan:</strong> ${item.pekerjaan}
      </div>
      <div class="btn-group">
        <button class="edit-btn" onclick="window.location.href='edit.html?id=${item.id}'">✏️ Edit</button>
        <button class="delete-btn" onclick="deleteData(${item.id})">🗑️ Hapus</button>
      </div>
    `;
    dataList.appendChild(li);
  });
}

// === HAPUS DATA ===
function deleteData(id) {
  if (confirm("Yakin mau hapus?")) {
    data = data.filter(d => d.id !== id);
    localStorage.setItem('dataPengguna', JSON.stringify(data));
    renderData(searchInput ? searchInput.value : '');
    showNotification("🗑️ Data berhasil dihapus!", "success");
  }
}

// === TAMBAH DATA ===
const saveBtn = document.getElementById("save-btn");
if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    const nama = document.getElementById("nama-input").value.trim();
    const umur = document.getElementById("umur-input").value.trim();
    const alamat = document.getElementById("alamat-input").value.trim();
    const pekerjaan = document.getElementById("pekerjaan-input").value.trim();

    if (nama && umur && alamat && pekerjaan) {
      data.push({ id: Date.now(), nama, umur, alamat, pekerjaan });
      localStorage.setItem("dataPengguna", JSON.stringify(data));
      showNotification("✅ Data berhasil ditambahkan!", "success");
      setTimeout(() => window.location.href = "index.html", 1000);
    } else {
      showNotification("⚠️ Semua field wajib diisi!", "error");
    }
  });
}

// === EDIT DATA ===
const updateBtn = document.getElementById("update-btn");
if (updateBtn) {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  let item = data.find(d => d.id === id);

  if (item) {
    document.getElementById("edit-nama").value = item.nama;
    document.getElementById("edit-umur").value = item.umur;
    document.getElementById("edit-alamat").value = item.alamat;
    document.getElementById("edit-pekerjaan").value = item.pekerjaan;
  }

  updateBtn.addEventListener("click", () => {
    item.nama = document.getElementById("edit-nama").value.trim();
    item.umur = document.getElementById("edit-umur").value.trim();
    item.alamat = document.getElementById("edit-alamat").value.trim();
    item.pekerjaan = document.getElementById("edit-pekerjaan").value.trim();

    if (item.nama && item.umur && item.alamat && item.pekerjaan) {
      localStorage.setItem("dataPengguna", JSON.stringify(data));
      showNotification("✅ Data berhasil diupdate!", "success");
      setTimeout(() => window.location.href = "index.html", 1000);
    } else {
      showNotification("⚠️ Semua field wajib diisi!", "error");
    }
  });
}

// === PENCARIAN ===
if (searchInput) {
  searchInput.addEventListener("input", () => {
    renderData(searchInput.value);
  });
}

// === DARK MODE ===
const darkToggle = document.getElementById("dark-toggle");
if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    darkToggle.textContent = document.body.classList.contains("dark")
      ? "☀️ Light Mode" : "🌙 Dark Mode";
  });
}

// === TOMBOL TAMBAH DATA (INDEX) ===
if (goAdd) {
  goAdd.addEventListener("click", () => {
    window.location.href = "tambah.html"; // 🔥 pindah ke halaman tambah
  });
}

// === LOADING ===
window.addEventListener("load", () => {
  const loading = document.getElementById("loading");
  const container = document.querySelector(".container");
  if (loading && container) {
    setTimeout(() => {
      loading.style.display = "none";
      container.classList.remove("hidden");
    }, 1000);
  }
  renderData();
});
