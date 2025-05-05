import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import authRoutes from './routes/authRoutes.js';
import verifyToken from './middleware/verifyToken.js';
import { getTrackHistory, getPlaylist, getSongInfo, getAlbumInfo, getArtistInfo } from './routes/lastfmRoutes.js';
import User from './models/Users.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Conectar ao banco de dados
connectDB();

// Teste de conexão com o banco
app.get('/test-db', async (req, res) => {
  try {
    const user = new User({
      email: 'teste@api.com',
      password: '123456',
      username: 'bia123'
    });

    await user.save();
    res.status(201).json({ message: 'Usuário salvo no banco com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Middleware de autenticação
app.use('/auth', authRoutes);

// Rota protegida
app.get('/user/data', verifyToken, (req, res) => {
  res.json({ message: `Dados do usuário ${req.user.username}` });
});

// Rotas do Last.fm
app.get('/user/:userName/trackHistory', getTrackHistory);
app.get('/playlist/:playlistName', getPlaylist);
app.get('/song/:songName', getSongInfo);
app.get('/album/:albumName/artist/:artistName', getAlbumInfo);
app.get('/artist/:artistName', getArtistInfo);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
