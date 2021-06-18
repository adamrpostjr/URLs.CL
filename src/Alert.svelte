<script>
  export let text;
  export let status;
  import { fade } from "svelte/transition";
</script>

<alert in:fade out:fade class={status === 1 ? "green" : "red"}>
  {text}
</alert>

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
