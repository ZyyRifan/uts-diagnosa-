// Data Gejala dari Basis Pengetahuan
const daftarGejala = [
    { id: "K01", nama: "Layar monitor tidak menampilkan gambar (no display)" },
    { id: "K02", nama: "Terdengar bunyi beep berulang/gagal booting" },
    { id: "K03", nama: "Muncul layar biru dengan pesan eror (Blue Screen of Death)" },
    { id: "K04", nama: "Komputer terasa sangat lambat saat membuka aplikasi berat" },
    { id: "K05", nama: "Munculnya bintik-bintik, garis-garis, atau warna yang berantakan pada layar" },
    { id: "K06", nama: "Performa grafis sangat lambat atau patah-patah (stuttering)" },
    { id: "K07", nama: "Komputer sering membeku (hang) , freeze, lambat, terutama saat multitasking" },
    { id: "K08", nama: "Gagal mendeteksi, seperti suara hilang, Wi-Fi tidak terhubung, atau grafis tidak berfungsi maksimal" },
];

// Data Diagnosa (Kesimpulan)
const daftarDiagnosa = {
    "D01": "Diagnosa: Kerusakan pada Random Access Memory (RAM)",
    "D02": "Diagnosa: Kerusakan pada VGA Card atau kartu grafis",
    "D03": "Diagnosa: Masalah pada sistem operasi atau Driver yang korup",
    "D04": "Diagnosa: Terlalu banyak kerusakan, beli baru aja",
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
    // Untuk Kasus Mendiagnosa Semua Gejala (D04)
    if (inputUser.length === daftarGejala.length) {
        kesimpulan = daftarDiagnosa["D04"];
    }
    // Rule untuk D03: K03, K04, K08
    else if (inputUser.includes("K03") && inputUser.includes("K04") && inputUser.includes("K08")) {
        kesimpulan = daftarDiagnosa["D03"];
    } 
    // Rule untuk D01: K02, K03, K07
    else if (inputUser.includes("K02") && inputUser.includes("K03") && inputUser.includes("K07")) {
        kesimpulan = daftarDiagnosa["D01"];
    } 
    // Rule untuk D02: K01, K03, K05, K06
    else if (inputUser.includes("K01") && inputUser.includes("K03") && inputUser.includes("K05") && inputUser.includes("K06")) {
        kesimpulan = daftarDiagnosa["D02"];
    } 
    else if (inputUser.includes("K02") && inputUser.includes("K03") && inputUser.includes("K04") ) {
        kesimpulan = daftarDiagnosa["D01"];
    }
    else {
        kesimpulan = "Maaf, gejalanya aneh.";
    }

    // Menampilkan hasil ke UI
    teksHasil.innerText = kesimpulan;
    hasilBox.className = "hasil-hidden " + (kesimpulan.includes("Maaf") ? "warning" : "success");
}

function resetForm() {
    document.querySelectorAll('.gejala-input').forEach(el => el.checked = false);
    document.getElementById('hasil-box').className = "hasil-hidden";
}