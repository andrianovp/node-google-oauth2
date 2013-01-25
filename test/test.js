var should = require('chai').should();
var request = require("request");
var config = require('../config/config.js');

var gAuth = require('../index.js')(config);

var refresh_token = config.refresh_token;
var access_token;

describe('Google Oauth', function(){
  
  var auth_code;

  if (!refresh_token) {
      describe('#getAuthCode()', function(){
        it('Responds with authorization code', function(done){
          gAuth.getAuthCode(function(err, code){
            should.not.exist(err);
            should.exist(code);
            code.should.be.a('string');
            auth_code = code;
            done();
          });
         });
      });
  
      describe('#getToken()', function(){
        it('Respond with access token, refresh token, etc', function(done){
          gAuth.getToken(auth_code, function(err, body){
            should.not.exist(err);
            should.exist(body);
            body.should.be.an('object');
            //body.should.have.length(5);
            access_token = body.access_token;
            refresh_token = body.refresh_token;
            console.log("STORE this refresh_token: " + refresh_token);
  
            //Add value tests
            done();
          });
        });
      });
  }
  
  describe('#refreshToken()', function(){
    it('Respond with new access token, expiration time, etc', function(done){
      gAuth.refreshToken(refresh_token, function(err, body){
        should.not.exist(err);
        should.exist(body);
        body.should.be.an('object');
        //body.should.have.length(4);
        access_token = body.access_token;
        console.log("access_token: " + access_token);
         
        var getChunk = function(link) {
            console.log(link);
            request.get({
                url: link,
                headers: {
                    "Authorization": "Bearer " + access_token,
                    "Content-Type": "application/json"
                }
            }, myCallback);
        }
        var myCallback = function(err, res, body){
            if (err) {
                console.log("err:" + err);
                return done();
            }
            console.log(body);
            var o = JSON.parse(body);
            console.log(o.items.length + " items");
            var nextLink = o.nextLink;
            if (nextLink) {
                getChunk(nextLink);
            } else {
                done();
            }
        };
        var link = "https://www.googleapis.com/drive/v2/files";
        getChunk(link);
     });
   });
  });
});



