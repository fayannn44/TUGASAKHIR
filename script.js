const dataList = document.getElementById('data-list');
const addBtn = document.getElementById('add-btn');
const namaInput = document.getElementById('nama-input');
const umurInput = document.getElementById('umur-input');
const alamatInput = document.getElementById('alamat-input');

let data = JSON.parse(localStorage.getItem('dataPengguna')) || [];

function saveData() {
  localStorage.setItem('dataPengguna', JSON.stringify(data));
}

function renderData() {
  dataList.innerHTML = '';
  data.forEach(item => {
    const li = document.createElement('li');
    li.className = 'data-item';
    li.innerHTML = `
      <div class="data-info">
        <strong>Nama:</strong> ${item.nama} <br>
        <strong>Umur:</strong> ${item.umur} <br>
        <strong>Tempat Tinggal:</strong> ${item.alamat}
      </div>
      <button class="edit-btn" onclick="window.location.href='edit.html?id=${item.id}'">Edit</button>
      <button class="delete-btn" onclick="deleteData(${item.id})">Hapus</button>
    `;
    dataList.appendChild(li);
  });
}

function deleteData(id) {
  data = data.filter(d => d.id !== id);
  saveData();
  renderData();
}

addBtn.addEventListener('click', () => {
  const nama = namaInput.value.trim();
  const umur = umurInput.value.trim();
  const alamat = alamatInput.value.trim();

  if (nama && umur && alamat) {
    const newItem = { id: Date.now(), nama, umur, alamat };
    data.push(newItem);
    saveData();
    renderData();
    namaInput.value = '';
    umurInput.value = '';
    alamatInput.value = '';
  } else {
    alert('Semua field wajib diisi!');
  }
});

renderData();
