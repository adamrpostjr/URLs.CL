<script>
  import * as yup from "yup";
  import axios from "axios";
  import Popup from "./Shortened.svelte";
  import Alert from "./Alert.svelte";

  var text
  var status
  var alert

  let url;

  let schema = yup.object().shape({
    uri: yup.string().url().trim().required(),
  });

  function shorten() {
    schema
      .isValid({
        uri: url,
      })
      .then(function (valid) {
        if (valid) {
          axios
            .post("http://192.168.0.2:8086/", {
              slug: url,
            })
            .then(function (response) {
              success(response.data);
            })
            .catch(function (error) {
              error(error);
            });
        } else {
          error(
            "Invalid URL, please make sure that it starts with https:// or http:// or ftp://.. etc"
          );
        }
      })
      .catch((error) => error("message"));
  }
  function enter(e) {
    if (e.charCode === 13) shorten();
  }

  let event;
  let eventStatus = ""; // error, warning, success
  let eventMessage = ""; // whatever the fuck the body is

  function success(message) {
    event = true
    eventMessage = message.slug
  }
  function error(message) {
    alert = true
    url = ''
     status = 0
     text = message
     console.log(message)
     setTimeout(() => {
       alert = false
     }, 4000);
  }
  function close(){
    event = false
    url = ''
    eventMessage = ''
  }
</script>

{#if alert}
  <Alert text={text} status={status}/>
{/if}

{#if event}
  <wrapper on:click={close}>
    <svelte:component this={Popup} em={eventMessage} />
  </wrapper>

  {:else}
  <shorten >
    <input bind:value={url} on:keypress={enter} type="text" />
    <br />
    <button on:click={shorten}>shorten</button>
  </shorten>

{/if}


<style>
  wrapper{
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    /* background: #2e3440; */
  }
  shorten {
    position: absolute;
    top: 50%;
    left: 50%;
    width: fit-content;
    transform: translate(-50%);
  }
  input {
    width: 75vw;
    background: #3b4252;
    border: unset;
    border-radius: unset;
    font-size: x-large;
    color: #eceff4;
  }
  input:focus {
    outline: none !important;
    border: 1px solid #5e81ac;
    box-shadow: 0 0 10px #4c566a;
  }
  button {
    float: right;
    width: 200px;
    border-radius: unset;
    border: unset;
    background: #d8dee9;
    color: #2e3440;
    font-weight: bolder;
    cursor: pointer;
  }
</style>
