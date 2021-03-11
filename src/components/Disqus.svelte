<script>
  //   import DisqusThread from "./action.js";

  export let container = "disqus_container";
  export let url = window.location.href;
  export let identifier = window.location.pathname;
  export let siteName = "svelte-test";

  const mountNewDisqus = ({ identifier, url, siteName }) => {
    const config = document.createElement("script");
    config.id = "disqus-config-block";
    config.type = "text/javascript";
    config.innerHTML = `let disqus_config = function () { this.page.url = '${url}'; this.page.identifier = '${identifier}'; };`;
    document.head.appendChild(config);

    const disqus = document.createElement("script");
    disqus.id = "disqus-app-block";
    disqus.src = `https://${siteName}.disqus.com/embed.js`;
    disqus.setAttribute("data-timestamp", +new Date());
    (document.head || document.body).appendChild(disqus);

    return true;
  };

  const unmountDisqus = () => {
    document.getElementById("disqus-config-block").remove();
    document.getElementById("disqus-app-block").remove();

    return true;
  };

  function DisqusThread(node, params) {
    if (!params.identifier || params.identifier === window.location.pathname)
      console.warn(
        "Warning: disqus-svelte Comments created without 'identifier' property. This is not recommended & default settings are not guaranteed to work."
      );

    const thread = document.createElement("div");
    thread.id = "disqus_thread";
    node.appendChild(thread);

    mountNewDisqus(params);

    return {
      update(new_params) {
        unmountDisqus();
        mountNewDisqus(new_params);
      },

      destroy() {
        unmountDisqus();
      },
    };
  }
</script>

<div
  use:DisqusThread={{
    identifier,
    url,
    siteName,
  }}
  class={container}
/>
