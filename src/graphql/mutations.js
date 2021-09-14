/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMusic = /* GraphQL */ `
  mutation CreateMusic(
    $input: CreateMusicInput!
    $condition: ModelMusicConditionInput
  ) {
    createMusic(input: $input, condition: $condition) {
      id
      title
      description
      filePath
      likes
      owner
      createdAt
      updatedAt
    }
  }
`;
export const updateMusic = /* GraphQL */ `
  mutation UpdateMusic(
    $input: UpdateMusicInput!
    $condition: ModelMusicConditionInput
  ) {
    updateMusic(input: $input, condition: $condition) {
      id
      title
      description
      filePath
      likes
      owner
      createdAt
      updatedAt
    }
  }
`;
export const deleteMusic = /* GraphQL */ `
  mutation DeleteMusic(
    $input: DeleteMusicInput!
    $condition: ModelMusicConditionInput
  ) {
    deleteMusic(input: $input, condition: $condition) {
      id
      title
      description
      filePath
      likes
      owner
      createdAt
      updatedAt
    }
  }
`;
