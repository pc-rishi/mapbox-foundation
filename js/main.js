//map box function
let cntr = ["151.93506408854307","-27.551792016286708"] 


// function mapBox(center){
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        // center:center,
        center:cntr,
        zoom:8
    })

    //change map styles
    let layerList = document.getElementById('menu');
    let inputs = layerList.getElementsByTagName('input');

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


    //Add Scalebar    
    map.addControl(new mapboxgl.ScaleControl({
        maxWidth: 280,
        // unit: 'nautical'
    }));

    // map.boxZoom.disable();


    //Add geolocate
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions:{
            enableHighAccuracy:true
        },
        trackUserLocation:true
    }));

    function addSource() {    
    map.addSource('my-dataset', {
          type: 'vector',
          url: 'mapbox://rishi13.2us2np72' // Replace with your tileset ID
        });
    }
    
        // Add a layer to use the source
        function addLayer() {
        map.addLayer({
          'id': 'dataset-layer',
          'type': 'circle',
          'source': 'my-dataset',
          'source-layer': 'Snake_distribution_centroids-62mr48', // Replace with your source layer name
          'paint': {
            'circle-radius': 4,
            'circle-color': '#0078FF',
            'circle-stroke-color':'#00ABFF',
            'circle-stroke-width':2
          }
        });
    }

     // Add click event listener for popups
    map.on('click', 'dataset-layer', function (e) {
        // Assuming your tileset data includes properties you want to show in the popup
        var coordinates = e.features[0].geometry.coordinates.slice();
        var properties = e.features[0].properties; // Access all properties

       // After click position the point to the center
        map.flyTo({
            center: e.features[0].geometry.coordinates
        });
      

        var keysToDisplay = ['TID','Binomial', 'Group']; // Replace with your property keys

        // Create the content for the popup
        var popupContent = '<h3>Feature Details</h3>';
        keysToDisplay.forEach(function(key) {
            if (properties[key]) {
                popupContent += '<strong>' + key + ':</strong> ' + properties[key] + '<br>';
            }
        });

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(popupContent) // Set the popup content
            .addTo(map);

            
    });




            // Change the cursor to a pointer when over the dataset layer
    map.on('mouseenter', 'dataset-layer', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'dataset-layer', function () {
        map.getCanvas().style.cursor = '';
    });


      

      map.on('style.load', function() {
        addSource();
        addLayer();
      });
  
      function switchLayer(layer) {
        var layerId = layer.target.id;
        map.setStyle('mapbox://styles/mapbox/' + layerId);
      }
  
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].onclick = switchLayer;
      }



// }

// mapBox(cntr);



// A way to log the current location
navigator.geolocation.getCurrentPosition(position=>{
    console.log(position);
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    let center = [lng,lat];
    console.log(center);

    // mapBox(center);
})