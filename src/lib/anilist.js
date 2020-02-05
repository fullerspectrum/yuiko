module.exports = {
  Viewer: `query {
    Viewer {
      id
      name
      updatedAt
    }
  }`,

  MediaListCollection: `query($id: Int) {
    animelist: MediaListCollection(userId: $id, type: ANIME) {
      lists {
        entries {
          id
          media {
            id
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
    mangalist: MediaListCollection(userId: $id, type: MANGA) {
      lists {
        entries {
          id
          media {
            id
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
