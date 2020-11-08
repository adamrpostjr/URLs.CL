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
  
  
  
  $(function() {
    $('#shorten').submit(function(event) {
      event.preventDefault();
      var checked = checkbox.checked ? checked = 2 : checked = 1
      let url = ''
      if (input.value.startsWith('http')) {
        url = input.value
      } else {
        url = 'https://'+input.value
      }
      $.ajax({
        url: '/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({"url": url, "otu": checked}),
        dataType: 'json',
        success: function(resp){
            var key = Object.keys(resp)
            if (key[0] == "code") {
              console.log('error');
            } else {
              popup.style.display = "flex";
              if (resp.fullURL != null) {
                results.innerText = resp.fullURL
                results.href = 'https://'+resp.fullURL
              } else {
                console.log(resp);
                 resp == 'ref is a required field' ? txt = 'Please Enter a URL' : 
                  resp == 'ref must be a valid URL' ? txt = 'Please Enter a valid URL' :
                  resp == 'REALLYYYY? REALLY THO...' ? txt = resp :
                  txt = 'please email adam@postalproduction.com for help'
                results.innerText = txt
              }
             
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

function openNav() {
  document.getElementById("sideNav").style.width = "250px";
}

function closeNav() {
  document.getElementById("sideNav").style.width = "0";
}