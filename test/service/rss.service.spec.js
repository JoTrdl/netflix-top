
'use strict';

const proxyquire = require('proxyquire');
const url = require('url');
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const DATA = `
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>

<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" >
  <channel>
    <title>Some category</title>
    <item>
      <title>Some movie title</title>
      <link>http://dvd.netflix.com/Movie/The-Martian/1234</link>
      <guid isPermaLink="true">http://dvd.netflix.com/Movie/The-Martian/1234</guid>
      <description>Some description</description>
    </item>
  </channel>
</rss>
`;

lab.experiment('Service', () => {

  lab.test('should return null if bad category', () => {
    const service = require(process.env.PWD + '/src/services/netflix.service');

    return service.fetch('bad category').then((data) => {
      Code.expect(data).to.be.null;
    });
  });

  lab.test('should fetch netflix rss', () => {
    const service = proxyquire(process.env.PWD + '/src/services/netflix.service', {
      'isomorphic-fetch': (url) => {
        Code.expect(url).to.be.a.string();

        return Promise.resolve({
          status: 200,
          text: () => {
            return Promise.resolve(DATA);
          }
        });
      }
    });

    return service.fetch('100').then((data) => {
      Code.expect(data).to.be.defined;
      Code.expect(data.title).to.be.a.string();
      Code.expect(data.items).to.be.an.array();

      Code.expect(data.items[0]).to.be.an.object();
      Code.expect(data.items[0].id).to.be.equal('1234');
      Code.expect(data.items[0].title).to.be.equal('Some movie title');
    });
  });

}); // Service
