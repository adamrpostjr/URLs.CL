<script>
  import Alert from "./Alert.svelte";

  export let em;
  export let shortEvent;
  // export let copy;
  var text;
  var status;
  var alert;

  var copy = (es) => {
    if (event.button == 2) {
      event.preventDefault();
      alert = true;
      text = "copied!";
      status = 1;

      setTimeout(() => {
        alert = false;
      }, 2000);
      setTimeout(() => {
        shortEvent = false;
      }, 3000);
    }
  };
</script>

{#if alert}
  <Alert {text} {status} />
{/if}

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
