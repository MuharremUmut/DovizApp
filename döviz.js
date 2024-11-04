document.getElementById('convertBtn').addEventListener('click', async () => {
    const amount = document.getElementById('amount').value;
    const fromCurrency = 'TRY'; // Her zaman Türk Lirası'ndan dönüştürülecek.
    const toCurrencies = ['USD', 'EUR']; // Hedef dövizler.

    if (amount === '' || amount <= 0) {
        alert('Lütfen geçerli bir miktar girin.');
        return;
    }

    try {
        // API isteği.
        const apiKey = 'fca_live_PyidjWenhmzjE0IIFh4NZHj5asnIlKcjF04SyKJc'; // API anahtarınızı buraya koyun.
        const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&currencies=${toCurrencies.join(',')}&base_currency=${fromCurrency}`);
        const data = await response.json();

        // TRY'den USD ve EUR'a dönüşüm kurlarını alalım.
        const usdRate = data.data['USD'];
        const eurRate = data.data['EUR'];

        // Hesaplamaları yapalım.
        const usdResult = amount * usdRate;
        const eurResult = amount * eurRate;

        // Sonuçları gösterelim.
        document.getElementById('result').innerText = 
            `${amount} ${fromCurrency} = ${usdResult.toFixed(2)} USD\n` +
            `${amount} ${fromCurrency} = ${eurResult.toFixed(2)} EUR`;
    } catch (error) {
        alert('Döviz kuru bilgileri alınırken bir hata oluştu.');
        console.error(error);
    }
});
