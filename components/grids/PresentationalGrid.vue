<template>
  <div :class="`grid grid-theme-blocks`">
    <div class="columns items is-multiline">
      <div
        v-for="(item, index) in items"
        :key="item.title ? item.title : index"
        class="column items"
        style="width: 100%"
      >
        <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>
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
.card {
  @media (min-width: 768px) {
    height: 100%;
  }
  .media-content {
    overflow-x: initial;
  }
}
</style>
<style lang="scss">
.loading-posts .spinner-wrapper {
  margin: 30px auto 0 auto;
}
.grid-theme-grid .items,
.grid-theme-image-grid .items {
  padding: 0.75rem;
  .column {
    padding: 0;
  }
}
.grid-theme-image-grid .items {
  .card-content {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    opacity: 0;
    transition: 0.4s ease all;
  }
  .card-content div,
  .card-content a {
    display: block;
    height: 100%;
  }
  a {
    transition: 0.5s ease all;
    transform: translateY(-15px);
  }
  .title,
  .subtitle,
  strong {
    color: white;
  }
  .card:hover {
    .card-content {
      opacity: 1;
    }
    a {
      transform: translateY(0);
    }
  }
}
</style>
