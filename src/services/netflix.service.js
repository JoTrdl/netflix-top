'use strict';

const Promise = require('bluebird'),
      xml2js = Promise.promisify(require('xml2js').parseString),
      fetch = require('isomorphic-fetch');

const CATEGORIES = {
  '100': 'http://dvd.netflix.com/Top100RSS',
  new: 'http://dvd.netflix.com/NewReleasesRSS',
  action: 'http://dvd.netflix.com/Top25RSS?gid=296',
  anime: 'http://dvd.netflix.com/Top25RSS?gid=623',
  children: 'http://dvd.netflix.com/Top25RSS?gid=302',
  classic: 'http://dvd.netflix.com/Top25RSS?gid=306',
  comedy: 'http://dvd.netflix.com/Top25RSS?gid=307',
  documentary: 'http://dvd.netflix.com/Top25RSS?gid=864',
  drama: 'http://dvd.netflix.com/Top25RSS?gid=315',
  faith: 'http://dvd.netflix.com/Top25RSS?gid=2108',
  foreign: 'http://dvd.netflix.com/Top25RSS?gid=2514',
  gay: 'http://dvd.netflix.com/Top25RSS?gid=330',
  horror: 'http://dvd.netflix.com/Top25RSS?gid=338',
  independent: 'http://dvd.netflix.com/Top25RSS?gid=343',
  music: 'http://dvd.netflix.com/Top25RSS?gid=2310',
  romance: 'http://dvd.netflix.com/Top25RSS?gid=371',
  fantasy: 'http://dvd.netflix.com/Top25RSS?gid=373',
  special: 'http://dvd.netflix.com/Top25RSS?gid=2223',
  sports: 'http://dvd.netflix.com/Top25RSS?gid=2190',
  shows: 'http://dvd.netflix.com/Top25RSS?gid=2197',
  thriller: 'http://dvd.netflix.com/Top25RSS?gid=387'
};

exports.fetch = function(category) {
  const url = CATEGORIES[category];

  if (!url) {
    return Promise.resolve();
  }

  return fetch(url)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error(response);
      }
      return response.text();
    })
    .then(xml => xml2js(xml))
    .then(payload => {
      let title = payload.rss.channel[0].title[0],
          items = payload.rss.channel[0].item;

      items = items.map((item) => {
        return {
          id: item.link[0].split('/').pop(),
          title: item.title[0],
          link: item.link[0],
          description: item.description[0].replace(/<(?:.|\n)*?>/gm, '')
        }
      });

      return {
        title: title,
        items: items
      }
    });
}