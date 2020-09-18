const checkbox = document.getElementById('cb')
const otu = document.getElementById('otu');
function checkeD() {
  otu.onmousedown = function(){
    if (checkbox.checked == true) {
    checkbox.checked = false
    otu.style.cssText = "text-shadow: 6px 6px 6px #36243a"
    }else {
      checkbox.checked = true
      otu.style.cssText = "text-shadow: 6px 6px 6px #00ff08"
    }
  }
}
checkeD()
function createURI() {
  const input = document.getElementById('urls')
  const results = document.getElementById('link')
  const popup = document.getElementById('popup')
  var checked = checkbox.checked ? checked = 1 : checked = 0
  $(function() {
    $('#shorten').submit(function(event) {
      event.preventDefault();
      var checked = checkbox.checked ? checked = 2 : checked = 1
      $.ajax({
        url: '/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({"url": input.value, "otu": checked}),
        dataType: 'json',
        success: function(resp){
            console.log(resp)
            var key = Object.keys(resp)
            if (key[0] == "code") {
              console.log('error');
            } else {
              popup.style.display = "flex";
              results.innerText = resp.FullURL
              results.href = 'https://'+resp.FullURL
            }
        }
      });
    });
  });
}
createURI()



function popupControl() {
  const popup = document.getElementById('popup')
  const close = document.getElementById('close')
  const form = document.getElementById('shorten')
  close.onmousedown = function(){
    form.reset();
    popup.style.display = "none";
  }
}
 popupControl()