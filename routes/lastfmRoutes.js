import express from 'express';
import axios from 'axios';

const LASTFM_API_KEY = 'e719a5b69ec5e67f797962376d8aa166';

// Função para obter o histórico de faixas do usuário
export const getTrackHistory = async (req, res) => {
    const { userName } = req.params;
  
    try {
      const response = await axios.get('http://ws.audioscrobbler.com/2.0/', {
        params: {
          method: 'user.getrecenttracks',
          user: userName,
          api_key: LASTFM_API_KEY,
          limit: 10,  // Limita a quantidade de faixas retornadas
          format: 'json',
        },
      });
  
      const tracks = response.data.recenttracks.track;
  
      res.json(tracks.map(track => ({
        artist: track.artist['#text'],
        name: track.name,
        album: track.album['#text'],
        timestamp: track.date?.uts,  // Timestamp de quando a faixa foi scrobblada
      })));
    } catch (error) {
      console.error('Erro ao buscar histórico do usuário:', error.message);
      res.status(500).send('Erro ao buscar histórico do usuário');
    }
  };
  
  // Função para obter playlist (ou dados de top tracks)
  export const getPlaylist = async (req, res) => {
    const { playlistName } = req.params;
  
    try {
      const response = await axios.get('http://ws.audioscrobbler.com/2.0/', {
        params: {
          method: 'chart.gettoptracks',
          api_key: LASTFM_API_KEY,
          limit: 10,
          format: 'json',
        },
      });
  
      const topTracks = response.data.tracks.track;
  
      res.json(topTracks.map(track => ({
        artist: track.artist.name,
        name: track.name,
        url: track.url,
        image: track.image[2]['#text'],  // Imagem do álbum
      })));
    } catch (error) {
      console.error('Erro ao buscar playlists:', error.message);
      res.status(500).send('Erro ao buscar playlists');
    }
  };
  
  // Função para obter informações sobre uma música específica
  export const getSongInfo = async (req, res) => {
    const { songName } = req.params;
  
    try {
      const response = await axios.get('http://ws.audioscrobbler.com/2.0/', {
        params: {
          method: 'track.getinfo',
          track: songName,
          api_key: LASTFM_API_KEY,
          format: 'json',
        },
      });
  
      const track = response.data.track;
  
      res.json({
        name: track.name,
        artist: track.artist.name,
        listeners: track.listeners,
        playcount: track.playcount,
        tags: track.toptags.tag.map(tag => tag.name),  // Tags populares associadas à música
        url: track.url,
        image: track.image[2]['#text'],  // Imagem do álbum
      });
    } catch (error) {
      console.error('Erro ao buscar música:', error.message);
      res.status(500).send('Erro ao buscar música');
    }
  };

// Função para obter informações sobre o álbum
export const getAlbumInfo = async (req, res) => {
    const { albumName, artistName } = req.params;
    
    try {
      const response = await axios.get(`https://ws.audioscrobbler.com/2.0/`, {
        params: {
          method: 'album.getinfo',
          api_key: API_KEY,
          album: albumName,
          artist: artistName,
          format: 'json'
        }
      });
  
      if (response.data.album) {
        res.json(response.data.album);
      } else {
        res.status(404).json({ message: 'Álbum não encontrado' });
      }
    } catch (err) {
      console.error('Erro ao buscar informações do álbum:', err);
      res.status(500).send('Erro ao obter informações do álbum');
    }
  };
// Função para obter informações sobre o artista
export const getArtistInfo = async (req, res) => {
    const { artistName } = req.params;
  
    try {
      const response = await axios.get('https://ws.audioscrobbler.com/2.0/', {
        params: {
          method: 'artist.getinfo',
          api_key: API_KEY,
          artist: artistName,
          format: 'json'
        }
      });
  
      if (response.data.artist) {
        res.json(response.data.artist);
      } else {
        res.status(404).json({ message: 'Artista não encontrado' });
      }
    } catch (err) {
      console.error('Erro ao buscar informações do artista:', err);
      res.status(500).send('Erro ao obter informações do artista');
    }
  };

  
  
  
  
    