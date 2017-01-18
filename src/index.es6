import m from 'mithril'
import styles from 'styles/index.styl'
import Sidebar from 'el/sidebar'
import Restaurants from 'restaurants/index'
import Home from 'home'

styles.noop

const Layout = {
  view (vnode) {
    return m('.o-container--super.app',
      m('section.o-grid',
        m('aside.o-grid__cell.o-grid__cell--width-15', m(Sidebar)),
        m('main.o-grid__cell.o-grid__cell--width-85', vnode.children)
      )
    )
  }
}

const layoutize = children => {
  return {
    view () {
      return m(Layout, m(children))
    }
  }
}

m.route(document.body, '/', {
  '/': layoutize(Home),
  '/restaurants': layoutize(Restaurants)
})
