<template>
  <div id="about-page" class="page-wrapper about-page content-page">
    <div class="content">
      <h1>FREQUENTLY ASKED QUESTIONS ON {{ $siteConfig.siteName }}</h1>
      <p>
        Whether from friends, colleagues, or the web, here are a few frequently
        asked questions about our film site.
      </p>
      <h3>
        Q. How does <em>The Movie Shrink</em> go about choosing the films it
        will comment on?
      </h3>
      <p>
        A. There are some accidental elements to choosing films we will comment
        on, although great care is taken in choosing our two films per month,
        our twenty-four films a year. We view several more films on which we
        choose not to comment on in detail. Some of them are briefly commented
        upon in our
        <nuxt-link to="/categories/bullit-comments">Bullet comments</nuxt-link>
        section of this site.
      </p>
      <p>
        The films that are looked at closely in our main section are chosen
        among the ones that are accessible to us in our city, or on the web, or
        then again, in a film festival we attend. There is no pretense to say
        that the films chosen are the most significant current films. But they
        are part of them. Of course, a great many significant films, in fact,
        most of them, do not find their way into <em>The Movie Shrink</em>.
        There are more than twenty-four significant films a year on the planet,
        of course.
      </p>
      <p>
        It is taken for granted that if we choose to comment on a film, it is
        that there is social meaning to it, usually implicit, meaning we try to
        uncover and understand. But the meaning we will try to understand will
        not be going in all directions, there will have to be some common
        thread, some unity to it. Most often, the meaning we will uncover will
        be related to the elements of understanding we presented in our section
        on <em>The Movie Shrink’s</em> toolbox. The sources mentioned there can
        be considered as our keys to understanding films, in this site.
        <a href="https://en.wikipedia.org/wiki/Verstehen#Meaning"
          >Interpretive sociology</a
        >, <a href="https://en.wikipedia.org/wiki/Max_Weber">Max Weber</a>,
        <a href="https://en.wikipedia.org/wiki/Institutional_economics"
          >Institutional economics</a
        >, and
        <a href="https://en.wikipedia.org/wiki/Marshall_McLuhan"
          >Marshall McLuhan</a
        >
        are, so to speak, the basic ingredients behind
        <em>The Movie Shrink’s</em> interpretations, along with some others.
      </p>
      <h3>
        Q. How does <em>The Movie Shrink</em> go about in identifying what it
        considers as meaningful elements within a given film?
      </h3>
      <p>
        A. Although we try to be as explicit and systematic as possible, the
        procedure is not amenable to the standard procedures of scientific
        inquiry. At the outset, let us recognize that the films are not chosen
        randomly, as stated earlier. There is a certain amount of intuition and
        experience involved. However, once the interpretation is presented, it
        must be defended and justified in the most objective way possible, it
        must be able to withstand criticism and contradictory opinions, much
        like in a court procedure.
      </p>
      <p>
        The essential goal is the identification of a central theme, expressed
        in many ways.
      </p>
      <p>
        This central theme is at the heart of what is looked for. If this
        central theme seems absent, there is no need for us to go further. In
        the cases we “come up empty” with, that is to say in most cases of the
        films we look at before making a choice, the film can have meaning and
        be socially relevant, even profound, but the
        <nuxt-link to="/hermeneutics">hermeneutic</nuxt-link> method will not
        yield more than what can be gathered from casual observations. In some
        cases, the film director is very conscious of what he wants to say, to
        the point that his film is advocacy for some cause, often political, as
        in the Costa-Gavras films of the 20th century, intent on revealing
        governmental corruption in South America and other parts of the world.
        The <nuxt-link to="/hermeneutics">hermeneutic</nuxt-link> method, as we
        understand it, cannot add much in those cases, as with the documentary
        approach, where the opinion of the filmmaker is paramount and in a sense
        self-sufficient.
      </p>

      <h3>
        Q. Are there not as many interpretations as there are viewers?
      </h3>
      <p>
        A. In the view taken here, there is room for different interpretations,
        and these interpretations, although different, are not necessarily in
        opposition to each other. In our interactive site (<b
          >The Movie Shrink's Forum</b
        >) there will be ample space for other interpretations, other elements
        of understanding.
      </p>
      <p>
        However, not all interpretations are equal. There are some
        interpretations which are, in the words of
        <nuxt-link to="/hermeneutics">hermeneutics</nuxt-link>, « more adequate
        to the object » or “more sensitive to the object”. Some interpretations
        are more enlightening. We are not, as suggested earlier, in a scientific
        procedure, but that is not to conclude that everything is relative.
        There is the necessity to demonstrate the appropriateness of the
        proposed understanding and, as stated earlier, to defend it, much like
        in a trial, where absolute certainty cannot always be attained, and
        where, yet, a decision is made.
      </p>

      <p>
        And now, let us turn to some specific films from the
        <nuxt-link to="/">home page</nuxt-link>!
      </p>
    </div>
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: `FAQ | ${this.$siteConfig.siteName}`
    }
  }
}
</script>
