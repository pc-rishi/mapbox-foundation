
//map box function
let cntr = ["152.42905811645483","-27.13675120820229"] 


// function mapBox(center){
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        // center:center,
        center:cntr,
        zoom:9
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
    
        // Add a layer to use the source
        function addLayer() {

        map.addLayer({
            'id': 'suburb-layer',
            'type': 'fill',
            'source': 'suburb-bound',
            'source-layer': 'my-layer', 
            'paint': {
                
                'fill-opacity':0.008,
                'fill-color':'#808080',
                'fill-outline-color':'#000000'
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
            'circle-stroke-color':'#00ABFF',
            'circle-stroke-width':1
          }
        });

        

    }

    map.on('click', 'dataset-layer', function (e) {
        // Assuming your tileset data includes properties you want to show in the popup
        var coordinates = e.features[0].geometry.coordinates.slice();
        var properties = e.features[0].properties; // Access all properties
    
        // After click position the point to the center
        map.flyTo({
            center: e.features[0].geometry.coordinates
        });
    
        // Extract the specific keys
        var name = properties['Name'];
        var rating = properties['Rating'];
        var reviewCount = properties['Review Count'];
        var suburb = properties['Suburb'];
        var rooms = properties['Rooms'];
    
        // Create the content for the popup
        var popupContent = '<div class="premium-popup">';
        popupContent += '<h3>' + name + '</h3>';
        popupContent += '<h4>' + suburb + '</h4>';
        popupContent += '<div class="popup-details">';
        if (rating) popupContent += '<div><strong>Rating</strong> ' + rating + '</div>';
        if (reviewCount) popupContent += '<div><strong>Reviews</strong> ' + reviewCount + '</div>';
        if (rooms) popupContent += '<div><strong>Bedrooms</strong> ' + rooms + '</div>';
        popupContent += '</div></div>';
    
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

        

        // Initialize and configure the chart
        const ctx = document.getElementById('chart').getContext('2d');
        const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
            {
                label: 'Occupancy',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            ],
        },
        options: {
        indexAxis: 'x',
        responsive: true,
        scales: {
            x: {
            display: false,
            title: {
                display: true,
                text: 'Occupancy',
            },
            },
            y: {
            display: false,
            title: {
                display: true,
                text: 'Month',
            },
            grid: {
                display: false,
            },
            },
        },
        plugins: {
            legend:{
            display:false
            },
            datalabels: {
            anchor: 'end',
            align: 'end',
            display: 'auto',
            font: {
                weight: 'bold',
            },
            },
        },
        },

        });

        // This is ADR chart configuration
        // Initialize and configure the chart
        const adr_ctx = document.getElementById('adr-chart').getContext('2d');
        const adr_chart = new Chart(adr_ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
            {
                label: 'ADR',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            ],
        },
        options: {
        indexAxis: 'x',
        responsive: true,
        scales: {
            x: {
            display: false,
            title: {
                display: true,
                text: 'ADR',
            },
            },
            y: {
            display: false,
            title: {
                display: true,
                text: 'Month',
            },
            grid: {
                display: false,
            },
            },
        },
        plugins: {
            legend:{
            display:false
            },
            datalabels: {
            anchor: 'end',
            align: 'end',
            display: 'auto',
            font: {
                weight: 'bold',
            },
            },
        },
        },

        });
  

        function updateChart(data) {
        // Extract the months and values from the filtered data
        const months = data.map((row) => row.month);
        const occupancy_val = data.map((row) => row.occupancy);
        const adr_val = data.map((row) => row.adr);

        const avgOccupancy = d3.mean(occupancy_val);

        const avgADR = d3.mean(adr_val);

        // Calculate the average of occupancy_val
        const totalOccupancy = occupancy_val.reduce((sum, value) => sum + value, 0);
        const averageOccupancy = (occupancy_val.length > 0) ? totalOccupancy / occupancy_val.length : 0;

        // Log the average occupancy
        console.log('Average Occupancy:', averageOccupancy.toFixed(2));

        // Update the chart with the new data
        chart.data.labels = months;
        chart.data.datasets[0].data = occupancy_val;
        chart.options.layout = {
            padding: {
            top: 10, // Adjust the value to move the chart lower
            right: 0,
            bottom: 0,
            left: 0
            }
        };

        // Update the ADR chart with the new data
        adr_chart.data.labels = months;
        adr_chart.data.datasets[0].data = adr_val;
        adr_chart.options.layout = {
            padding: {
            top: 10, // Adjust the value to move the chart lower
            right: 0,
            bottom: 0,
            left: 0
            }
        };

      
        const selectedSa3 = data[0].Suburb_Name; // Get the selected sa3 value from the first data point
        // Occupancy chart option update
        chart.options.plugins.title = {
            display: true,
            text: [" "," ","Occupancy"], // Set the selected sa3 value as the chart title
            position: 'top',
            font: {
            size: 15 // Adjust the value to increase or decrease the font size
            },
            color: '#333',
            padding: {
            top: 0,
            bottom: 10
            }
        };

        // Hide the legend
        chart.options.plugins.legend.display = false;

        chart.update();
        //

        //// ADR chart option update

        adr_chart.options.plugins.title = {
            display: true,
            text: [" "," ","Average Daily Rate"], // Set the selected sa3 value as the chart title
            position: 'top',
            font: {
            size: 15 // Adjust the value to increase or decrease the font size
            },
            color: '#333',
            padding: {
            top: 0,
            bottom: 10
            }
        };

        // Hide the legend
        adr_chart.options.plugins.legend.display = false;

        adr_chart.update();

        // Update the KPI display (Assuming you have a div with id 'kpi')
        d3.select("#kpi")
        .text(`Average Occupancy: ${avgOccupancy.toFixed(2)}%`);

        d3.select("#kpi2")
        .text(`Average Daily Rate: $${avgADR.toFixed(0)}`);

        document.getElementById('banner-title').textContent = selectedSa3;

        }

        // Fetch the CSV data
        fetch('https://raw.githubusercontent.com/pc-rishi/mapbox-foundation/main/data/Somerset_Suburbs_Accom.csv')
        .then((response) => response.text())
        .then((csvData) => {
        // Step 1: Parse the CSV data
        const parsedData = parseCSVData(csvData);

        // Update the chart with initial data for "All" SA3 when the "Total Spend" category is selected
        // const initialCategory = 'Total Spend';
        updateChart(
            parsedData.filter((row) => row.Suburb_Name === 'Laceys Creek')
        );

        // Click event listener for state-fills layer
        map.on('click', 'suburb-layer', (e) => {
            if (e.features.length > 0) {
            const sa3Value = e.features[0].properties['Suburb_Name'];
            // const selectedMerchantCategory = filterSelect.value;

            if (sa3Value === 'Laceys Creek') {
                // If 'All' SA3 is clicked, show data for 'All' SA3
                updateChart(
                parsedData.filter(
                    (row) => row.Suburb_Name === 'Laceys Creek' 
                )
                );
            } else {
                // Filter the CSV data based on the clicked SA3 value and the selected merchant category
                const filteredData = parsedData.filter(
                (row) => row.Suburb_Name === sa3Value 
                );
                updateChart(filteredData);
            }
            } else {
            // No feature is clicked, show data for "All" SA3
            // const selectedMerchantCategory = filterSelect.value;
            updateChart(
                parsedData.filter(
                (row) => row.Suburb_Name === 'Laceys Creek' 
                )
            );
            }
        });

        // Click event listener for the map (when no feature is clicked)
        map.on('click', (e) => {
            if (!map.queryRenderedFeatures(e.point, { layers: ['suburb-layer'] }).length) {
            // No feature is clicked, show data for "All" SA3
            // const selectedMerchantCategory = filterSelect.value;
            updateChart(
                parsedData.filter(
                (row) => row.Suburb_Name === 'Laceys Creek' 
                )
            );
            }
        });


        })


      
          






        function parseCSVData(csvData) {
        const parsedData = Papa.parse(csvData, { header: true }).data;
        return parsedData.map((row) => ({
        month: row['month'],
        occupancy: parseFloat(row['occupancy']),
        adr: parseFloat(row['adr']),
        Suburb_Name:row['Suburb_Name']
        }));
        }

        




      });



      //Switch Layer functionality
  
      function switchLayer(layer) {
        var layerId = layer.target.id;
        map.setStyle('mapbox://styles/mapbox/' + layerId);
      }
  
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].onclick = switchLayer;
      }


      
