// graphs.js

function initializeChart() {
    const ctx1 = document.getElementById('chart').getContext('2d');
    const chart1 = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Occupancy',
                    data: [],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(102, 153, 255, 1)',
                    borderWidth: 1,
                    cubicInterpolationMode: 'monotone',
                },
            ],
        },
        options: {
            indexAxis: 'x',
            responsive: true,
            scales: {
                x: { 
                    display: true,  
                    grid: { display: false }, 
                    title: { display: false },
                 },
                y: { display: false, title: { display: true, text: 'Month' }, grid: { display: false } },
            },
            plugins: {
                legend: { display: false },
                datalabels: { anchor: 'end', align: 'end', display: 'auto', font: { weight: 'bold' } },
            },
        },
    });

    const ctx2 = document.getElementById('chart2').getContext('2d');
    const chart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'ADR',
                    data: [],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                    cubicInterpolationMode: 'monotone',
                },
            ],
        },
        options: {
            indexAxis: 'x',
            responsive: true,
            scales: {
                x: { 
                    display: true,  
                    grid: { display: false }, 
                    title: { display: false },
                 },
                y: { display: false, title: { display: true, text: 'Month' }, grid: { display: false } },
            },
            plugins: {
                legend: { display: false },
                datalabels: { anchor: 'end', align: 'end', display: 'auto', font: { weight: 'bold' } },
            },
        },
    });

    const ctx3 = document.getElementById('chart3').getContext('2d');
    const chart3 = new Chart(ctx3, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'RW',
                    data: [],
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    cubicInterpolationMode: 'monotone',
                },
            ],
        },
        options: {
            indexAxis: 'x',
            responsive: true,
            scales: {
                x: { 
                    display: true,  
                    grid: { display: false }, 
                    title: { display: false },
                 },
                y: { display: false, title: { display: true, text: 'Month' }, grid: { display: false } },
            },
            plugins: {
                legend: { display: false },
                datalabels: { anchor: 'end', align: 'end', display: 'auto', font: { weight: 'bold' } },
            },
        },
    });

    const ctx4 = document.getElementById('chart4').getContext('2d');
    const chart4 = new Chart(ctx4, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'LoS',
                    data: [],
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(255, 153, 153, 1)',
                    borderWidth: 1,
                    cubicInterpolationMode: 'monotone',
                },
            ],
        },
        options: {
            indexAxis: 'x',
            responsive: true,
            scales: {
                x: { 
                    display: true,  
                    grid: { display: false }, 
                    title: { display: false },
                 },
                y: { display: false, title: { display: true, text: 'Month' }, grid: { display: false } },
            },
            plugins: {
                legend: { display: false },
                datalabels: { anchor: 'end', align: 'end', display: 'auto', font: { weight: 'bold' } },
            },
        },
    });


    const ctx5 = document.getElementById('chart5').getContext('2d');
    const chart5 = new Chart(ctx5, {
        type: 'doughnut',
        data: {
            labels: [], // Your labels
            datasets: [
                {
                    label: 'Listings by Property',
                    data: [], // Your data
                    backgroundColor: ctx => {
                        const defaultColors = [
                            'rgba(255, 99, 132, 0.6)',  // Red
                            'rgba(54, 162, 235, 0.6)',  // Blue
                            'rgba(255, 206, 86, 0.6)',  // Yellow
                            'rgba(75, 192, 192, 0.6)',  // Teal
                            'rgba(153, 102, 255, 0.6)', // Purple
                            'rgba(255, 159, 64, 0.6)'   // Orange
                        ];
                        return defaultColors[ctx.dataIndex % defaultColors.length];
                    },
                    borderColor: 'rgba(255, 153, 153, 0.2)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            cutout: '80%',
            plugins: {
                legend: {
                    display: true,
                    position: 'right', // Position legend to the right of the chart
                    labels: {
                        boxWidth: 10,  // Smaller box size
                        boxHeight: 10, // Ensure shape is circular
                        padding: 15,   // Space between legend items
                        usePointStyle: true, // Use circle shape for legend items
                        font: {
                            size: 12, // Adjust font size
                            weight: 'bold'
                        }
                    }
                },
                datalabels: {
                    anchor: 'end',
                    align: 'end',
                    display: 'auto',
                    font: {
                        weight: 'bold'
                    }
                }
            }
        }
    });


    const ctx6 = document.getElementById('chart6').getContext('2d');
    const chart6 = new Chart(ctx6, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Listings by Rooms',
                    data: [],
                    backgroundColor: ctx => {
                        const defaultColors = [
                            'rgba(255, 99, 132, 0.6)', // Red with 60% opacity
                            'rgba(54, 162, 235, 0.6)', // Blue with 60% opacity
                            'rgba(255, 206, 86, 0.6)', // Yellow with 60% opacity
                            'rgba(75, 192, 192, 0.6)', // Teal with 60% opacity
                            'rgba(153, 102, 255, 0.6)', // Purple with 60% opacity
                            'rgba(255, 159, 64, 0.6)'   // Orange with 60% opacity
                        ]; 
                        return defaultColors[ctx.dataIndex % defaultColors.length];
                    },
                    borderColor: 'rgba(255, 153, 153, 0.2)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            indexAxis: 'x',
            responsive: true,
            cutout: '80%',
            plugins: {
                legend: {
                    display: true,
                    position: 'right', // Position legend to the right of the chart
                    labels: {
                        boxWidth: 10,  // Smaller box size
                        boxHeight: 10, // Ensure shape is circular
                        padding: 15,   // Space between legend items
                        usePointStyle: true, // Use circle shape for legend items
                        font: {
                            size: 12, // Adjust font size
                            weight: 'bold'
                        }
                    }
                },
                datalabels: { anchor: 'end', align: 'end', display: 'auto', font: { weight: 'bold' } },
            },
        },
    });

    // const ctx7 = document.getElementById('chart7').getContext('2d');
    // const chart7 = new Chart(ctx7, {
    //     type: 'doughnut',
    //     data: {
    //         labels: [],
    //         datasets: [
    //             {
    //                 label: 'Listings by Reviews',
    //                 data: [],
    //                 backgroundColor: ctx => {
    //                     const defaultColors = [
    //                         'rgba(255, 99, 132, 0.6)', // Red with 60% opacity
    //                         'rgba(54, 162, 235, 0.6)', // Blue with 60% opacity
    //                         'rgba(255, 206, 86, 0.6)', // Yellow with 60% opacity
    //                         'rgba(75, 192, 192, 0.6)', // Teal with 60% opacity
    //                         'rgba(153, 102, 255, 0.6)', // Purple with 60% opacity
    //                         'rgba(255, 159, 64, 0.6)'   // Orange with 60% opacity
    //                     ]; 
    //                     return defaultColors[ctx.dataIndex % defaultColors.length];
    //                 },
    //                 borderColor: 'rgba(255, 153, 153, 0.2)',
    //                 borderWidth: 1,
    //             },
    //         ],
    //     },
    //     options: {
    //         indexAxis: 'x',
    //         responsive: true,
    //         cutout: '80%',
    //         plugins: {
    //             legend: {
    //                 display: true,
    //                 position: 'right', // Position legend to the right of the chart
    //                 labels: {
    //                     boxWidth: 10,  // Smaller box size
    //                     boxHeight: 10, // Ensure shape is circular
    //                     padding: 15,   // Space between legend items
    //                     usePointStyle: true, // Use circle shape for legend items
    //                     font: {
    //                         size: 12, // Adjust font size
    //                         weight: 'bold'
    //                     }
    //                 }
    //             },
    //             datalabels: { anchor: 'end', align: 'end', display: 'auto', font: { weight: 'bold' } },
    //         },
    //     },
    // });

    return { chart1, chart2, chart3, chart4, chart5, chart6}; // Return both chart instances to be used later
}

function updateChart(charts, data) {
    const months = data.map(row => row.month);
    const occupancy_val = data.map(row => row.occupancy);
    const adr_val = data.map(row => row.adr);
    const rw_val = data.map(row => row.res_win);
    const los_val = data.map(row => row.los);
    const avgOccupancy = d3.mean(occupancy_val);
    const avgADR = d3.mean(adr_val);
    const avgRW = d3.mean(rw_val);
    const avgLoS = d3.mean(los_val);



    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


    function sortLabelsAndData(labels, ...dataSets) {
        const sortedIndices = labels
            .map((label, index) => ({ label, index }))
            .sort((a, b) => monthOrder.indexOf(a.label) - monthOrder.indexOf(b.label))
            .map(({ index }) => index);
    
        const sortedLabels = sortedIndices.map(index => labels[index]);
        const sortedDataSets = dataSets.map(dataSet =>
            sortedIndices.map(index => dataSet[index])
        );
    
        return [sortedLabels, ...sortedDataSets];
    }

    // Sort labels and their corresponding data together
    const [sortedMonths, sortedOccupancy, sortedADR, sortedRW, sortedLoS] =
        sortLabelsAndData(months, occupancy_val, adr_val, rw_val, los_val);

    



    // Update the first chart (Occupancy)
    charts.chart1.data.labels = sortedMonths;
    charts.chart1.data.datasets[0].data = sortedOccupancy;

    charts.chart1.options.layout = {
        padding: { top: 10, right: 0, bottom: 0, left: 0 }
    };

    charts.chart1.options.plugins.title = {
        display: true,
        text: [" ", " ", "Occupancy"],
        position: 'top',
        font: { size: 15 },
        color: '#333',
        padding: { top: 0, bottom: 10 }
    };

    charts.chart1.update();

    // Update the second chart (ADR)
    charts.chart2.data.labels = sortedMonths;
    charts.chart2.data.datasets[0].data = sortedADR;

    charts.chart2.options.layout = {
        padding: { top: 10, right: 0, bottom: 0, left: 0 }
    };

    charts.chart2.options.plugins.title = {
        display: true,
        text: [" ", " ", "Average Daily Rate"],
        position: 'top',
        font: { size: 15 },
        color: '#333',
        padding: { top: 0, bottom: 10 }
    };

    charts.chart2.update();

    // Update the third chart (RW)
    charts.chart3.data.labels = sortedMonths;
    charts.chart3.data.datasets[0].data = sortedRW;

    charts.chart3.options.layout = {
        padding: { top: 10, right: 0, bottom: 0, left: 0 }
    };

    charts.chart3.options.plugins.title = {
        display: true,
        text: [" ", " ", "Reservation Window"],
        position: 'top',
        font: { size: 15 },
        color: '#333',
        padding: { top: 0, bottom: 10 }
    };

    charts.chart3.update();

    // Update the fourth chart (LoS)
    charts.chart4.data.labels = sortedMonths;
    charts.chart4.data.datasets[0].data = sortedLoS;

    charts.chart4.options.layout = {
        padding: { top: 10, right: 0, bottom: 0, left: 0 }
    };

    charts.chart4.options.plugins.title = {
        display: true,
        text: [" ", " ", "Length of Stay"],
        position: 'top',
        font: { size: 15 },
        color: '#333',
        padding: { top: 0, bottom: 10 }
    };

    charts.chart4.update();

    d3.select("#kpi").html(`
        <div class="kpi-title">Average Occupancy</div>
        <div class="kpi-value">${avgOccupancy.toFixed(0)}%</div>
    `);
    d3.select("#kpi2").html(`
        <div class="kpi-title">Average Daily Rate</div>
        <div class="kpi-value">$${avgADR.toFixed(0)}</div>
    `);
    d3.select("#kpi3").html(`
        <div class="kpi-title">Reservation Window</div>
        <div class="kpi-value">${avgRW.toFixed(0)}</div>
    `);
    d3.select("#kpi4").html(`
        <div class="kpi-title">Length of Stay</div>
        <div class="kpi-value">${avgLoS.toFixed(2)}</div>
    `);

        
    // document.getElementById('banner-title').textContent = data[0].Suburb_Name;

    // Update the Market Overview title
    document.getElementById('Section-title').textContent = `Market Overview: ${data[0].Suburb_Name}`;
}

function updateChart2(charts, data) {
    const columnNames = ['Alternative_Lodging', 'Hotels_Motels', 'Outdoor_Camping', 'Vacation_Rentals','Others']; // Replace with actual column names
    const labels = [];
    const listingValues = [];

    const reviews = data.map(row => row.Reviews);
    const avgRev = d3.sum(reviews);
    const rating = data.map(row => row.Rating);
    const avgRat = d3.mean(rating);
    const rooms = data.map(row => row.Rooms);
    const avgRoo = d3.sum(rooms);
    const avgCap = avgRoo*2


    

    // Iterate through the column names and extract data
    columnNames.forEach(column => {
        labels.push(column); // Use the column name as the label
        
        // Sum the occupancy values across the data for the given column
        let columnSum = 0;
        data.forEach(row => {
            columnSum += parseFloat(row[column]) || 0; // Safeguard against non-numeric values
        });
        listingValues.push(columnSum); // Add the summed value to the data array
    });

    const columnNames2 = ['One_bedroom','Two_bedroom','Three_bedroom','Four_bedroom','More_than_Five_bedroom','Room_info_unvailable']; // Replace with actual column names
    const labels2 = [];
    const listingValues2 = [];

    // Iterate through the column names and extract data
    columnNames2.forEach(column => {
        labels2.push(column); // Use the column name as the label
        
        // Sum the occupancy values across the data for the given column
        let columnSum = 0;
        data.forEach(row => {
            columnSum += parseFloat(row[column]) || 0; // Safeguard against non-numeric values
        });
        listingValues2.push(columnSum); // Add the summed value to the data array
    });

    const columnNames3 = ['Less_than_10', 'Between_11_to_30', 'Between_30_to_100', 'Between_100_to_500', 'More_than_100']; // Replace with actual column names
    const labels3 = [];
    const listingValues3 = [];

    // Iterate through the column names and extract data
    columnNames3.forEach(column => {
        labels3.push(column); // Use the column name as the label
        
        // Sum the occupancy values across the data for the given column
        let columnSum = 0;
        data.forEach(row => {
            columnSum += parseFloat(row[column]) || 0; // Safeguard against non-numeric values
        });
        listingValues3.push(columnSum); // Add the summed value to the data array
    });


    // Update the chart with the new data
    charts.chart5.data.labels = labels;
    charts.chart5.data.datasets[0].data = listingValues;
    
    charts.chart5.options.layout = {
        padding: {
            top: 10, // Adjust the value to move the chart lower
            right: 0,
            bottom: 0,
            left: 0
        }
    };

    const selectedSa3 = data[0].Suburb_Name; // Get the selected SA3 value from the first data point

    // Update chart title with selected SA3
    charts.chart5.options.plugins.title = {
        display: true,
        text: ["Lisitings by Type"], // Set the selected SA3 value as the chart title
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
    charts.chart5.options.plugins.legend.display = true;

    charts.chart5.update();


    // Update the chart with the new data
    charts.chart6.data.labels = labels2;
    charts.chart6.data.datasets[0].data = listingValues2;
    
    charts.chart6.options.layout = {
        padding: {
            top: 10, // Adjust the value to move the chart lower
            right: 0,
            bottom: 0,
            left: 0
        }
    };

    

    // Update chart title with selected SA3
    charts.chart6.options.plugins.title = {
        display: true,
        text: ["Lisitings by Rooms"], // Set the selected SA3 value as the chart title
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
    charts.chart6.options.plugins.legend.display = true;

    charts.chart6.update();



    // // Update the chart with the new data
    // charts.chart7.data.labels = labels3;
    // charts.chart7.data.datasets[0].data = listingValues3;
    
    // charts.chart7.options.layout = {
    //     padding: {
    //         top: 10, // Adjust the value to move the chart lower
    //         right: 0,
    //         bottom: 0,
    //         left: 0
    //     }
    // };

    

    // // Update chart title with selected SA3
    // charts.chart7.options.plugins.title = {
    //     display: true,
    //     text: ["Lisitings by Reviews"], // Set the selected SA3 value as the chart title
    //     position: 'top',
    //     font: {
    //         size: 15 // Adjust the value to increase or decrease the font size
    //     },
    //     color: '#333',
    //     padding: {
    //         top: 0,
    //         bottom: 10
    //     }
    // };

    // // Hide the legend
    // charts.chart7.options.plugins.legend.display = true;

    // charts.chart7.update();

    d3.select("#kpi6").html(`
        <div class="kpi-title">Rating</div>
        <div class="kpi-value">${avgRat.toFixed(2)}</div>
    `);
    d3.select("#kpi5").html(`
        <div class="kpi-title">Reviews</div>
        <div class="kpi-value">${avgRev}</div>
    `);
    d3.select("#kpi7").html(`
        <div class="kpi-title">Rooms</div>
        <div class="kpi-value">${avgRoo}</div>
    `);
    d3.select("#kpi8").html(`
        <div class="kpi-title">Capacity</div>
        <div class="kpi-value">${avgCap}</div>
    `);

    // document.getElementById('banner-title').textContent = data[0].Suburb_Name;

    // Update the Market Overview title
    document.getElementById('Section-title2').textContent = `Market Performance: ${data[0].Suburb_Name}`;



    
}

// Export functions for external use
export { initializeChart, updateChart, updateChart2 };
