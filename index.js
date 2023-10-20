const apiKey =
  "AAPK7ca3c5a593bd47fe98b8ee286279b667NqzTWvwVZsBlzx7WQjBPeyXxX7WUuBBzZRIxhtICfjMO6l2OJpeiOWk1owpYNf_8";
const basemapEnum = "arcgis/navigation";

const map = L.map("map", {
  minZoom: 2,
});

map.setView([48.8566, 2.3522], 13); // Paris

L.esri.Vector.vectorBasemapLayer(basemapEnum, {
  apiKey: apiKey,
}).addTo(map);

const layerGroup = L.layerGroup().addTo(map);

map.on("click", function (e) {
  L.esri.Geocoding.reverseGeocode({
    apikey: apiKey,
  })
    .latlng(e.latlng)

    .run(function (error, result) {
      if (error) {
        return;
      }

      layerGroup.clearLayers();

      marker = L.marker(result.latlng).addTo(layerGroup);

      const lngLatString = `${
        Math.round(result.latlng.lng * 100000) / 100000
      }, ${Math.round(result.latlng.lat * 100000) / 100000}`;

      marker.bindPopup(
        `<b>${lngLatString}</b><p>${result.address.Match_addr}</p>`
      );
      marker.openPopup();
      let markDis = result.latlng;
      console.log(markDis);
      console.log(result);
    });
});


const searchControl = L.esri.Geocoding.geosearch({
    position: "topleft",
    placeholder: "Enter an address or place e.g. 1 York St",
    useMapBounds: false,
    providers: [
      L.esri.Geocoding.arcgisOnlineProvider({
        apikey: apiKey,
        nearby: {
          lat: -33.8688,
          lng: 151.2093,
        },
      }),
    ],
  }).addTo(map);
  
  const results = L.layerGroup().addTo(map);
  
  searchControl.on("results", (data) => {
    results.clearLayers();
    for (let i = data.results.length - 1; i >= 0; i--) {
      const marker = L.marker(data.results[i].latlng);
        
    //   results.addLayer(marker);
    //   console.log(data);
    }
  });