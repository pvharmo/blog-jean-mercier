<script>
  import marked from "marked";

  export let markdown;

  $: html = markdown ? marked(markdown) : "";
</script>

{@html html}
