<script>
  export let items = [];
</script>

<div class="grid grid-theme-blocks">
  <div class="columns items is-multiline">
    {#if items}
      {#each items as item}
        <div class="column items" style="width: 100%">
          <slot {item} />
        </div>
      {/each}
    {/if}
  </div>
</div>

<style lang="scss" scoped>
  .grid {
    min-height: 150px;
  }
  .column {
    flex-basis: auto;
    flex-grow: 0;
    @media (max-width: 768px) {
      width: 100% !important;
    }
  }
</style>
