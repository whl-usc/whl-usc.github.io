// Load the template.html for header, navbar, footer.
function loadTemplate() {
    fetch('template.html')
        .then(response => response.text())
        .then(data => {
            const container = document.createElement('div');
            container.innerHTML = data;

            // Insert header, navigation, and footer into appropriate containers
            // document.getElementById('header-container').innerHTML = container.querySelector('header').outerHTML;
            document.getElementById('navigation-container').innerHTML = container.querySelector('nav').outerHTML;
            document.getElementById('footer-container').innerHTML = container.querySelector('footer').outerHTML;
        })
        .catch(error => console.error('Error loading template:', error));
}
document.addEventListener('DOMContentLoaded', loadTemplate);

// // Dynamically updates the table based on the datasets.
// document.addEventListener("DOMContentLoaded", function () {
//     const data = [
//         {
//             name: "HS-HeLa_Amo-1_T4-24h_exo-0h",
//             links: {
//                 pri_crssant: "https://Documents/CRIS/data/PARIS/PARIS1/HS-HEK293T_AMT-0.5_T4-24h_exo-0h/HS-HEK293T_AMT-0.5_T4-24h_exo-0h_pri_crssant.bam?csf=1&web=1&e=YzEpYc",
//                 prigap1: "https://example.com/path/to/prigap1.bam",
//                 prigap1_filtered: "https://example.com/path/to/prigap1_filtered.bam",
//                 prigapm: "https://example.com/path/to/prigapm.bam",
//                 prigapm_filtered: "https://example.com/path/to/prigapm_filtered.bam",
//                 prihomo: "https://example.com/path/to/prihomo.bam",
//                 pritrans: "https://example.com/path/to/pritrans.bam",
//                 gaplen: "https://example.com/path/to/gaplen.bam",
//                 seglen: "https://example.com/path/to/seglen.bam",
//                 fastqc: "https://example.com/path/to/fastqc.html",
//             }
//         },
//         {
//             name: "HS-HeLa_Amo-1_T4-24h_exo-2h",
//             links: {
//                 pri_crssant: "https://Documents/CRIS/data/PARIS/PARIS1/HS-HEK293T_AMT-0.5_T4-24h_exo-0h/HS-HEK293T_AMT-0.5_T4-24h_exo-0h_pri_crssant.bam?csf=1&web=1&e=YzEpYc",
//                 prigap1: "https://example.com/path/to/prigap1.bam",
//                 prigap1_filtered: "https://example.com/path/to/prigap1_filtered.bam",
//                 prigapm: "https://example.com/path/to/prigapm.bam",
//                 prigapm_filtered: "https://example.com/path/to/prigapm_filtered.bam",
//                 prihomo: "https://example.com/path/to/prihomo.bam",
//                 pritrans: "https://example.com/path/to/pritrans.bam",
//                 gaplen: "https://example.com/path/to/gaplen.bam",
//                 seglen: "https://example.com/path/to/seglen.bam",
//                 fastqc: "https://example.com/path/to/fastqc.html",
//             }
//         },
//         {
//             name: "HS-HeLa_Amo-1_T4-24h_exo-12h",
//             links: {
//                 pri_crssant: "test",
//                 prigap1: "test",
//                 prigap1_filtered: "test",
//                 prigapm: "test",
//                 prigapm_filtered: "test",
//                 prihomo: "test",
//                 pritrans: "test",
//                 gaplen: "test",
//                 seglen: "test",
//                 fastqc: "https://example.com/path/to/fastqc.html",
//             }
//         },
//         // Add more dataset objects here
//     ];

//     const tableBody = document.getElementById("tableBody");

//     function populateTable() {
//         data.forEach(dataset => {
//             const row = document.createElement("tr");

//             // Add the dataset name
//             const datasetCell = document.createElement("td");
//             datasetCell.textContent = dataset.name;
//             row.appendChild(datasetCell);

//             // Add the links
//             Object.keys(dataset.links).forEach(key => {
//                 const cell = document.createElement("td");
//                 const link = document.createElement("a");
//                 link.href = dataset.links[key];
//                 link.download = `${dataset.name}_${key}.bam`;
//                 link.target = "_blank";
//                 link.innerHTML = '<i class="bi bi-download"></i>'; // Replace with your desired text/icon
//                 cell.appendChild(link);
//                 row.appendChild(cell);
//             });

//             tableBody.appendChild(row);
//         });
//     }

//     // Initialize table
//     populateTable();
// });

// JavaScript to fetch DATASETS.CSV file
fetch('https://raw.githubusercontent.com/whl-usc/whl-usc.github.io/refs/heads/main/cris/csv/datasets.csv') // Use the raw file URL
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.text();
    })
    .then(csvText => {
        const rows = csvText.trim().split("\n");
        const tableBody = document.querySelector('#data-table tbody');

        rows.forEach((row, index) => {
            if (index === 0) return; // Skip header row

            const cols = row.split(",");
            if (cols.length === 11) {
                const tr = document.createElement('tr');
                cols.forEach(col => {
                    const td = document.createElement('td');
                    
                    // Check if the cell content is a URL
                    if (col.startsWith("http://") || col.startsWith("https://")) {
                        const icon = document.createElement('a');
                        icon.href = col;
                        icon.target = "_blank";
                        icon.innerHTML = "&#128190;"; // Unicode for download icon (💾)
                        td.appendChild(icon);
                    } else {
                        td.textContent = col;
                    }

                    tr.appendChild(td);
                });

                tableBody.appendChild(tr);
            }
        });
    })
    .catch(error => console.error("Error loading CSV:", error));

// JavaScript to fetch REFERENCES.CSV file
fetch('https://raw.githubusercontent.com/whl-usc/whl-usc.github.io/refs/heads/main/cris/csv/reference_genomes.csv') // Use the raw CSV URL
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.text();
    })
    .then(csvText => {
        const rows = csvText.trim().split("\n").slice(1); // Remove header row
        const tableBodies = {
            normal: document.querySelector('#normal-table tbody'),
            curated: document.querySelector('#curated-table tbody'),
            special: document.querySelector('#special-table tbody')
        };

        rows.forEach(row => {
            const cols = row.split(",");

            // Extract columns for each table
            const [normalName, normalLink, curatedName, curatedLink, specialName, specialLink] = cols;

            // Helper function to create and append a row
            const appendRow = (tableBody, name, link) => {
                const tr = document.createElement('tr');

                // Name cell
                const nameCell = document.createElement('td');
                nameCell.textContent = name || "N/A";
                tr.appendChild(nameCell);

                // Link cell
                const linkCell = document.createElement('td');
                if (link && (link.startsWith("http://") || link.startsWith("https://"))) {
                    const anchor = document.createElement('a');
                    anchor.href = link;
                    anchor.target = "_blank";
                    anchor.innerHTML = "&#128190;"; // Unicode for download icon
                    linkCell.appendChild(anchor);
                } else {
                    linkCell.textContent = "N/A";
                }
                tr.appendChild(linkCell);

                tableBody.appendChild(tr);
            };

            // Add rows to respective tables
            if (normalName || normalLink) appendRow(tableBodies.normal, normalName, normalLink);
            if (curatedName || curatedLink) appendRow(tableBodies.curated, curatedName, curatedLink);
            if (specialName || specialLink) appendRow(tableBodies.special, specialName, specialLink);
        });
    })
    .catch(error => console.error("Error loading CSV:", error));

// JavaScript to fetch STATISTICS..CSV file
const csvFiles = [
    { name: 'PARIS1', link: 'https://raw.githubusercontent.com/whl-usc/whl-usc.github.io/refs/heads/main/cris/csv/stats/PARIS1.csv' },
    { name: 'PARIS-exo', link: 'https://raw.githubusercontent.com/whl-usc/whl-usc.github.io/refs/heads/main/cris/csv/stats/PARIS-exo.csv' },
    { name: 'PARIS2', link: 'https://raw.githubusercontent.com/whl-usc/whl-usc.github.io/refs/heads/main/cris/csv/stats/PARIS2.csv' },
    { name: 'SHARC-exo', link: 'https://raw.githubusercontent.com/whl-usc/whl-usc.github.io/refs/heads/main/cris/csv/stats/SHARC-exo.csv' },
    { name: 'SHARC-in_vitro', link: 'https://raw.githubusercontent.com/whl-usc/whl-usc.github.io/refs/heads/main/cris/csv/stats/SHARC-in_vitro.csv' }
];

document.addEventListener('DOMContentLoaded', () => {
    const studyNameSelect = document.getElementById('study-name');
    const datasetSelects = [
        document.getElementById('dataset1'),
        document.getElementById('dataset2'),
        document.getElementById('dataset3'),
        document.getElementById('dataset4')
    ];
    const table = document.getElementById('stats-table');
    const clearButton = document.getElementById('clear-btn');
    let currentData = [];
    const columnDataMap = {}; // Maps selected column to dataset column data
    const selectedColumns = new Set(); // Tracks selected columns to prevent duplicates

    // Populate Study Name dropdown
    const defaultOption = document.createElement('option');
    studyNameSelect.appendChild(defaultOption);

    csvFiles.forEach(file => {
        const option = document.createElement('option');
        option.value = file.link;
        option.textContent = file.name;
        studyNameSelect.appendChild(option);
    });

    // Event listener for Study Name change
    studyNameSelect.addEventListener('change', () => {
        const studyNameLink = studyNameSelect.value;
        if (!studyNameLink) return;

        fetch(studyNameLink)
            .then(response => response.text())
            .then(data => {
                currentData = preprocessData(parseCSV(data));
                populateDatasetSelects(currentData);
            });
    });

    // Populate dataset dropdowns
    function populateDatasetSelects(data) {
        datasetSelects.forEach(select => {
            select.innerHTML = ''; // Reset options

            // Add default "Select a dataset" option
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Select a dataset';
            select.appendChild(defaultOption);

            const categories = Object.keys(data[0]).filter(key => key !== 'Metrics');
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                select.appendChild(option);
            });
        });
    }

    // Event listener for dataset selection
    datasetSelects.forEach((select, index) => {
        select.addEventListener('change', () => {
            const selectedColumn = select.value;
            if (!selectedColumn) return;

            // Prevent selection of identical columns
            if (selectedColumns.has(selectedColumn)) {
                alert('This dataset has already been selected!');
                select.value = ''; // Reset the dropdown selection
                return;
            }

            // Add column to selected columns set
            selectedColumns.add(selectedColumn);

            // Store column data
            columnDataMap[selectedColumn] = extractColumnData(currentData, selectedColumn);
            updateTable(index + 1, selectedColumn, columnDataMap[selectedColumn]);
        });
    });

    // Clear specific dataset column
    datasetSelects.forEach((select, index) => {
        const clearDatasetButton = document.getElementById(`clear-dataset${index + 1}`);
        clearDatasetButton.addEventListener('click', () => {
            const selectedColumn = select.value;
            if (selectedColumn) {
                // Remove the column from the set
                selectedColumns.delete(selectedColumn);

                // Reset the dropdown for this dataset
                select.value = '';

                // Remove the column from the table
                const rows = table.querySelectorAll('tr');
                rows.forEach(row => {
                    row.children[index + 1]?.remove();
                });

                // Ensure table header also reflects the change
                const headerRow = table.querySelector('thead tr');
                if (headerRow) {
                    const headerCell = headerRow.children[index + 1];
                    if (headerCell) {
                        headerRow.removeChild(headerCell);
                    }
                }
            }
        });
    });

    // Clear all button (implements a full reset for study selection)
    const clearAllButton = document.getElementById('clear-all');
    clearAllButton.addEventListener('click', () => {
        // Clear the study name and dataset selections
        studyNameSelect.value = '';
        datasetSelects.forEach(select => {
            select.value = '';
        });
        clearTable();
        
        // Reset column data map and selected columns
        Object.keys(columnDataMap).forEach(column => {
            delete columnDataMap[column]; // Remove the column from the map
        });
        selectedColumns.clear(); // Clear the set of selected columns
    });

    // Parse CSV into array of objects
    function parseCSV(data) {
        const rows = data.split('\n').map(row => row.split(','));
        const headers = rows[0];
        return rows.slice(1).map(row => Object.fromEntries(headers.map((h, i) => [h.trim(), row[i]?.trim()]))); 
    }

    // Preprocess data to ensure Metrics is the first column
    function preprocessData(data) {
        return data.map(row => {
            const reordered = { Metrics: row.Metrics };
            Object.keys(row).forEach(key => {
                if (key !== 'Metrics') reordered[key] = row[key];
            });
            return reordered;
        });
    }

    // Extract specific dataset column
    function extractColumnData(data, column) {
        return data.map(row => {
            const value = row[column];
            
            // Ensure the value is a string and remove ".0" for integer-like values
            const valueStr = String(value);
            const cleanedValue = valueStr.endsWith('.0') ? parseInt(valueStr) : value;
            
            return { Metrics: row.Metrics, [column]: cleanedValue };
        });
    }

    // Update table
    function updateTable(columnIndex, columnName, columnData) {
        const thead = table.querySelector('thead');
        const tbody = table.querySelector('tbody');

        // Update table headers
        if (thead.innerHTML === '') {
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = '<th>Metrics</th>';
            thead.appendChild(headerRow);
        }
        const headerRow = thead.querySelector('tr');
        const existingHeaders = Array.from(headerRow.children).map(th => th.textContent);

        if (!existingHeaders.includes(columnName)) {
            // If column doesn't exist, add it
            if (headerRow.children[columnIndex]) {
                headerRow.children[columnIndex].textContent = columnName;
            } else {
                const newHeaderCell = document.createElement('th');
                newHeaderCell.textContent = columnName;
                headerRow.appendChild(newHeaderCell);
            }
        }

        // Update table rows
        columnData.forEach((row, index) => {
            let tableRow = tbody.children[index];
            if (!tableRow) {
                // Create new row if it doesn't exist
                tableRow = document.createElement('tr');
                const metricsCell = document.createElement('td');
                metricsCell.textContent = row.Metrics;
                tableRow.appendChild(metricsCell);
                tbody.appendChild(tableRow);
            }

            // Update or add cell for the column
            const cell = tableRow.children[columnIndex];
            if (cell) {
                cell.textContent = row[columnName];
            } else {
                const newCell = document.createElement('td');
                newCell.textContent = row[columnName];
                tableRow.appendChild(newCell);
            }
        });
    }

    // Clear table
    function clearTable() {
        table.querySelector('thead').innerHTML = '';
        table.querySelector('tbody').innerHTML = '';
    }
});

// Add IGV embed into the webpage.
document.addEventListener("DOMContentLoaded", function() {
    const igvContainer = document.getElementById("igv-container");
    const fileInput = document.getElementById("fileInput");
    const fileNameDisplay = document.getElementById("fileName");
    const igvOptions = {
        genome: "hg38", // Change to desired genome
        locus: "chr1:155,000,000-156,000,000", // Optional initial locus
        tracks: []
    };

    let igvBrowser;

    // Create the IGV browser
    igv.createBrowser(igvContainer, igvOptions).then(function(browser) {
        igvBrowser = browser;
        console.log("IGV Browser created");
    });

    // Handle file input change
    fileInput.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (!file) {
            fileNameDisplay.textContent = "No file chosen";
            return;
        }

        // Display the selected file name
        fileNameDisplay.textContent = `Selected file: ${file.name}`;

        // Create a URL for the file and prepare the track
        const url = URL.createObjectURL(file);
        const track = {
            name: file.name,
            url: url,
            format: getFileFormat(file.name),
            indexed: true
        };

        // Load the track into IGV and adjust track heights
        igvBrowser.loadTrack(track).then(function() {
            adjustTrackHeights();
        });
    });

    // Determine the file format based on the extension
    function getFileFormat(filename) {
        const extension = filename.split('.').pop().toLowerCase();
        switch (extension) {
            case 'bam': return 'bam';
            case 'vcf': return 'vcf';
            case 'bed': return 'bed';
            case 'gff': return 'gff';
            case 'gtf': return 'gtf';
            case 'wig': return 'wig';
            case 'bigwig': return 'bigwig';
            default: return 'unknown';
        }
    }

    function adjustTrackHeights() {
        const tracks = igvBrowser.trackViews;
        tracks.forEach(track => {
            track.track.height = 80; // Set the height you want for each track
        });
        igvBrowser.redraw();
    }

    function getFileFormat(filename) {
        const extension = filename.split('.').pop().toLowerCase();
        switch (extension) {
            case 'bam': return 'bam';
            case 'vcf': return 'vcf';
            case 'bed': return 'bed';
            case 'gff': return 'gff';
            case 'gtf': return 'gtf';
            case 'wig': return 'wig';
            case 'bigwig': return 'bigwig';
            default: return 'unknown';
        }
    }
});