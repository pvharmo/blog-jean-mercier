<style lang="scss">
    .page-main-section {
        // margin-top: 52px;
        padding-top: 27px;
    }

    #main-container {
        max-width: 937px;
    }
</style>

<main class="section page-main-section">
    <div id="main-container" class="container small-container">
        <div class="columns">
            <div
                class="
              column
              is-full
              is-8
              is-two-thirds
            ">
                <slot />
            </div>
            <aside class="column right-sidebar is-one-third">
                <slot name="sidebar" />
            </aside>
        </div>
    </div>
</main>
