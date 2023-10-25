/* Set the width of the side navigation and left margin of the page content */
function openNav() {
  document.getElementById("SiteNav").style.width = "190px";
  document.getElementById("main").style.marginLeft = "190px";
}
function closeNav() {
  document.getElementById("SiteNav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

/* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
function toggleDropdown(button) {
  button.classList.toggle("active");
  var dropdownContent = button.nextElementSibling;
  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
  } else {
    dropdownContent.style.display = "block";
  }
}

/* Create an IGV.browser instance */
function createIGVBrowser() {
  var igvDiv = document.getElementById("igv-div");
  var options = {
      genome: "hg38",
      locus: "chr8:127,736,588-127,739,371",
      tracks: [
          {
              "name": "HG00103",
              "url": "https://s3.amazonaws.com/1000genomes/data/HG00103/alignment/HG00103.alt_bwamem_GRCh38DH.20150718.GBR.low_coverage.cram",
              "indexURL": "https://s3.amazonaws.com/1000genomes/data/HG00103/alignment/HG00103.alt_bwamem_GRCh38DH.20150718.GBR.low_coverage.cram.crai",
              "format": "cram"
          }
      ]
  };

  igv.createBrowser(igvDiv, options)
      .then(function (browser) {
          console.log("Created IGV browser");
      });
}