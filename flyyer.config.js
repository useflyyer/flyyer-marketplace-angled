// Created with create-flyyer-app@2.1.2

const {config} = require('@flyyer/types');
require('dotenv').config();

module.exports = config({
  engine: 'react-typescript',
  key: process.env.FLYYER_KEY,
  deck: 'angled',

  // Optionals
  name: 'Angled',
  description: 'Created with create-flyyer-app',
  private: true, // Set to false to deploy publicly to https://flyyer.io/community
  sizes: ['THUMBNAIL', 'BANNER', 'SQUARE', 'STORY'] // Declare supported sizes
});
