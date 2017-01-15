import m from 'mithril'
import Sidebar from 'el/sidebar'
import styles from 'styles/index.styl'

styles.noop

m.mount(document.body, {
  view () {
    return m('',
      m(Sidebar)
    )
  }
})
