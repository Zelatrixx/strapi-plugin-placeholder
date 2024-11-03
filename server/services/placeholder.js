'use strict';

const { getService } = require('../utils');
const fs = require('fs').promises;
const path = require('path');

module.exports = ({ strapi }) => ({
  /**
   * Generates a base64 placeholder image for the given image.
   * @param {string} url a local or remote image URL to generate a placeholder for
   * @returns {Promise<string>} a base64 encoded placeholder image
   */
  async generate(url) {
    try {
      const { getPlaiceholder } = await import('plaiceholder');
      const settings = getService(strapi, 'settings').get();
      const relativePath = url.replace(/^\/uploads/, '');
      const imagePath = path.join(strapi.dirs.static.public, 'uploads', relativePath);
      const buffer = await fs.readFile(imagePath);
      const { base64 } = await getPlaiceholder(buffer, settings);
      return base64;
    } catch (e) {
      strapi.log.error(e);
      return null;
    }
  },
});
