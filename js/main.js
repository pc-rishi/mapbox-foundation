// main.js

import { initializeMap } from './map.js';
import { initializeChart, updateChart, updateChart2 } from './graphs.js';

document.addEventListener('DOMContentLoaded', function () {

    
    const map = initializeMap();
    const chart = initializeChart();
    

    fetch('https://raw.githubusercontent.com/pc-rishi/mapbox-foundation/main/data/Somerset_Suburbs_Accom.csv')
    .then(response => response.text())
    .then(csvData => {
        const parsedData = parseCSVData(csvData);

        updateChart(chart, parsedData.filter(row => row['Suburb_Name'] === 'All'));

        map.on('click', 'suburb-layer', (e) => {
            if (e.features.length > 0) {
                const sa3Value = e.features[0].properties['Suburb_Name'];
                const filteredData = parsedData.filter(row => row.Suburb_Name === sa3Value);
                updateChart(chart, filteredData);
            } else {
                updateChart(chart, parsedData.filter(row => row.Suburb_Name === 'All'));
            }
        });

        map.on('click', (e) => {
            if (!map.queryRenderedFeatures(e.point, { layers: ['suburb-layer'] }).length) {
                updateChart(chart, parsedData.filter(row => row.Suburb_Name === 'All'));
            }
        });
    });
        // Fetch and parse the second CSV data, then update the second chart based on map interaction
    fetch('https://raw.githubusercontent.com/pc-rishi/mapbox-foundation/main/data/Somerset_Suburb_Audit_Agg.csv')
        .then(response => response.text())
        .then(csvData => {
            const parsedData2 = parseCSVData2(csvData); // Adjust parsing for second dataset

            updateChart2(chart, parsedData2.filter(row => row['Suburb_Name'] === 'All'));

            map.on('click', 'suburb-layer', (e) => {
                if (e.features.length > 0) {
                    const sa3Value = e.features[0].properties['Suburb_Name'];
                    const filteredData2 = parsedData2.filter(row => row.Suburb_Name === sa3Value);
                    updateChart2(chart, filteredData2);
                } else {
                    updateChart2(chart, parsedData2.filter(row => row.Suburb_Name === 'All'));
                }
            });

            map.on('click', (e) => {
                if (!map.queryRenderedFeatures(e.point, { layers: ['suburb-layer'] }).length) {
                    updateChart2(chart, parsedData2.filter(row => row.Suburb_Name === 'All'));
                }
            });
        });    
});

function parseCSVData(csvData) {
    const parsedData = Papa.parse(csvData, { header: true }).data;
    return parsedData.map(row => ({
        month: row['month'],
        occupancy: parseFloat(row['occupancy']),
        adr: parseFloat(row['adr']),
        res_win:parseFloat(row['res_win']),
        los:parseFloat(row['los']),
        Suburb_Name: row['Suburb_Name']
    }));
}


function parseCSVData2(csvData) {
    const parsedData = Papa.parse(csvData, { header: true }).data;
    return parsedData.map(row => ({
        Alternative_Lodging: parseFloat(row['Alternative Lodging']),
        Hotels_Motels: parseFloat(row['Hotels & Motels']),
        Outdoor_Camping: parseFloat(row['Outdoor & Camping']),
        Vacation_Rentals: parseFloat(row['Vacation Rentals']),
        Others: parseFloat(row['Other']),
        One_bedroom: parseFloat(row['1 Bedroom']),
        Two_bedroom: parseFloat(row['2 Bedroom']),
        Three_bedroom: parseFloat(row['3 Bedroom']),
        Four_bedroom: parseFloat(row['4 Bedroom']),
        More_than_Five_bedroom: parseFloat(row['5+ Bedroom']),
        Room_info_unvailable: parseFloat(row['Not available']),
        More_than_100:parseFloat(row['500+ Reviews']),
        Between_100_to_500:parseFloat(row['101 - 500 Reviews']),
        Between_30_to_100:parseFloat(row['31 - 100 Reviews']),
        Between_11_to_30:parseFloat(row['11 - 30 Reviews']),
        Less_than_10:parseFloat(row['0 - 10 Reviews']),
        Suburb_Name: row['Suburb Name']
    }));
}


