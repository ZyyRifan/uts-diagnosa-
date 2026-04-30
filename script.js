// Data Gejala dari Basis Pengetahuan
const daftarGejala = [
    { id: "G01", nama: "Layar monitor tidak menampilkan gambar (no display)" },
    { id: "G02", nama: "Terdengar bunyi beep berulang/gagal booting" },
    { id: "G03", nama: "Muncul layar biru dengan pesan eror (Blue Screen of Death)" },
    { id: "G04", nama: "Komputer terasa sangat lambat saat membuka aplikasi berat" },
    { id: "G05", nama: "Munculnya bintik-bintik, garis-garis, atau warna yang berantakan pada layar" },
    { id: "G06", nama: "Performa grafis sangat lambat atau patah-patah (stuttering)" },
    { id: "G07", nama: "Komputer sering membeku (hang) , freeze, lambat, terutama saat multitasking" },
    { id: "G08", nama: "Gagal mendeteksi, seperti suara hilang, Wi-Fi tidak terhubung, atau grafis tidak berfungsi maksimal" },
];

// Data Diagnosa (Kesimpulan)
const daftarDiagnosa = {
    "D01": "Diagnosa: Kerusakan pada Random Access Memory (RAM)",
    "D02": "Diagnosa: Kerusakan pada VGA Card atau kartu grafis",
    "D03": "Diagnosa: Masalah pada sistem operasi atau Driver yang korup",
};

// Fungsi memuat data gejala saat halaman dibuka
window.onload = () => {
    const listContainer = document.getElementById('gejala-list');
    daftarGejala.forEach(g => {
        listContainer.innerHTML += `
            <div class="gejala-item">
                <label>
                    <input type="checkbox" value="${g.id}" class="gejala-input"> 
                    <strong>${g.id}</strong> - ${g.nama}
                </label>
            </div>`;
    });
};

function prosesDiagnosa() {
    // Ambil semua gejala yang dipilih (Fakta)
    const inputUser = Array.from(document.querySelectorAll('.gejala-input:checked')).map(el => el.value);
    const hasilBox = document.getElementById('hasil-box');
    const teksHasil = document.getElementById('teks-hasil');

    if (inputUser.length === 0) {
        alert("Pilih setidaknya satu gejala terlebih dahulu!");
        return;
    }

    let kesimpulan = "";

    // Logika Inferensi Forward Chaining (Aturan/Rule)
    if (inputUser.includes("G03") || inputUser.includes("G08")) {
        kesimpulan = daftarDiagnosa["D03"];
    } else if (inputUser.includes("G07") && inputUser.includes("G02")) {
        kesimpulan = daftarDiagnosa["D01"];
    } else if (inputUser.includes("G01") && inputUser.includes("G05") || inputUser.includes("G06")) {
        kesimpulan = daftarDiagnosa["D02"];
    } else {
        kesimpulan = "Maaf, kombinasi gejalanya aneh.";
    }

    // Menampilkan hasil ke UI
    teksHasil.innerText = kesimpulan;
    hasilBox.className = "hasil-hidden " + (kesimpulan.includes("Maaf") ? "warning" : "success");
}

function resetForm() {
    document.querySelectorAll('.gejala-input').forEach(el => el.checked = false);
    document.getElementById('hasil-box').className = "hasil-hidden";
}