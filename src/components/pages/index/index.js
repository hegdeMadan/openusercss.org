import {bulmaComponentGenerator as bulma} from 'vue-bulma-components'

import attributor from '../../components/footer/footer.vue'
import navbar from '../../components/navbar/navbar.vue'
import searchField from '../../components/search-field/search-field.vue'
import chip from '../../components/chip/chip.vue'
import showcase from '../../components/theme-showcase/theme-showcase.vue'
import themeCard from '../../components/theme-card/theme-card.vue'
import flushImg from '../../components/flush-img/flush-img.vue'

export default {
  'components': {
    'b-tile':      bulma('tile', 'div'),
    'b-section':   bulma('section', 'div'),
    'b-container': bulma('container', 'div'),
    'b-columns':   bulma('columns', 'div'),
    'b-column':    bulma('column', 'div'),
    'b-box':       bulma('box', 'div'),
    searchField,
    attributor,
    themeCard,
    flushImg,
    showcase,
    navbar,
    chip
  },
  'computed': {
    popularSites () {
      return [
        {
          'domain':       'google.com',
          'themeCount':   1660,
          'installCount': 226
        },
        {
          'domain':       'facebook.com',
          'themeCount':   1522,
          'installCount': 443
        },
        {
          'domain':       'decentm.com',
          'themeCount':   1001,
          'installCount': 262
        },
        {
          'domain':       'apple.com',
          'themeCount':   771,
          'installCount': 112
        }
      ]
    },

    popularThemes () {
      return [
        {
          'title':         'A thing',
          'screenshotUrl': '/img/main.bg-x360.png',
          'author':        'decentm',
          'description':   'This is not really a theme, but just a test to see how cards will look when the site gets finished.'
        },
        {
          'title':         'The amazing placeholder',
          'screenshotUrl': '/img/main.bg-x360.png',
          'author':        'decentm',
          'description':   'This is not really a theme, but just a test to see how cards will look when the site gets finished.'
        },
        {
          'title':         'The theme that saves us all',
          'screenshotUrl': '/img/main.bg-x360.png',
          'author':        'decentm',
          'description':   'This is not really a theme, but just a test to see how cards will look when the site gets finished.'
        }
      ]
    }
  }
}