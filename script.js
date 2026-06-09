
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

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-accordion]').forEach(accordion => {
    const buttons = accordion.querySelectorAll('.faq-question');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const currentItem = button.closest('.faq-item');
        const isOpen = button.getAttribute('aria-expanded') === 'true';

        buttons.forEach(otherButton => {
          if (otherButton === button) return;

          otherButton.setAttribute('aria-expanded', 'false');
          otherButton.closest('.faq-item')?.classList.remove('is-open');
        });

        button.setAttribute('aria-expanded', String(!isOpen));
        currentItem?.classList.toggle('is-open', !isOpen);
      });
    });
  });
});

async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('.form-submit');
  const status = form.querySelector('.form-status');
  const formData = new FormData(form);

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  if (status) {
    status.textContent = '';
    status.classList.remove('form-status--success', 'form-status--error');
  }

  if (btn) {
    btn.disabled = true;
    btn.dataset.originalText = btn.dataset.originalText || btn.textContent;
    btn.textContent = 'Sending...';
  }

  try {
    const response = await fetch(form.action, {
      method: form.method || 'POST',
      body: formData
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.ok) {
      throw new Error(result.message || 'Contact form submission failed.');
    }

    form.reset();
    if (status) {
      status.textContent = 'Thank you. Your inquiry has been sent. We will follow up as soon as possible.';
      status.classList.add('form-status--success');
    }
  } catch (error) {
    console.error(error);
    if (status) {
      status.textContent = 'We could not send your inquiry from the website. Please call us or email inquiries@acaringadulthome.com directly.';
      status.classList.add('form-status--error');
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = btn.dataset.originalText || 'Submit Inquiry →';
    }
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
      coords: [47.2828, -122.3032],
      searchUrl:
        "https://www.google.com/maps/search/?api=1&query=2401%20S%20359th%20St%2C%20Federal%20Way%2C%20WA%2098003",
      markerClass: "custom-map-marker--one"
    },
    {
      label: "2",
      name: "ACaring Adult Home II",
      address: "32634 49th Pl SW, Federal Way, WA 98023",
      coords: [47.3105, -122.3972],
      searchUrl:
        "https://www.google.com/maps/search/?api=1&query=32634%2049th%20Pl%20SW%2C%20Federal%20Way%2C%20WA%2098023",
      markerClass: "custom-map-marker--two"
    }
  ];

  const map = L.map("federal-way-map", {
    scrollWheelZoom: false,
    zoomControl: true
  });
  
  // Road/context map — better default for visitor orientation.
  const roadMap = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    {
      attribution: "Tiles &copy; Esri",
      maxZoom: 18
    }
  );
  
  const imagery = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community",
      maxZoom: 18
    }
  );
  
  const transportation = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}",
    {
      attribution: "Transportation &copy; Esri, HERE, Garmin, OpenStreetMap contributors",
      maxZoom: 18
    }
  );
  
  const labels = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
    {
      attribution: "Labels &copy; Esri",
      maxZoom: 18
    }
  );
  
  const satelliteWithContext = L.layerGroup([
    imagery,
    transportation,
    labels
  ]);

  roadMap.addTo(map);

  L.control.layers(
    {
      "Road map": roadMap,
      "Satellite + labels": satelliteWithContext
    },
    null,
    {
      collapsed: false
    }
  ).addTo(map);

  const markerLayer = L.layerGroup().addTo(map);
  const bounds = [];

  function createMarker(place) {
    const icon = L.divIcon({
      className: "custom-map-marker-wrap",
      html: `
        <div class="custom-map-marker ${place.markerClass}" aria-hidden="true">
          <span>${place.label}</span>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 44],
      popupAnchor: [0, -40]
    });

    L.marker(place.coords, { icon })
      .addTo(markerLayer)
      .bindPopup(`
        <strong>${place.name}</strong><br>
        ${place.address}<br>
        <a href="${place.searchUrl}" target="_blank" rel="noopener">
          Open in Google Maps
        </a>
      `);

    bounds.push(place.coords);
  }

  locations.forEach(createMarker);

  if (bounds.length > 1) {
    map.fitBounds(bounds, {
      padding: [80, 80],
      maxZoom: 12
    });
  } else {
    map.setView([47.3223, -122.3126], 11);
  }

  // Helps Leaflet calculate properly when the map sits inside responsive grids/cards.
  setTimeout(function () {
    map.invalidateSize();
    if (bounds.length > 1) {
      map.fitBounds(bounds, {
        padding: [80, 80],
        maxZoom: 12
      });
    }
  }, 150);
});
