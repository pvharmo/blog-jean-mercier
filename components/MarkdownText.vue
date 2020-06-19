<template>
  <div>
    <template lang="md">
      {{text}}
    </template>
  </div>
</template>

<script>
export default {
  name: 'MarkdownText',
  props: {
    tag: { type: String, default: 'article' },
    text: { type: String, required: true }
  }
}
</script>
