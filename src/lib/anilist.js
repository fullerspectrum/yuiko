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
            format
            episodes
          }
          progress
          score
        }
        name
        isCustomList
        isSplitCompletedList
        status
      }
      hasNextChunk
    }
  }`,
  getMangaList: `query($id: Int) {
    MediaListCollection(userId: $id, type: MANGA) {
      lists {
        entries {
          media {
            title {
              romaji
            }
            format
            episodes
          }
          progress
          score
        }
        name
        isCustomList
        isSplitCompletedList
        status
      }
      hasNextChunk
    }
  }`,
};
