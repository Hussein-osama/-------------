document.addEventListener('DOMContentLoaded', () => {
    const countrySelector = document.querySelector('#country-selector');
    const prayerTimesContainer = document.querySelector('#prayer-times');

    async function fetchPrayerTimes(city) {
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${city}&method=2`);
        const data = await response.json();
        return data.data.timings;
    }

    async function updatePrayerTimes() {
        const city = countrySelector.options[countrySelector.selectedIndex].text.split(' - ')[1];
        const prayerTimes = await fetchPrayerTimes(city);
        prayerTimesContainer.innerHTML = `
            <h2>Prayer Times for ${city}</h2>
            <p><strong>Fajr:</strong> ${prayerTimes.Fajr}</p>
            <p><strong>Dhuhr:</strong> ${prayerTimes.Dhuhr}</p>
            <p><strong>Asr:</strong> ${prayerTimes.Asr}</p>
            <p><strong>Maghrib:</strong> ${prayerTimes.Maghrib}</p>
            <p><strong>Isha:</strong> ${prayerTimes.Isha}</p>
        `;
    }

    countrySelector.addEventListener('change', updatePrayerTimes);
    updatePrayerTimes(); // Load default city
});
