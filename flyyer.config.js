// Created with create-flyyer-app@2.1.2

const {config} = require('@flyyer/types');
const {default: endent} = require('endent');
require('dotenv').config();

module.exports = config({
  engine: 'react-typescript',
  key: process.env.FLYYER_KEY,
  deck: 'angled',

  // Optionals
  name: 'Angled',
  description: endent`
    Template we use in our landing page.

    No affiliation with Nintendo is intended, this is just an example.

    Image credits to: [Photo by KoolShooters from Pexels](https://www.pexels.com/photo/two-young-women-having-fun-7142962)
  `,
  homepage: 'https://www.flyyer.io',
  license: 'MIT',
  repository: 'https://github.com/useflyyer/flyyer-marketplace-angled',
  keywords: ['official', 'ecommerce'],
  private: false, // Set to false to deploy publicly to https://flyyer.io/community
  sizes: ['THUMBNAIL', 'BANNER', 'SQUARE', 'STORY'] // Declare supported sizes
});
