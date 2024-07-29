document.addEventListener('DOMContentLoaded', function() {
    // Menu Toggle Functionality
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    function toggleMenu() {
        if (window.innerWidth < 768) {
            mobileMenu.classList.toggle('active');
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        }
    }

    function closeMenu() {
        if (window.innerWidth < 768) {
            mobileMenu.classList.remove('active');
            navMenu.style.display = 'none';
        }
    }

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function(event) {
            event.stopPropagation();
            toggleMenu();
        });
    }

    document.addEventListener('click', function(event) {
        if (!event.target.closest('#hamburger-menu') && !event.target.closest('#nav-menu')) {
            closeMenu();
        }
    });

    window.addEventListener('resize', function() {
        const isMobile = window.innerWidth < 768;
        navMenu.style.display = isMobile ? 'none' : 'flex';
        if (!isMobile) {
            mobileMenu.classList.remove('active');
        }
        console.log(`Window resized: ${window.innerWidth}, navMenu display: ${navMenu.style.display}`);
    });
    
    // Initial check on page load
    if (window.innerWidth >= 768) {
        navMenu.style.display = 'flex';
    } else {
        navMenu.style.display = 'none';
    }
    console.log(`Initial load: ${window.innerWidth}, navMenu display: ${navMenu.style.display}`);
});

// Include HTML Parts
document.addEventListener('DOMContentLoaded', function() {
    function includeHTML() {
        const elements = document.querySelectorAll("[data-include-html]");
        elements.forEach(el => {
            const file = el.getAttribute("data-include-html");
            if (file) {
                fetch(file)
                    .then(response => {
                        if (!response.ok) throw new Error("Network response was not ok " + response.statusText);
                        return response.text();
                    })
                    .then(data => {
                        el.innerHTML = data;
                        el.removeAttribute("data-include-html");
                    })
                    .catch(error => console.error("Error loading file:", error));
            }
        });
    }
    includeHTML();
});

// Dynamically updates the table based on the datasets.
document.addEventListener("DOMContentLoaded", function () {
    const data = [
        {
            name: "HS-HeLa_Amo-1_T4-24h_exo-0h",
            links: {
                pri_crssant: "https://Documents/CRIS/data/PARIS/PARIS1/HS-HEK293T_AMT-0.5_T4-24h_exo-0h/HS-HEK293T_AMT-0.5_T4-24h_exo-0h_pri_crssant.bam?csf=1&web=1&e=YzEpYc",
                prigap1: "https://example.com/path/to/prigap1.bam",
                prigap1_filtered: "https://example.com/path/to/prigap1_filtered.bam",
                prigapm: "https://example.com/path/to/prigapm.bam",
                prigapm_filtered: "https://example.com/path/to/prigapm_filtered.bam",
                prihomo: "https://example.com/path/to/prihomo.bam",
                pritrans: "https://example.com/path/to/pritrans.bam",
                gaplen: "https://example.com/path/to/gaplen.bam",
                seglen: "https://example.com/path/to/seglen.bam",
            }
        },
        {
            name: "HS-HeLa_Amo-1_T4-24h_exo-2h",
            links: {
                pri_crssant: "https://Documents/CRIS/data/PARIS/PARIS1/HS-HEK293T_AMT-0.5_T4-24h_exo-0h/HS-HEK293T_AMT-0.5_T4-24h_exo-0h_pri_crssant.bam?csf=1&web=1&e=YzEpYc",
                prigap1: "https://example.com/path/to/prigap1.bam",
                prigap1_filtered: "https://example.com/path/to/prigap1_filtered.bam",
                prigapm: "https://example.com/path/to/prigapm.bam",
                prigapm_filtered: "https://example.com/path/to/prigapm_filtered.bam",
                prihomo: "https://example.com/path/to/prihomo.bam",
                pritrans: "https://example.com/path/to/pritrans.bam",
                gaplen: "https://example.com/path/to/gaplen.bam",
                seglen: "https://example.com/path/to/seglen.bam",
            }
        },
        {
            name: "HS-HeLa_Amo-1_T4-24h_exo-12h",
            links: {
                pri_crssant: "test",
                prigap1: "test",
                prigap1_filtered: "test",
                prigapm: "test",
                prigapm_filtered: "test",
                prihomo: "test",
                pritrans: "test",
                gaplen: "test",
                seglen: "test",
            }
        },
        // Add more dataset objects here
    ];

    const dropdownMenu = document.getElementById("dropdownMenu");
    const datasetHeader = document.getElementById("datasetHeader");
    const tableBody = document.getElementById("tableBody");

    function populateDropdown() {
        dropdownMenu.innerHTML = ''; // Clear existing items
        data.forEach(dataset => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = "#";
            a.textContent = dataset.name;
            a.dataset.dataset = dataset.name;
            li.appendChild(a);
            dropdownMenu.appendChild(li);
        });
    }

    function updateTable(datasetName) {
        tableBody.innerHTML = ''; // Clear existing rows
        const dataset = data.find(d => d.name === datasetName);
        if (dataset) {
            const row = document.createElement("tr");
            const datasetCell = document.createElement("td");
            datasetCell.textContent = dataset.name;
            row.appendChild(datasetCell);
            Object.keys(dataset.links).forEach(key => {
                const cell = document.createElement("td");
                const link = document.createElement("a");
                link.href = dataset.links[key];
                link.download = `${dataset.name}_${key}.bam`;
                link.target = "_blank";
                link.innerHTML = '<i class="bi bi-download"></i>';
                cell.appendChild(link);
                row.appendChild(cell);
            });
            tableBody.appendChild(row);
        }
    }

    function toggleDropdown() {
        const isVisible = dropdownMenu.style.display === "block";
        dropdownMenu.style.display = isVisible ? "none" : "block";
    }

    datasetHeader.addEventListener("click", function () {
        toggleDropdown();
    });

    dropdownMenu.addEventListener("click", function (event) {
        if (event.target.tagName === "A") {
            event.preventDefault();
            const datasetName = event.target.dataset.dataset;
            updateTable(datasetName);
            dropdownMenu.style.display = "none";
        }
    });

    document.addEventListener("click", function (event) {
        // Close the dropdown if clicking outside of the dropdown and header
        if (!datasetHeader.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });

    // Initialize by showing all datasets in the dropdown
    populateDropdown();
    if (data.length > 0) {
        updateTable(data[0].name);
    }
});

// Add IGV embed into the webpage.
document.addEventListener("DOMContentLoaded", function() {
    const igvContainer = document.getElementById("igv-container");
    const fileInput = document.getElementById("fileInput");
    const fileNameDisplay = document.getElementById("fileName");
    const igvOptions = {
        genome: "hg38", // Change this to your desired genome
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