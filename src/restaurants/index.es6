import m from 'mithril'
import stream from 'mithril/stream'
import map from 'lodash/map'
import { getRestaurants } from 'restaurants/actions'

const c = {}
c.list = stream([])
c.oninit = function (vnode) {
  getRestaurants().then(c.list)
}

c.view = function (vnode) {
  const table = m('.c-table',
    m('.c-table__row',
      m('.c-table__group.c-table__group--width-2',
        m('.c-table__cell.c-table__cell--head.c-table__cell--width-2', 'Name'),
        m('.c-table__cell.c-table__cell--head', 'Price'),
        m('.c-table__cell.c-table__cell--head.c-table__cell--width-2', 'Location')
      ),
      m('.c-table__group',
        m('.c-table__cell.c-table__cell--head', 'HP'),
        m('.c-table__cell.c-table__cell--head', 'ATK'),
        m('.c-table__cell.c-table__cell--head', 'DEF'),
        m('.c-table__cell.c-table__cell--head', 'STR')
      ),
      m('.c-table__group',
        m('.c-table__cell.c-table__cell--head', 'VIT'),
        m('.c-table__cell.c-table__cell--head', 'SPR'),
        m('.c-table__cell.c-table__cell--head', 'MAG'),
        m('.c-table__cell.c-table__cell--head', 'EXP')
      ),
      m('.c-table__group',
        m('.c-table__cell.c-table__cell--head', 'Effects')
      ),
    ),
    m('.c-table__body', map(c.list(), dish =>
      m('.c-table__row',
        m('.c-table__group.c-table__group--width-2',
          m('.c-table__cell.c-table__cell--width-2', dish.name),
          m('.c-table__cell', `${dish.price} gil`),
          m('.c-table__cell.c-table__cell--width-2', dish.location)
        ),
        m('.c-table__group',
          m('.c-table__cell', dish.hp),
          m('.c-table__cell', dish.atk),
          m('.c-table__cell', dish.def),
          m('.c-table__cell', dish.str)
        ),
        m('.c-table__group',
          m('.c-table__cell', dish.vit),
          m('.c-table__cell', dish.spr),
          m('.c-table__cell', dish.mag),
          m('.c-table__cell', dish.exp)
        ),
        m('.c-table__group',
          m('.c-table__cell', dish.effects)
        )
      )
    ))
  )

  return m('',
    m('h1.c-heading', 'Restaurants'),
    m('p.c-paragraph', 'Here you can find all information about dishes served in all restaurants.'),
    table
  )
}

export default c
