
function toggleMenu() {
  const nav = document.getElementById('navLinks');
  if (nav) nav.classList.toggle('open');
}

document.querySelectorAll('.tab-btn').forEach(button => {
  button.addEventListener('click', () => {
    const tabId = button.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
    button.classList.add('active');
    const panel = document.getElementById(tabId);
    if (panel) panel.classList.add('active');
  });
});

function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  if (btn) {
    btn.textContent = 'Message received — please replace this demo handler before launch.';
    btn.style.background = '#1d6558';
    btn.disabled = true;
  }
}

document.addEventListener("DOMContentLoaded", async function () {
    const map = L.map("federal-way-map", {
      scrollWheelZoom: false
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const locations = [
      {
        name: "ACaring Adult Home",
        address: "2401 South 359TH Street, Federal Way, WA 98003"
      },
      {
        name: "ACaring Adult Home II",
        address: "32634 49TH PL SW, Federal Way, WA 98023"
      }
    ];

    const bounds = [];

    for (const place of locations) {
      const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(place.address)}`;

      try {
        const response = await fetch(url, {
          headers: { "Accept-Language": "en-US" }
        });
        const data = await response.json();

        if (data && data.length) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);

          L.marker([lat, lon])
            .addTo(map)
            .bindPopup(`
              <strong>${place.name}</strong><br>
              ${place.address}
            `);

          bounds.push([lat, lon]);
        }
      } catch (error) {
        console.error("Geocoding error for:", place.address, error);
      }
    }

    if (bounds.length) {
      map.fitBounds(bounds, { padding: [50, 50] });

      // Keep the map at a higher / wider viewpoint (bird's-eye feel)
      if (map.getZoom() > 12) {
        map.setZoom(12);
      }
    } else {
      // Fallback center on Federal Way
      map.setView([47.3223, -122.3126], 11);
    }
  });
