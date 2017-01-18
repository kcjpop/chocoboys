import m from 'mithril'
import stream from 'mithril/stream'
import { getRestaurants } from 'restaurants/actions'
import Table from 'el/table'

const c = {}
c.list = stream([])

c.oninit = function (vnode) {
  getRestaurants().then(c.list)
}

c.view = function (vnode) {
  return m('',
    m('h1.c-heading', 'Restaurants'),
    m('p.c-paragraph', 'Here you can find all information about dishes served in all restaurants.'),
    m(Table, {
      items: c.list(),
      fields: [
        { name: 'name', classnames: 'c-table__cell--width-2' },
        { name: 'price', display: value => `${value} gil` },
        { name: 'location', classnames: 'c-table__cell--width-2' },
        'hp', 'atk', 'def', 'str', 'vit', 'spr', 'mag', 'exp'
      ]
    })
  )
}

export default c
