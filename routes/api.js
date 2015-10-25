/////////////////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Philippe Leefsma 2014 - ADN/Developer Technical Services
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////////////////
var credentials =(require ('fs').existsSync ('credentials.js') ?
	  require('../credentials')
	: (console.log ('No credentials.js file present, assuming using CONSUMERKEY & CONSUMERSECRET system variables.'), require('../credentials_'))) ;
var express =require ('express') ;
var request =require ('request') ;

var router =express.Router () ;

///////////////////////////////////////////////////////////////////////////////
// Generates access token
///////////////////////////////////////////////////////////////////////////////
var authToken;
router.get ('/token', function (req, res) {
    request.post (
        credentials.Authentication,
        { form: credentials.credentials },
        function (error, response, body) {
            if ( !error && response.statusCode == 200 ) {
            	authToken = JSON.parse(body).access_token;
            	console.log(authToken);
                res.send (body) ;
            }
        }) ;
}) ;

router.get ('/newMap', function (req, res) {
	if(!authToken) {
		return res.send('Need to get <a href="/api/token">authToken</a> first');
	}

	var sys = require('sys')
	var exec = require('child_process').exec;
	var child;

	var strftime = require('strftime');
	filename = 'maze_' + strftime('%H_%M_%S') + '.stl';
	child = exec("openjscad jscad.js -o " + filename, function (error, stdout, stderr) {
		var generatedMap = stdout;
		if (error !== null) {
			console.error('exec error: ' + error);
		}

		fs = require('fs');
		fs.createReadStream(filename).pipe(request({
			url: credentials.BaseUrl + '/oss/v1/buckets/hackmcr/objects/' + filename, 
			method: 'PUT',
			headers: {
			    'Authorization': 'Bearer ' + authToken
			}
		}, function(error, response, body) {
			var info = JSON.parse(body);
			var id = info.objects[0].id;

			var idBuffer = new Buffer(id);
			var urn = idBuffer.toString('base64');

			request({
				url: credentials.BaseUrl + '/viewingservice/v1/register',
				method: 'POST',
				headers: {
				    'Authorization': 'Bearer ' + authToken
				},
				json: { urn: urn }
			}, function(error, response, body) {

				var currentMaze = fs.readFileSync("CurrentMaze.js", { encoding: 'utf8' }).replace(/(\n|\r)+$/, '');

				res.send(currentMaze);

				fs.writeFileSync('./www/urn.js', 'urn = "urn:' + urn +'"; ' + "\n" + ' maze = ' + currentMaze + ';');
			});
		}));
	});	
}) ;

module.exports =router ;
