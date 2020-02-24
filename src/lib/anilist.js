module.exports = {
  Viewer: `query {
    Viewer {
      id
      name
      updatedAt
    }
  }`,

  MediaListCollection: `query MediaListCollection($id: Int) {
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

  updateEntryProgress: `mutation($id: Int, $progress: Int) {
    SaveMediaListEntry(id: $id, progress: $progress) {
      progress
      status
    }
  }`,
};
