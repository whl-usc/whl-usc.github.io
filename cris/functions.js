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

// JavaScript to fetch CSV file and parse the data
fetch('https://github.com/whl-usc/whl-usc.github.io/tree/main/cris/links/datasets.csv') // Update any path to the CSV file
    .then(response => response.text())
    .then(csvText => {
        const rows = csvText.split("\n");
        const dataset = [];

        rows.forEach(row => {
            const cols = row.split(",");
            const entry = {
                name: cols[0], // Dataset name
                links: {
                    pri_crssant: cols[1],
                    prigap1: cols[2],
                    prigap1_filtered: cols[3],
                    prigapm: cols[4],
                    prigapm_filtered: cols[5],
                    prihomo: cols[6],
                    pritrans: cols[7],
                    gaplen: cols[8],
                    seglen: cols[9],
                    fastqc: cols[10]
                }
            };
            dataset.push(entry);
        });

        console.log(dataset);
    })
    .catch(error => console.error("Error loading CSV:", error));

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