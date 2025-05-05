# Music Tracker API

## Descrição >>

O **Music Tracker API** é uma API RESTful construída com **Node.js** e **Express.js**, projetada para interagir com dados relacionados a músicas, utilizando a API do **Last.fm**. Ela permite que os usuários consultem informações sobre músicas, artistas, álbuns e playlists. A API também é protegida por **autenticação JWT (JSON Web Token)**, garantindo que apenas usuários autenticados possam acessar dados sensíveis.

Este projeto foi desenvolvido como parte do meu aprendizado em **desenvolvimento de APIs**, **segurança** e **integração com APIs externas**.

## Funcionalidades

- **Autenticação de usuários**:
  - Cadastro e login de usuários utilizando **JWT**.
  - Senhas armazenadas de forma segura com **bcrypt**.
  
- **Rota protegida**:
  - Acesso aos dados do usuário somente para usuários autenticados.

- **Integração com Last.fm**:
  - Consultas ao histórico de músicas do usuário.
  - Obtenção de informações sobre playlists, músicas, álbuns e artistas.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de execução para JavaScript no backend.
- **Express.js**: Framework para construção da API.
- **MongoDB**: Banco de dados NoSQL para armazenamento de dados de usuários.
- **Mongoose**: Biblioteca de modelagem de dados para o MongoDB.
- **JWT (JSON Web Token)**: Método de autenticação e verificação de usuários.
- **bcrypt.js**: Biblioteca para criptografia de senhas.
