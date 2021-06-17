<script>
  import Alert from "./Alert.svelte";

  export let em;
  var text
  var status
  var alert

  var copy = (es)=>{
    if (event.button == 2){
        event.preventDefault();
        alert = true
        text = 'copied'
        status = 1
        setTimeout(() => {
          alert = false
        }, 4000);
  }
  }
</script>

{#if alert}
  <Alert text={text} status={status}/>
{/if}


<popup >
  <a href="https://urls.cl/{em}" on:contextmenu|preventDefault={copy}>urls.cl/{em}</a>
</popup>

<style>
  popup{
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
