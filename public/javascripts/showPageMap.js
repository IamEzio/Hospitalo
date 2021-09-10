const hospital = JSON.parse(hospitalJSON)

// console.log(hospital);
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: hospital.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});
console.log(hospital);

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat(hospital.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h5>${hospital.title}</h5><h6>${hospital.location}</h6>`
            )
    )
    .addTo(map);