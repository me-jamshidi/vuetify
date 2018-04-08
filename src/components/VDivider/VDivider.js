import '../../stylus/components/_dividers.styl'

import Themeable from '../../mixins/themeable'

export default {
  name: 'v-divider',

  functional: true,

  mixins: [Themeable],

  props: {
    inset: Boolean
  },

  render (h, { props, data }) {
    data.staticClass = (`v-divider ${data.staticClass || ''}`).trim()

    if (props.inset) data.staticClass += ' v-divider--inset'
    if (props.light) data.staticClass += ' theme--light'
    if (props.dark) data.staticClass += ' theme--dark'

    return h('hr', data)
  }
}
