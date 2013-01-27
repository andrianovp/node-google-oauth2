should = require("chai").should()
request = require("request")
config = require("../config/config.js")
gAuth = require("../index.js")(config)
{inspect} = require 'util'

refresh_token = undefined
access_token = undefined

describe "Google Oauth", ->
    auth_code = undefined
    describe "#getAuthCode()", ->
        it "Responds with authorization code", (done) ->
            gAuth.authorizeApplication config.username, config.password, config.scope,(err, code) ->
                should.not.exist err
                should.exist code
                code.should.be.a "string"
                auth_code = code
                done()

    # describe "#getTokensForAuthCode()", ->
    #     it "Respond with access token adn a refresh token", (done) ->
    #         gAuth.getTokensForAuthCode auth_code, (err, body) ->
    #             should.not.exist err
    #             should.exist body
    #             body.should.be.an "object"
    #             
    #             should.exist body.access_token
    #             should.exist body.refresh_token
    #             
    #             done()
    # 
    # describe "#getAccessTokenForRefreshToken()", ->
    #     it "Respond with new access token, expiration time", (done) ->
    #         gAuth.getAccessTokenForRefreshToken refresh_token, (err, body) ->
    #             should.not.exist err
    #             should.exist body
    #             body.should.be.an "object"
    #             console.log inspect body
    #             should.exist body.access_token
    #             done()
