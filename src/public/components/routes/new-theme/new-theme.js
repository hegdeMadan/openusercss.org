import {bulmaComponentGenerator as bulma} from 'vue-bulma-components'

import attributor from '../../elements/footer/footer.vue'
import showcase from '../../sets/theme-showcase/theme-showcase.vue'
import navbar from '../../elements/navbar/navbar.vue'
import editor from '../../elements/editor/editor.vue'

import {
  leftToRight
} from '../../../src/public/components/animations'

export default {
  'components': {
    'b-section':   bulma('section', 'div'),
    'b-container': bulma('container', 'div'),
    attributor,
    showcase,
    navbar,
    editor
  },
  'methods': {
    ...leftToRight
  }
}