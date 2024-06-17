var map = L.map("map").setView([40.66995747013945, -103.59179687498357], 3);

L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png")
    .addTo(map);

var markers = L.markerClusterGroup();

for (var i = 0; i < campgrounds.length; i++) {
    var [latitude, longitude] = campgrounds[i].geometry.coordinates;
    var title = campgrounds[i].properties.popUpMarkup;
    var marker = L.marker(new L.LatLng(longitude, latitude), {
        title: title,
    });
    marker.bindPopup(title);
    markers.addLayer(marker);
}

map.addLayer(markers);