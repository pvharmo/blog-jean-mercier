<script>
  export let active;
</script>

<button class:active on:click>
  <slot />
</button>

<style>
  button {
    background-color: lightgray;
    border-radius: 25px;
    padding: 5px 10px;
    margin: 5px 5px;
    font-size: 14px;
    border: none;
    cursor: pointer;
  }
  .active {
    background-color: lightblue;
  }
</style>
