module.exports = {
  getViewer: `query {
    Viewer {
      id
      name
      updatedAt
    }
  }
  `,
  getAnimeList: `query($id: Int) {
    MediaListCollection(userId: $id, type: ANIME) {
      lists {
        entries {
          media {
            title {
              romaji
            }
          }
        }
      }
    }
  }`,
};