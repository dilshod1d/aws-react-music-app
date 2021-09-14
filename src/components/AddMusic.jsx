import React, { useState } from 'react';
import PublishIcon from '@material-ui/icons/Publish';
import uniqid from 'uniqid';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { IconButton, TextField } from '@material-ui/core';
import { createMusic } from '../graphql/mutations';

const AddMusic = ({ onUpload }) => {
  const [musicDatas, setMusicDatas] = useState({});
  const [mp3Data, setMp3Data] = useState();
  const uploadMusic = async () => {
    const { key } = await Storage.put(`${uniqid()}.mp3`, mp3Data, {
      contentType: 'audio/mp3',
    });
    const { title, description, owner } = musicDatas;
    const musicInput = {
      id: uniqid(),
      title,
      description,
      owner,
      filePath: key,
      likes: 0,
    };
    await API.graphql(graphqlOperation(createMusic, { input: musicInput }));
    onUpload();
  };

  return (
    <div style={{ alignSelf: 'center' }}>
      <TextField
        label='Title'
        onChange={(e) => {
          setMusicDatas({ ...musicDatas, title: e.target.value });
        }}
      />
      <TextField
        label='Artist'
        onChange={(e) => {
          setMusicDatas({ ...musicDatas, owner: e.target.value });
        }}
      />
      <TextField
        label='Description'
        onChange={(e) => {
          setMusicDatas({ ...musicDatas, description: e.target.value });
        }}
      />
      <input
        type='file'
        accept='audio/mp3'
        onChange={(e) => setMp3Data(e.target.files[0])}
      />
      <IconButton onClick={uploadMusic}>
        <PublishIcon />
      </IconButton>
    </div>
  );
};
export default AddMusic;
