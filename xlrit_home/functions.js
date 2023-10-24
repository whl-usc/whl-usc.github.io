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