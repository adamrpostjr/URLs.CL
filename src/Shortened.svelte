<script>
  import { alertStatus, alertText, alertColor } from "./stores";

  export let em;
  export let shortEvent;

  function copyText(element) {
    var range, selection;

    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    document.execCommand("copy");
  }

  var copy = (es) => {
    console.log(es.target);
    if (event.button == 2) {
      var el = es.target;
      copyText(el);

      alertStatus.set(1);
      alertText.set("copied!");
      alertColor.set(1);
      shortEvent = false;
    }
  };
</script>

<popup>
  <a href="https://urls.cl/{em}" on:contextmenu|preventDefault={copy}
    >urls.cl/{em}</a
  >
</popup>

<style>
  popup {
    z-index: 10;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: xx-large;
    font-weight: bold;
    width: 50vw;
    height: 50vh;
    text-align: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }
</style>
