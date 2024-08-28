// map.js

let cntr = ["152.42905811645483", "-27.13675120820229"];

function initializeMap() {
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: cntr,
        zoom: 9
    });

    //Search
    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            marker:{
                color:'green'
            }
        })
    );

    // add fullscreen button
    map.addControl(new mapboxgl.FullscreenControl());

    //Add zoom
    map.addControl(new mapboxgl.NavigationControl());

    //Add geolocate
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions:{
            enableHighAccuracy:true
        },
        trackUserLocation:true
    }));

    // Add Scale bar    
    map.addControl(new mapboxgl.ScaleControl({
        maxWidth: 280,
    }));

    // Source and Layer Functions
    function addSource() {
        map.addSource('my-dataset', {
            type: 'vector',
            url: 'mapbox://rishi13.ao5gc0ra'
        });

        map.addSource('suburb-bound', {
            type: 'vector',
            url: 'mapbox://rishi13.kryptonite'
        });

        map.addSource('lga-bound', {
            type: 'vector',
            url: 'mapbox://rishi13.3f21sqvz'
        });
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
            'id': 'dataset-layer',
            'type': 'circle',
            'source': 'my-dataset',
            'source-layer': 'Somerset_Audit_geocode-8tnjtg',
            'paint': {
                'circle-radius': 2.8,
                'circle-color': '#0078FF',
                'circle-stroke-color': '#00ABFF',
                'circle-stroke-width': 1
            }
        });
    }

    map.on('style.load', function () {
        addSource();
        addLayer();
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

    

    
//change map styles
let layerList = document.getElementById('menu');
let inputs = layerList.getElementsByTagName('input');

      //Switch Layer functionality
  
      function switchLayer(layer) {
        var layerId = layer.target.id;
        map.setStyle('mapbox://styles/mapbox/' + layerId);
      }
  
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].onclick = switchLayer;
      }
  
      return map; // Return the map instance to be used later
}

// Export the function for external use
export { initializeMap };
