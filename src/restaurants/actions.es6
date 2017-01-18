import { api, req } from 'helpers'

export const getRestaurants = _ => req({
  url: api('menu.json')
})
