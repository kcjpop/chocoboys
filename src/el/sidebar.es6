import m from 'mithril'

const c = {}
c.controller = function () {

}

c.view = function (ctrl) {
  return m('.sidebar',
    m('ul.sidebar-nav',
    m('li', m('a[href=/items]', { oncreate: m.route.link }, 'Items')),
    m('li', m('a[href=/weapons]', { oncreate: m.route.link }, 'Weapons')),
    m('li', m('a[href=/accessories]', { oncreate: m.route.link }, 'Accessories')),
      m('li', m('a[href=/recipehhh]', { oncreate: m.route.link }, 'Recipehhh')),
      m('li', m('a[href=/restaurants]', { oncreate: m.route.link }, 'Restaurants')),
      m('li', m('a[href=/quests]', { oncreate: m.route.link }, 'Quests')),
      m('li', m('a[href=/dungeons]', { oncreate: m.route.link }, 'Dungeons'))
    )
  )
}

export default c
