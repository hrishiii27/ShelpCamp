const [latitude, longitude] = campground.geometry.coordinates
var map = L.map("map").setView([longitude, latitude], 13); // Set initial location and zoom level
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
}).addTo(map);

// Add a single marker
var marker = L.marker([longitude, latitude]).addTo(map);

// Bind a popup to the marker
marker.bindPopup(campground.title).openPopup();