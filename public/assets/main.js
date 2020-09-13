const checkbox = document.getElementById('cb')
const otu = document.getElementById('otu');
function checkeD() {
  otu.onmousedown = function(){
    if (checkbox.checked == true) {
    checkbox.checked = false
    otu.style.cssText = "text-shadow: 6px 6px 6px #000000"
    }else {
      checkbox.checked = true
      otu.style.cssText = "text-shadow: 6px 6px 6px #00ff08"
    }
  }
}
checkeD()
