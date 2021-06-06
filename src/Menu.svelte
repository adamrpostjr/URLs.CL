<script>
  let display = false;
</script>

<open class:hidden={display} on:click={() => (display = !display)}>
  <bar />
  <bar />
  <bar />
</open>
<menu class:hidden={!display}>
  <close on:click={() => (display = !display)}>close</close>
  <a href="/">Account</a>
  <a href="/">Services</a>
  <a href="/">API</a>
  <a href="/">About</a>
  <a href="/">Contact</a>
  <comingSoon>COMING SOON</comingSoon>
  <shout>github: <a href="https://urls.cl/git">urls.cl/git</a></shout>
</menu>

<style>
  menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    margin: unset;
    /* padding: 0 60px 0 10px; */
    background-color: #434c5e;
    transition: all 450ms;
    overflow: hidden;
    width: 20vw;
    z-index: 10;
  }
  menu > * {
    padding: 10px 0px;
  }
  close {
    cursor: pointer;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    transition: all 200ms;
  }
  close:hover {
    background-color: #bf616a;
  }
  shout {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 190px;
  }
  comingSoon {
    transform: rotate(90deg);
    width: 220px;
    font-size: x-large;
    text-align: center;
    position: absolute;
    top: 50%;
    right: -80px;
  }
  .hidden {
    padding: unset;
    width: 0;
  }
  open {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px;
    cursor: pointer;
  }
  bar {
    width: 35px;
    height: 5px;
    background-color: black;
    margin: 6px 0;
    display: block;
  }
</style>
