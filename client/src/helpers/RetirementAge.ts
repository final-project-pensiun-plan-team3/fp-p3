export const RetirementAge = (
    currentAge: number,
    monthlySaving: number,
    monthlySpending: number,
    inflationRate: number,
    investmentRate: number
  ): number => {
    if (monthlySaving <= monthlySpending || !investmentRate) {
      // Jika tabungan bulanan lebih kecil dari pengeluaran bulanan, pensiun tidak mungkin
      // console.log("Pensiun tidak dapat tercapai karena pengeluaran lebih besar dari tabungan.");
      return -1 ; // Mengembalikan -1 jika pensiun tidak mungkin
    }

  
    let age = currentAge;
    let savings = 0;
    const annualSpending = monthlySpending * 12;  // Pengeluaran tahunan saat ini
    let futureValueSpending = annualSpending;  // Untuk menghitung pengeluaran pensiun dengan inflasi
    let requiredRetirementFund = 0;  // Dana pensiun yang dibutuhkan berdasarkan 4% rule
    
    // Menghitung dana pensiun yang dibutuhkan berdasarkan 4% rule dan inflasi
    while (true) {
      // Menghitung dana pensiun yang dibutuhkan pada usia pensiun
      requiredRetirementFund = futureValueSpending / 0.04;
  
      // Looping setiap tahun untuk mengecek apakah tabungan sudah cukup
      if (savings >= requiredRetirementFund) {
        break;
      }
  
      // Tambahkan tabungan tahunan
      savings += monthlySaving * 12;
  
      // Perhitungkan return investasi tahunan
      savings *= (1 + investmentRate / 100);
  
      // Sesuaikan pengeluaran dengan inflasi untuk tahun berikutnya
      futureValueSpending *= (1 + inflationRate / 100);
  
      // Usia bertambah setiap tahun
      age++;
    }
  
    return age;
  };
  