// Replace this URL with your CORS-compliant hosted image URL

let cntr = ["152.42905811645483", "-27.03675120820229"];

const customMarkerUrl = 'https://i.postimg.cc/N0s5ZKK6/hotel-icon-map-18-removebg-preview.png';

function initializeMap() {
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: cntr,
        zoom: 8.5
    });

    // Search, Fullscreen, Zoom, Geolocate, and Scale Controls
    map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken, mapboxgl: mapboxgl, marker:{ color:'green' }}));
    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.GeolocateControl({ positionOptions:{ enableHighAccuracy:true }, trackUserLocation:true }));
    map.addControl(new mapboxgl.ScaleControl({ maxWidth: 280 }));

    function addSource() {
        map.addSource('my-dataset', { type: 'vector', url: 'mapbox://rishi13.ao5gc0ra' });
        map.addSource('suburb-bound', { type: 'vector', url: 'mapbox://rishi13.kryptonite' });
        map.addSource('lga-bound', { type: 'vector', url: 'mapbox://rishi13.3f21sqvz' });
        map.addSource('choro-bound', { type: 'vector', url: 'mapbox://rishi13.dnvqj0da' });
    }

    function addLayer() {
        map.addLayer({
            'id': 'suburb-layer',
            'type': 'fill',
            'source': 'suburb-bound',
            'source-layer': 'my-layer',
            'paint': {
                'fill-opacity': 0.008,
                'fill-color': '#808080',
                'fill-outline-color': '#000000'
            }
        });

        map.addLayer({
            'id': 'choropleth-layer',
            'type': 'fill',
            'source': 'choro-bound',
            'source-layer': 'Somerset_Suburb_Hexbins-1mmyeu',
            'paint': {
                'fill-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'random_values'],
                    0, '#ff0000',
                    33, '#ff8080',
                    80,  '#f2f0f7'
                ],
                'fill-opacity': 0.33
            },
            'layout': { 'visibility': 'none' }
        });

        map.addLayer({
            'id': 'dataset-layer',
            'type': 'symbol',
            'source': 'my-dataset',
            'source-layer': 'Somerset_Audit_geocode-8tnjtg',
            'layout': {
                'icon-image': 'custom-marker',
                'icon-size': 0.04,
                'icon-allow-overlap': true,
                'icon-ignore-placement': true
            }
        });
    }

    map.on('style.load', function () {
        // Load the custom marker image from a CORS-compliant host
        map.loadImage(customMarkerUrl, function (error, image) {
            if (error) throw error;
            map.addImage('custom-marker', image);
            addSource();
            addLayer();
        });
    });

        // Feature Interaction
        map.on('click', 'dataset-layer', function (e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            var properties = e.features[0].properties;
    
            map.flyTo({ center: e.features[0].geometry.coordinates });
    
            var popupContent = `<div class="premium-popup">
                                    <h3>${properties['Name']}</h3>
                                    <h4>${properties['Suburb']}</h4>
                                    <div class="popup-details">
                                        ${properties['Rating'] ? `<div><strong>Rating</strong> ${properties['Rating']}</div>` : ''}
                                        ${properties['Review Count'] ? `<div><strong>Reviews</strong> ${properties['Review Count']}</div>` : ''}
                                        ${properties['Rooms'] ? `<div><strong>Bedrooms</strong> ${properties['Rooms']}</div>` : ''}
                                    </div>
                                </div>`;
    
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
    
            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(popupContent)
                .addTo(map);
        });
    
        map.on('mouseenter', 'dataset-layer', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
    
        map.on('mouseleave', 'dataset-layer', function () {
            map.getCanvas().style.cursor = '';
        });

// Feature Interaction
map.on('click', 'suburb-layer', function (e) {
    var coordinates = e.lngLat.toArray();
    var properties = e.features[0].properties;
    var geometry = e.features[0].geometry;


    map.flyTo({ center: coordinates });

    // // Get the bounding box of the feature
    // var bbox = turf.bbox(geometry);

    // // Fit the map to the bounds of the selected feature
    // map.fitBounds(bbox, {
    //     padding: 20, // Optional: Add padding around the feature
    //     maxZoom: 14  // Optional: Set a maximum zoom level
    // });

    // Show only the selected suburb in the choropleth layer
    map.setLayoutProperty('choropleth-layer', 'visibility', 'visible');
    map.setFilter('choropleth-layer', ['==', 'LOC_NAME', properties['Suburb_Name']]);
});

// Hide the choropleth layer if clicked outside the suburb layer
map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['suburb-layer'] });

    if (!features.length) {
        map.setLayoutProperty('choropleth-layer', 'visibility', 'none');
    }
});


// Hide the choropleth layer if clicked outside the suburb layer
map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['suburb-layer'] });

    if (!features.length) {
        map.setLayoutProperty('choropleth-layer', 'visibility', 'none');
    }
});


    map.on('mouseenter', 'suburb-layer', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'suburb-layer', function () {
        map.getCanvas().style.cursor = '';
    });

    return map;
}

export { initializeMap };
