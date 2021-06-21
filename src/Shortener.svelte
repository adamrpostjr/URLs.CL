<script>
  import * as yup from "yup";
  import axios from "axios";
  import Popup from "./Shortened.svelte";
  import { alertStatus, alertText, alertColor } from "./stores";

  var url;
  var shortEvent;
  var shortURL = "";
  let alertError = 0;

  var schema = yup.object().shape({
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
            .catch(function (err) {
              // alert = false;
              console.log(alertError);
              if (alertError == 0) {
                alertError = alertError + 1;
                error("Woops, could you try again?");
              } else if (alertError == 1) {
                alertError = alertError + 1;
                error("How about we conntact support, find it under the menu!");
              } else {
                error(
                  "Looks like Dave unplugged the server again.. one moment we will be back!"
                );
              }
            });
        } else {
          error(
            "Invalid URL, please make sure that it starts with https:// or http://.. more support coming soon"
          );
        }
      })
      .catch((err) => error(err));
  }
  function enter(e) {
    if (e.charCode === 13) shorten();
  }

  function success(message) {
    shortEvent = true;
    shortURL = message.slug;
  }
  function error(message) {
    alertStatus.set(0);
    alertText.set("");
    alertColor.set(0);
    url = "";
    setTimeout(() => {
      alertStatus.set(1);
      alertText.set(message);
    }, 200);
  }
  function close() {
    shortEvent = false;
    url = "";
    shortURL = "";
  }
</script>

{#if shortEvent}
  <wrapper on:click={close}>
    <svelte:component this={Popup} em={shortURL} bind:shortEvent />
  </wrapper>
{:else}
  <shorten>
    <input bind:value={url} on:keypress={enter} type="text" />
    <br />
    <button on:click={shorten}>shorten</button>
  </shorten>
{/if}

<style>
  wrapper {
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
    text-transform: uppercase;
  }
</style>
