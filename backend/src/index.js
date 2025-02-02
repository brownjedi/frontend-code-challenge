#!/usr/bin/env node
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const fs = require('fs');
const _ = require('lodash');
const { createProxyMiddleware } = require('http-proxy-middleware');
const pokemonsData = require('./pokemons');

const PORT = 4000;
const BASE_URL = `http://localhost:${PORT}`;

const typeDefs = fs.readFileSync(`${__dirname}/schema.graphql`, 'utf-8');
let favorites = new Map();

const app = express();
app.get('/sounds/:id', (req, res) => res.sendFile(`${__dirname}/sounds/${req.params.id}.mp3`));
app.use(
  '/img',
  createProxyMiddleware({
    target: 'https://img.pokemondb.net',
    changeOrigin: true,
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    },
    pathRewrite: {
      '^/img': '/', // remove base path
    },
  })
);

const convertNametoFileName = (name) => {
  return name.toLowerCase().replace(/[&\\/\\\\#,+()$~%.'":*?<>{}]/g, '').replace(' ', '-')
}

const resolvers = {
  Query: {
    pokemons: (__, args) => {
      const { limit, offset, search, filter } = args.query;
      let pokemons = pokemonsData;

      if (search) {
        const regex = new RegExp(search, 'i');
        pokemons = _.filter(pokemons, p => p.name.match(regex));
      }

      if (filter) {
        if (filter.type) {
          const regex = new RegExp(filter.type, 'i');
          pokemons = _.filter(pokemons,p => _.some(p.types, t => t.match(regex)));
        }

        if (filter.isFavorite) {
          pokemons = _.filter(pokemons, p => !!favorites.get(p.id));
        }
      }

      const count = pokemons.length;
      const edges = pokemons.slice(offset, offset + limit);

      return {
        limit,
        offset,
        count,
        edges
      }
    },
    pokemonById: (_, args) => pokemonsData.find(pokemon => pokemon.id === args.id),
    pokemonByName: (_, args ) => pokemonsData.find(pokemon => pokemon.name.toLowerCase() === args.name.toLowerCase()),
    pokemonTypes: () => _.uniq(_.flatMap(pokemonsData, pokemon => pokemon.types))
  },
  Mutation: {
    favoritePokemon: (_, args) => {
      const pokemon = pokemonsData.find(pokemon => pokemon.id === args.id);
      if (!pokemon) throw Error("Pokemon not found");
      favorites.set(args.id, true);
      return pokemon;
    },
    unFavoritePokemon: (_, args) => {
      const pokemon = pokemonsData.find(pokemon => pokemon.id === args.id);
      if (!pokemon) throw Error("Pokemon not found");
      favorites.set(args.id, false);
      return pokemon;
    }
  },
  Pokemon: {
    number: pokemon => parseInt(pokemon.id, 10),
    image: pokemon => `${BASE_URL}/img/artwork/vector/large/${convertNametoFileName(pokemon.name)}.png`,
    sound: pokemon => `${BASE_URL}/sounds/${parseInt(pokemon.id, 10)}`,
    evolutions: pokemon => _.map(pokemon.evolutions || [], ev => ({...ev, id: _.padStart(ev.id, 3, '0')})),
    isFavorite: pokemon => !!favorites.get(pokemon.id),
    sprites: pokemon => ({
      normal: `${BASE_URL}/img/sprites/black-white/normal/${convertNametoFileName(pokemon.name)}.png`,
      animated:  `${BASE_URL}/img/sprites/black-white/anim/normal/${convertNametoFileName(pokemon.name)}.gif`,
    })
  },
  PokemonAttack: {
    fast: pokemonAttack => pokemonAttack.fast || [],
    special: pokemonAttack => pokemonAttack.special || []
  }
};

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });
  
  app.listen({ port: PORT }, () => {
    console.log(`🚀  Pokemon GraphQL server running at ${BASE_URL}${server.graphqlPath}`);
  });
}

startServer()

