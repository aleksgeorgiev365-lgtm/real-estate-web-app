document.addEventListener('DOMContentLoaded', function () {
  // --- 1. ДАННИ ---
  const locations = {
      "София": ["Център", "Лозенец", "Младост", "Люлин", "Витоша"],
      "Пловдив": ["Център", "Тракия", "Кършияка", "Стария град"],
      "Варна": ["Център", "Морска градина", "Аспарухово", "Виница"],
      "Бургас": ["Център", "Лазур", "Меден рудник", "Сарафово"]
  };

  // --- 2. ЕЛЕМЕНТИ ---
  const citySelect = document.getElementById('citySelect');
  const districtSelect = document.getElementById('districtSelect');
  const searchBtn = document.getElementById('searchBtn');

  if (!citySelect || !districtSelect || !searchBtn) return;

  // --- 3. ПОПЪЛВАНЕ ---
  for (const city in locations) {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
  }

  // --- 4. ПРОМЯНА НА ГРАД ---
  citySelect.addEventListener('change', function () {
      const selectedCity = this.value;
      districtSelect.innerHTML = '<option value="">Квартал</option>';

      if (selectedCity && locations[selectedCity]) {
          districtSelect.disabled = false;
          districtSelect.style.cursor = "pointer";
          locations[selectedCity].forEach(district => {
              const option = document.createElement('option');
              option.value = district;
              option.textContent = district;
              districtSelect.appendChild(option);
          });
      } else {
          districtSelect.disabled = true;
          districtSelect.style.cursor = "not-allowed";
      }
  });

  // --- 5. КЛИК НА БУТОНА (ТУК Е ПРОМЯНАТА) ---
  searchBtn.addEventListener('click', function() {
      const selectedCity = citySelect.value;
      const selectedDistrict = districtSelect.value;

      if (!selectedCity) {
          alert("Моля, изберете град!");
          citySelect.focus();
          return;
      }

      let targetUrl = `search.html?city=${encodeURIComponent(selectedCity)}`;
      if (selectedDistrict) {
          targetUrl += `&district=${encodeURIComponent(selectedDistrict)}`;
      }

      // ПРОМЯНА: window.location.href зарежда в същия прозорец
      window.location.href = targetUrl;
  });
});