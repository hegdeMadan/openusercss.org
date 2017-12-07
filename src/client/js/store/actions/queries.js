import gql from 'graphql-tag'

const themePropList = `
  _id,
  title,
  description,
  content,
  createdAt,
  lastUpdate,
  rating,
  scope,
  version
`

const userPropList = `
  _id,
  displayname,
  username,
  avatarUrl,
  smallAvatarUrl,
  lastSeen,
  lastSeenReason
`

export const verifyToken = ({token}) => gql(`{
  verifyToken(token: "${token}") {
    user {
      ${userPropList}
    },
    token,
    ip,
    ua
  }
}`)

export const theme = ({id}) => gql(`
  query {
    theme(id: "${id}") {
      user {
        _id,
        displayname
      },
      ${themePropList}
    }
  }
`)

export const user = ({id}) => gql(`
  query {
    user(id: "${id}") {
      themes {
        ${themePropList}
      },
      ${userPropList}
    }
  }
`)

export const latestThemes = ({limit}) => gql(`
  query {
    latestThemes(limit: ${limit}) {
      user {
        ${userPropList}
      },
      ${themePropList}
    }
  }
`)
