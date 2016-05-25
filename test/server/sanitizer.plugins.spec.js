
'use strict';

const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const Server = require(process.env.PWD + '/src/server');

lab.experiment('Plugins', () => {
  let server;

  lab.before(() => {
    return Server.then((instance) => {
      server = instance;
    });
  });

  lab.experiment('Sanitizer', () => {

    lab.test('should sanitize inputs', () => {

      server.route({
        method: 'POST',
        path: '/test-route',
        config: {
          plugins: {
            sanitizer: {
              payload: {
                email: 'normalize_email',
                link: 'strip_links',
                escaped: 'escape'
              }
            }
          }
        },
        handler: (request, reply) => {
          reply(request.payload);
        }
      });

      return server.inject({
        method: "POST",
        url: "/test-route",
        payload: {
          email: 'email+foo@gmail.com',
          link: 'a <a href="http://foo.com">link</a> value',
          escaped: '<script>'
        }
      }).then((response) => {
        
        const result = JSON.parse(response.payload);

        Code.expect(response.statusCode).to.equal(200);
        Code.expect(result.email).to.equal('email@gmail.com');
        Code.expect(result.link).to.equal('a link value');
        Code.expect(result.escaped).to.equal('&lt;script&gt;');
      });
    });
  }); // Sanitizer
}); // Plugins
