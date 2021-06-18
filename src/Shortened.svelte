<script>
  import { alertStatus, alertText, alertColor } from "./stores"

  export let em;
  export let shortEvent;

  var copy = (es) => {
    if (event.button == 2) {
      alertStatus.set(0)
      alertText.set("")
      event.preventDefault();
      
      alertStatus.set(1)
      alertText.set("copied!");
      alertColor.set(1)

      shortEvent = false;

    }
  };
</script>

<popup>
  <a href="https://urls.cl/{em}" on:contextmenu|preventDefault={copy}>urls.cl/{em}</a
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
