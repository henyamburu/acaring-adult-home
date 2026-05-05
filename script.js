
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


document.addEventListener("DOMContentLoaded", function () {
  const mapEl = document.getElementById("federal-way-map");

  if (!mapEl) return;

  if (typeof L === "undefined") {
    console.warn("Leaflet is not loaded. Add the Leaflet CSS/JS includes to location-contact.html.");
    return;
  }

  const locations = [
    {
      label: "1",
      name: "ACaring Adult Home",
      address: "2401 S 359th St, Federal Way, WA 98003",
      searchUrl:
        "https://www.google.com/maps/search/?api=1&query=2401%20S%20359th%20St%2C%20Federal%20Way%2C%20WA%2098003",
      markerClass: "custom-map-marker--one"
    },
    {
      label: "2",
      name: "ACaring Adult Home II",
      address: "32634 49th Pl SW, Federal Way, WA 98023",
      searchUrl:
        "https://www.google.com/maps/search/?api=1&query=32634%2049th%20Pl%20SW%2C%20Federal%20Way%2C%20WA%2098023",
      markerClass: "custom-map-marker--two"
    }
  ];

  const map = L.map("federal-way-map", {
    scrollWheelZoom: false,
    zoomControl: true
  });

  // Satellite / bird's-eye style.
  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community",
      maxZoom: 18
    }
  ).addTo(map);

  const markerLayer = L.layerGroup().addTo(map);
  const bounds = [];

  async function geocodeAddress(place) {
    const endpoint =
      "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=" +
      encodeURIComponent(place.address);

    const response = await fetch(endpoint, {
      headers: {
        "Accept-Language": "en-US"
      }
    });

    if (!response.ok) {
      throw new Error("Geocoding failed for " + place.address);
    }

    const data = await response.json();

    if (!data || !data.length) {
      throw new Error("No map result found for " + place.address);
    }

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon)
    };
  }

  function createMarker(place, lat, lng) {
    const icon = L.divIcon({
      className: "",
      html: `
        <div class="custom-map-marker ${place.markerClass}">
          <span>${place.label}</span>
        </div>
      `,
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -36]
    });

    L.marker([lat, lng], { icon })
      .addTo(markerLayer)
      .bindPopup(`
        <strong>${place.name}</strong><br>
        ${place.address}<br>
        <a href="${place.searchUrl}" target="_blank" rel="noopener">
          Open in Google Maps
        </a>
      `);

    bounds.push([lat, lng]);
  }

  async function buildMap() {
    try {
      for (const place of locations) {
        const coords = await geocodeAddress(place);
        createMarker(place, coords.lat, coords.lng);
      }

      if (bounds.length > 1) {
        map.fitBounds(bounds, {
          padding: [70, 70],
          maxZoom: 12
        });
      } else if (bounds.length === 1) {
        map.setView(bounds[0], 12);
      } else {
        map.setView([47.3223, -122.3126], 11);
      }
    } catch (error) {
      console.error(error);

      // Fallback: Federal Way wide view if address lookup fails.
      map.setView([47.3223, -122.3126], 11);
    }
  }

  buildMap();
});