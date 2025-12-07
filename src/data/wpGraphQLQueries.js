
query tools {
  tools(first: 0, last: 1000) {
    nodes {
      id
      databaseId
      title
      ... on WithAcfToolFieldGroup {
        toolFieldGroup {
          description
          letters {
            letter
            meaning
          }
          scenariosField {
            nodes {
              id
            }
          }
          videosField {
            nodes {
              id
            }
          }
          podcastsField {
            nodes {
              id
            }
          }
        }
      }
    }
  }
}
query videos {
  videos(first: 0, last: 1000) {
    nodes {
      id
      databaseId
      title
      ... on Video {
        videosFieldGroup {
          description
          url
          duration {
            hours
            minutes
            seconds
          }
        }
      }
    }
  }
}

query podcasts {
  podcasts(first: 0, last: 1000) {
    nodes{
      id
      databaseId
      title
      ...on Podcast{
        podcastsFieldGroup{
          description
          url
          duration {
            hours
            minutes
            seconds
          }
        }
      }
    }
  }
}

query scenarios {
  scenarios(first: 0, last: 1000) {
    nodes{
      id
      databaseId
      title
      ...on Scenario{
        scenariosFieldGroup{
          description
          buttonLabel
        }
      }
    }
  }
}

query feelings {
  feelings(first: 0, last: 1000) {
    nodes {
      databaseId
      id
      name
      description
    }
  }
}
query thoughts {
  thoughts(first: 0, last: 1000) {
    nodes {
      databaseId
      id
      name
      description
    }
  }
}
query emotions {
  emotions(first: 0, last: 1000) {
    nodes {
      databaseId
      id
      name
      description
    }
  }
}
query techniques {
  techniques(first: 0, last: 1000) {
    nodes {
      databaseId
      id
      name
      description
    }
  }
}
query therapies {
  therapies(first: 0, last: 1000) {
    nodes {
      databaseId
      id
      name
      description
    }
  }
}