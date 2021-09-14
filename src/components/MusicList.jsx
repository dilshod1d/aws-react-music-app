import React, { useState, useEffect } from 'react';
import { listMusic } from '../graphql/queries';
import { updateMusic } from '../graphql/mutations';
import { Paper, IconButton } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { PauseCircleFilledRounded } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import ReactPlayer from 'react-player';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import AddMusic from './AddMusic';
function MusicList({ loggedIn }) {
  const [music, setMusic] = useState([]);
  const [isPlaying, setIsPlaying] = useState('');
  const [musUrl, setMusUrl] = useState('');
  const [showAddMusic, setShowAddMusic] = useState(false);
  useEffect(() => {
    fetchMusic();
  }, []);
  const fetchMusic = async () => {
    try {
      const musicData = await API.graphql(graphqlOperation(listMusic));
      const musicList = musicData.data.listMusic.items;
      setMusic(musicList);
    } catch (error) {
      console.log(error);
    }
  };
  const adLike = async (idx) => {
    try {
      const musicById = music[idx];
      musicById.likes = musicById.likes + 1;
      delete musicById.createdAt;
      delete musicById.updatedAt;
      const musicData = await API.graphql(
        graphqlOperation(updateMusic, { input: musicById })
      );
      const newMusicList = [...music];
      newMusicList[idx] = musicData.data.updateMusic;
      setMusic(newMusicList);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMusic = async (idx) => {
    if (isPlaying === idx) {
      setIsPlaying('');
      return;
    }
    const musicFilePath = music[idx].filePath;
    try {
      const fileAccessUrl = await Storage.get(musicFilePath, { expires: 60 });
      console.log(fileAccessUrl);
      setMusUrl(fileAccessUrl);
    } catch (error) {
      console.log(' error accessing file error', error);
      setMusUrl('');
      setIsPlaying('');
    }
    setIsPlaying(idx);
    return;
  };
  return (
    <div>
      <div className='musicList'>
        {music.map((item, idx) => (
          <Paper variant='outlined' elevation={2} key={`item${idx}`}>
            <div className='songCard'>
              <IconButton aria-label='play' onClick={() => toggleMusic(idx)}>
                {isPlaying === idx ? (
                  <PauseCircleFilledRounded />
                ) : (
                  <PlayArrowIcon />
                )}
              </IconButton>
              <div>
                <div className='songTitle'>{item.title}</div>
                <div className='songOwner'>{item.owner}</div>
              </div>
              <div>
                <IconButton aria-label='like' onClick={() => adLike(idx)}>
                  <FavoriteIcon />
                </IconButton>
                {item.likes}
              </div>
              <div className='songDescription'>{item.description}</div>
            </div>
            {isPlaying === idx ? (
              <div className='audioPlayer'>
                <ReactPlayer
                  url={musUrl}
                  controls
                  playing
                  height='50px'
                  onPause={() => toggleMusic(idx)}
                />
              </div>
            ) : null}
          </Paper>
        ))}
        ;
        {showAddMusic ? (
          <AddMusic
            onUpload={() => {
              setShowAddMusic(false);
              fetchMusic();
            }}
          />
        ) : (
          <IconButton
            onClick={() => {
              setShowAddMusic(true);
            }}
          >
            <AddIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
}

export default MusicList;
