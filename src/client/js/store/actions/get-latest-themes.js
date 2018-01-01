import {cloneDeep} from 'lodash'
import {getLatestThemes} from './helpers/remotes/queries'
import db, {upsert} from '../db'

export default async ({commit, getters}, id) => {
  commit('loading', true)

  try {
    const themes = db.getCollection('themes')
    const users = db.getCollection('users')
    const {data} = await getLatestThemes(id)
    const {latestThemes} = data

    latestThemes.forEach((theme) => {
      const savedTheme = cloneDeep(theme)

      upsert(users, savedTheme.user)
      savedTheme.user = {
        '_id': theme.user._id
      }
      upsert(themes, savedTheme)
    })
    commit('loading', false)
    commit('actionError', null)
    return latestThemes
  } catch (error) {
    commit('loading', false)
    commit('actionError', error)
  }
}
