<script>
  import { fade } from "svelte/transition";
  import { alertStatus, alertText, alertColor } from "./stores"

  let status
  let text
  let color
  var interval




  const unsubscribe = alertStatus.subscribe(value=>{
    clearInterval(interval)
    status = value
    if (value) {
      interval = setInterval(() => {
        status = 0
      }, 5000);
    }
  })
 alertText.subscribe(value=>{
    text = value
  })
  alertColor.subscribe(value=>{
    color = value
  })
</script>

{#if status}

  <alert in:fade out:fade class={color === 1 ? "green" : "red"}>
    {text}
  </alert>
{/if}



<style>
  alert {
    position: absolute;
    top: 30px;
    right: 50%;
    transform: translate(50%);
    color: #2e3440;
    font-weight: bolder;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-radius: 25px;
    text-align: center;
    padding: 10px 15px;
  }

  .green {
    background: #a3be8c;
  }
  .red {
    background: #bf616a;
  }
</style>
