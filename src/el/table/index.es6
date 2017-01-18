import m from 'mithril'
import { orderBy, map, assign, capitalize } from 'lodash'
import classnames from 'classnames'
import Icons from 'helpers/icons'
import styles from './styles.styl'

const SORT_ASC = 'asc'
const SORT_DESC = 'desc'

const c = {}
c.sorts = { field: null, direction: 'desc' }

c.processItems = items => {
  if (c.sorts.field != null) {
    return orderBy(items, [c.sorts.field], [c.sorts.direction])
  }

  return items
}

c.doSortBy = field => e => {
  e.preventDefault()

  c.sorts = assign({}, c.sorts, { field, direction: c.sorts.direction === SORT_ASC ? SORT_DESC : SORT_ASC })
}

c.getSortDirectionIcon = field => {
  if (c.sorts.field === field) {
    return c.sorts.direction === SORT_ASC ? Icons.arrowDown : Icons.arrowUp
  }
  return null
}

const normalizeFieldOptions = field =>
  typeof field === 'object' && field.name != null
    ? field
    : { name: field }

const extractFunctionFromFieldOptions = (options, fname, default_ = v => v) =>
  options[fname] && typeof options[fname] === 'function'
    ? options[fname]
    : default_

const makeBody = ({ items, fields }) => {
  return m('.c-table__body', map(c.processItems(items), item =>
    m('.c-table__row', map(fields, field => {
      const options = normalizeFieldOptions(field)
      const display = extractFunctionFromFieldOptions(field, 'display')
      const value = item[options.name]

      return m('.c-table__cell', {
        class: classnames(options.classnames)
      }, display(value))
    }))
  ))
}

const makeHeader = ({ fields }) => {
  return m('.c-table__row', map(fields, field => {
    const options = normalizeFieldOptions(field)
    const { width, name } = options
    const display = extractFunctionFromFieldOptions(options, 'header', capitalize)

    return m('.c-table__cell.c-table__cell--head', {
      onclick: c.doSortBy(name),
      class: classnames(options.classnames)
    }, display(name), ' ', c.getSortDirectionIcon(name))
  }))
}

c.view = vnode => {
  return m('.c-table', makeHeader(vnode.attrs), makeBody(vnode.attrs))
}

export default c
