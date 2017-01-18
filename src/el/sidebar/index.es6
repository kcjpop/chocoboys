import m from 'mithril'
import classnames from 'classnames'
import { map } from 'lodash'
import styles from './styles.styl'

const c = {}
c.links = [
  { href: '/items', text: 'Items' },
  { href: '/weapons', text: 'Weapons' },
  { href: '/accessories', text: 'Accessories' },
  { href: '/recipehhh', text: 'Recipehhh' },
  { href: '/restaurants', text: 'Restaurants' },
  { href: '/quests', text: 'Quests' },
  { href: '/dungeons', text: 'Dungeons' },
]
c.view = function (vnode) {
  return m('.sidebar',
    m('ul.sidebar-nav', map(c.links, link =>
      m('li', m(`a.sidebar-nav__link[href=${link.href}]`, {
        class: classnames({ 'sidebar-nav__link--active': link.href === m.route.get() }),
        oncreate: m.route.link
      }, link.text))
    ))
  )
}

export default c
