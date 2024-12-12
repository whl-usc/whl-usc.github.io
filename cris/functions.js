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

// JavaScript to fetch STATISTICS
const csvFiles = [
    { name: 'PARIS1', link: 'https://example.com/dataset1.csv' },
    { name: 'PARIS-exo', link: 'https://example.com/dataset2.csv' },
    { name: 'PARIS2', link: 'https://example.com/dataset3.csv' },
    { name: 'SHARC-exo', link: 'https://example.com/dataset3.csv' },
    { name: 'SHARC-in_vitro', link: 'https://example.com/dataset3.csv' }
];

document.addEventListener('DOMContentLoaded', () => {
    const datasetSelect = document.getElementById('dataset');
    const categorySelect = document.getElementById('category');
    const columnSelect = document.getElementById('column');
    const filterInput = document.getElementById('filter-input');
    const table = document.getElementById('data-table');
    let currentData = [];
    let categories = [];

    // Populate datasets dropdown from predefined list
    csvFiles.forEach(file => {
        const option = document.createElement('option');
        option.value = file.link;
        option.textContent = file.name;
        datasetSelect.appendChild(option);
    });

    // Load the first dataset by default
    if (csvFiles.length > 0) {
        loadDataset(csvFiles[0].link);
    }

    // Load selected dataset
    datasetSelect.addEventListener('change', (e) => {
        const datasetLink = e.target.value;
        loadDataset(datasetLink);
    });

    // Fetch and process the selected dataset
    function loadDataset(link) {
        fetch(link)
            .then(response => response.text())
            .then(data => {
                currentData = parseCSV(data);
                categories = Object.keys(currentData[0]).slice(1); // Skip "Name" column
                populateCategorySelect(categories);
                renderTable(currentData, categories[0]);
            });
    }

    // Parse CSV into array of objects
    function parseCSV(data) {
        const rows = data.split('\n').map(row => row.split(','));
        const headers = rows[0];
        return rows.slice(1).map(row => Object.fromEntries(headers.map((h, i) => [h.trim(), row[i]?.trim()])));
    }

    // Populate category dropdown
    function populateCategorySelect(categories) {
        categorySelect.innerHTML = '';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });

        // Populate column select for the first category
        updateColumnSelect(categories[0]);
    }

    // Populate column dropdown
    function updateColumnSelect(category) {
        columnSelect.innerHTML = '';
        currentData.forEach((row, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `Column ${index + 2}`;
            columnSelect.appendChild(option);
        });
    }

    // Filter table rows
    filterInput.addEventListener('input', (e) => {
        const filterText = e.target.value.toLowerCase();
        renderTable(currentData, categorySelect.value, filterText);
    });

    // Render table
    function renderTable(data, category, filterText = '') {
        const tbody = table.querySelector('tbody');
        const thead = table.querySelector('thead');
        tbody.innerHTML = '';
        thead.innerHTML = '';

        // Render headers
        const headers = ['Name', category];
        const headerRow = document.createElement('tr');
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        // Render rows
        data.forEach(row => {
            if (filterText && !row[category].toLowerCase().includes(filterText)) return;
            const tr = document.createElement('tr');
            const nameCell = document.createElement('td');
            nameCell.textContent = row.Name;
            const categoryCell = document.createElement('td');
            categoryCell.textContent = row[category];
            tr.appendChild(nameCell);
            tr.appendChild(categoryCell);
            tbody.appendChild(tr);
        });
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