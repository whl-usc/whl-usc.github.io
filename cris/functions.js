// Adds the header, sidenav, and footer sections to the document.
function includeHTML() {
  const elements = document.querySelectorAll("[data-include-html]");
  elements.forEach(el => {
    const file = el.getAttribute("data-include-html");
    if (file) {
      fetch(file)
        .then(response => response.text())
        .then(data => {
          el.innerHTML = data;
          el.removeAttribute("data-include-html");
        })
        .catch(error => console.error("Error loading file:", error));
    }
  });
}

document.addEventListener("DOMContentLoaded", includeHTML);

// Dynamically updates the table based on the datasets.
document.addEventListener("DOMContentLoaded", function() {
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
        // Add more dataset objects here
        // {
        //     name: "",
        //     links: {
        //         pri_crssant:
        //         prigap1:
        //         prigap1_filtered:
        //         prigapm:
        //         prigapm_filtered:
        //         prihomo:
        //         pritrans:
        //         gaplen:
        //         seglen:
        //     }
        // },
    ];
    const tableBody = document.querySelector("#dataSet tbody");
    const searchInput = document.querySelector("#searchInput");
    function populateTable() {
        tableBody.innerHTML = ''; // Clear the table body before populating
        data.forEach(dataset => {
            const row = document.createElement("tr");
            const datasetCell = document.createElement("td");
            datasetCell.textContent = dataset.name;
            row.appendChild(datasetCell);
            Object.keys(dataset.links).forEach(key => {
                const cell = document.createElement("td");
                const link = document.createElement("a");
                link.href = dataset.links[key];
                link.download = `${dataset.name}_${key}.bam`; // Set the download attribute
                link.target = "_blank";
                link.innerHTML = '<i class="bi bi-download"></i>'; // Use an icon or text for the link
                cell.appendChild(link);
                row.appendChild(cell);
            });
            tableBody.appendChild(row);
        });
    }
    function filterTable() {
        const filter = searchInput.value.toLowerCase();
        const rows = tableBody.getElementsByTagName("tr");
        Array.from(rows).forEach(row => {
            const text = row.getElementsByTagName("td")[0].textContent.toLowerCase();
            row.style.display = text.includes(filter) ? "" : "none";
        });
    }
    searchInput.addEventListener("keyup", filterTable);
    populateTable();
});