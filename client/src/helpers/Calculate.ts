// Fungsi untuk menghitung target dana pensiun
function hitungTargetDanaPensiun(pengeluaranBulanan: number, returnTahunan: number, inflasiTahunan: number): number {
    // Menghitung pengeluaran tahunan
    const pengeluaranTahunan = pengeluaranBulanan * 12;
    
    // Menghitung dana pensiun yang dibutuhkan berdasarkan inflasi dan return
    const targetDanaPensiun = (pengeluaranTahunan * (1 + inflasiTahunan)) / (returnTahunan - inflasiTahunan);
    
    return targetDanaPensiun;
}

// Fungsi untuk menghitung asumsi tabungan bulanan (misalnya target tabungan)
function hitungTabunganBulanan(targetDanaPensiun: number, bulanSisa: number): number {
    return targetDanaPensiun / bulanSisa;
}

// Fungsi untuk menghitung total saving yang dimiliki
function hitungTotalSaving(tabunganBulanan: number, bulanSisa: number): number {
    return tabunganBulanan * bulanSisa;
}

// Data yang diberikan
const pengeluaranBulanan = 10000000;  // Pengeluaran per bulan dalam IDR
const returnTahunan = 0.07;          // Pengembalian investasi 7%
const inflasiTahunan = 0.04;         // Inflasi 4%
const bulanSisa = 240;               // Sisa bulan hingga pensiun (contoh: 20 tahun)
const asumsiTabunganBulanan = 5000000; // Asumsi tabungan bulanan

// Menghitung target dana pensiun yang dibutuhkan
const targetDanaPensiun = hitungTargetDanaPensiun(pengeluaranBulanan, returnTahunan, inflasiTahunan);

// Menghitung total saving yang dimiliki berdasarkan asumsi tabungan bulanan
const totalSaving = hitungTotalSaving(asumsiTabunganBulanan, bulanSisa);

// Menghitung asumsi tabungan bulanan yang diperlukan untuk mencapai target dana pensiun
const asumsiTabunganBulananDiperlukan = hitungTabunganBulanan(targetDanaPensiun, bulanSisa);

// Menampilkan hasil
console.log("Total Saving: Rp " + totalSaving.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
console.log("Target Saving: Rp " + targetDanaPensiun.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
console.log("Inflation Rate: " + (inflasiTahunan * 100).toFixed(2) + "%");
console.log("Return Investment: " + (returnTahunan * 100).toFixed(2) + "%");
console.log("Assumption Monthly Saving: Rp " + asumsiTabunganBulanan.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
console.log("Assumption Monthly Spending: Rp " + pengeluaranBulanan.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
console.log("Retirement Age: " + (bulanSisa / 12).toFixed(0) + " years");
console.log("Assumption Monthly Saving Needed: Rp " + asumsiTabunganBulananDiperlukan.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
