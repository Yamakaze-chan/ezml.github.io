var header = document.getElementById("navbar_section");
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("navbar_section_active");
  if (current.length > 0) { 
    current[0].className = current[0].className.replace(" navbar_section_active", "");
  }
  this.className += " navbar_section_active";
  });
}