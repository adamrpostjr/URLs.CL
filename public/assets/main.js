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
  var input = document.getElementById('urls')
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
          if(resp.error != null){
            alert('Error: '+resp.error.code+'\n'+
              'Errno: '+resp.error.errno+'\n'+
              'Msg: '+resp.error.sqlMessage)
              $('#setupDB')[0].reset();
          } else{
            console.log(resp)
          }
        }
      });
    });
  });
}
createURI()
