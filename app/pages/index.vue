<script>
  import chip from '~/components/elements/chip.vue'
  import themeCard from '~/components/elements/theme-card.vue'
  import notification from '~/components/elements/notification.vue'
  import spinner from '~/components/elements/spinner.vue'
  import progressiveImage from '~/components/bits/progressive-image.vue'

  import {mapGetters,} from 'vuex'
  import starRating from 'vue-star-rating'

  export default {
    'transition': 'fade-zoom',
    fetch ({store,}) {
      const get = Promise.all([
        store.dispatch('themes/latest'),
        store.dispatch('themes/popular'),
        store.dispatch('forum/announcements'),
      ])

      return get
    },
    'components': {
      themeCard,
      chip,
      notification,
      progressiveImage,
      starRating,
      spinner,
    },
    data () {
      return {
        'statsRetrying': false,
        'statsTryLeft':  4,
      }
    },
    'computed': {
      ...mapGetters({
        'themes':    'themes/all',
        'announces': 'forum/announcements',
      }),
    },
    'methods': {
      averageRating (theme) {
        const ratings = this.$store.getters['ratings/theme'](theme.id)
        let sum = 0

        ratings.forEach((rating) => {
          sum = sum + rating.value
        })

        return sum / ratings.length
      },
    },
  }
</script>

<style lang="scss" scoped>
  .media-content {
    overflow: hidden;
  }

  .is-fullwidth {
    width: 100%;
  }

  .has-text-ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .has-margin-bottom {
    margin-bottom: 1rem;
  }
</style>

<template lang="pug">
  include ../components/static/theme-card.pug

  .ouc-route-root
    .container.ouc-main-container
      .ouc-main-wrapper
        .section

          .is-hidden-mobile.is-hidden-widescreen.has-margin-bottom
            h2.has-bottom-margin Newest themes
            .columns.is-multiline
              nuxt-link.column.is-4(
                v-for="(theme, index) in orderBy(limitBy(themes, 6), 'createdAt', -1)",
                :key="theme.id",
                :to="'/theme/' + theme.id"
              )
                +theme-card(false, true)
                  .columns.is-mobile.is-fullwidth
                    .column.is-3
                      progressive-image(
                        :src="theme.createdBy.avatarUrl",
                        :placeholder="theme.createdBy.smallAvatarUrl",
                        width="3rem",
                        height="3rem",
                        size="contain",
                        position="center left"
                      )
                    .column.has-text-right.has-text-ellipsis
                      p {{theme.title | truncate(18)}}
                      p {{theme.createdAt | moment('from', 'now')}}

          .columns
            .column.is-3.is-hidden-tablet-only.is-hidden-desktop-only
              h2.has-bottom-margin Newest themes
              .columns.is-multiline
                nuxt-link.column.is-12(
                  v-for="(theme, index) in orderBy(limitBy(themes, 9), 'createdAt', -1)",
                  :key="theme.id",
                  :to="'/theme/' + theme.id"
                )
                  +theme-card(false, true)
                    .columns.is-mobile.is-fullwidth
                      .column.is-3
                        progressive-image(
                          :src="theme.createdBy.avatarUrl",
                          :placeholder="theme.createdBy.smallAvatarUrl",
                          width="3rem",
                          height="3rem",
                          size="contain",
                          position="center left"
                        )
                      .column.has-text-right.has-text-ellipsis
                        p {{theme.title | truncate(18)}}
                        p {{theme.createdAt | moment('from', 'now')}}

            .column
              h2.has-bottom-margin Popular themes
              .columns.is-multiline

                nuxt-link.column.is-4(
                  v-for="(theme, index) in limitBy(orderBy(themes, 'stats.visits', -1), 9)",
                  :key="theme.id",
                  :to="'/theme/' + theme.id"
                )
                  +theme-card(true)
                    .card-content
                      .media
                        .media-left
                          figure.image.is-48x48
                            progressive-image(
                              :src="theme.createdBy.avatarUrl",
                              :placeholder="theme.createdBy.smallAvatarUrl",
                              width="100%",
                              height="3rem",
                              size="contain"
                            )
                        .media-content
                          b {{theme.createdBy.display}}
                          //- pre {{theme}}
                          p
                            span(v-if="theme.stats.visits > 10")
                              fa-icon(icon="caret-up")
                              | {{theme.stats.visits}} visits
                            span(v-else-if="theme.rating.value > 1")
                              fa-icon(icon="star")
                              | {{theme.rating.value}} points
                            span(v-else-if="theme.stats.views > 10")
                              fa-icon(icon="eye")
                              | {{theme.stats.views}} views
                            span(v-else-if="theme.rating.count > 1")
                              fa-icon(icon="star")
                              | {{theme.rating.count}} ratings
                            span(v-else)
                              fa-icon(icon="clock")
                              | {{theme.updatedAt | moment('from', 'now')}}

                    .card-footer
                      .card-footer-item(alt="Test")
                        | Yo

        .section
          h2.has-bottom-margin Announcements
          .columns
            .column.is-3(v-for="topic in limitBy(announces, 4)")
              a(:href="topic.url", rel="noopener", target="_blank")
                .box
                  b {{topic.title | truncate(23)}}
                  p {{topic.created | moment('from', 'now')}}
</template>
