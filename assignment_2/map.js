mapboxgl.accessToken = 'pk.eyJ1IjoibHprb3VvIiwiYSI6ImNtMHF6aG04bjAzaDYyanB1MXRqajZzd2gifQ.gc9TIEDHnKq3iKvTwA7sRw';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/lzkouo/cm72o2z5l009x01s35b82gznc',
    zoom: 5,
    center: [-74, 40.725],
    maxZoom: 15,
    minZoom: 8,
    maxBounds: [[-74.45, 40.45], [-73.55, 41]]
});

map.on('load', function () {
    map.addLayer({
        'id': 'schools_nyc',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/schools_nyc_converted.geojson'
        },
        'paint': {
            'circle-color': '#ff7f50',
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 0.5,
            'circle-radius': [
            'interpolate', ['linear'], ['zoom'],
            10, 2,   // 在 zoom 级别 5 时，半径为 2
            15, 8,  // 在 zoom 级别 10 时，半径为 6
            20, 5  // 在 zoom 级别 15 时，半径为 10
            ]
        }
    });

    map.addLayer({
        'id': 'ChildrenPlayAreas',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/ChildrenPlayAreas.geojson'
        },
        'paint': {
            'circle-color': '#315AA8',
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 0.5,
            'circle-radius': [
            'interpolate', ['linear'], ['zoom'],
            10, 2,   // 在 zoom 级别 5 时，半径为 2
            15, 8,  // 在 zoom 级别 10 时，半径为 6
            20, 5  // 在 zoom 级别 15 时，半径为 10
            ]
        }
    });

    
    map.addLayer({
        'id': 'Playgrounds_in_Schoolyard',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': 'data/Playgrounds_in_Schoolyard.geojson'
        },
        'paint': {
            'fill-color': '#ff7f50',
            'fill-opacity': 0.5,
        }
    }, 'water');

    map.addLayer({
        'id': 'medianIncome',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': 'data/medianIncome.geojson'
        },
        'paint': {
            'fill-color': '#000000',
            'fill-opacity': 0.05,
        }
    }, 'water');

});

// Create the popup （School）
map.on('click', 'schools_nyc', function (e) {
    let Name = e.features[0].properties.Name;
    let Latitude = e.features[0].properties.Latitude;
    let Longitude = e.features[0].properties.Longitude;
    let Geographic = e.features[0].properties.Geographic;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('-SCHOOL-'+ '<br>' + Name + '<br>' + Latitude + '° N' + '<br>' + Longitude + '° W' + '<br>' + 'Geographic : ' + Geographic)
        .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the turnstileData layer.
map.on('mouseenter', 'turnstileData', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'turnstileData', function () {
    map.getCanvas().style.cursor = '';
});