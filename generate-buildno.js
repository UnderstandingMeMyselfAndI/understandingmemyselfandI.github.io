//var fs = require('fs');
import fs from 'fs';
console.log('Incrementing build number...');
fs.readFile('public/metadata.json', function (err, content) {
	if (err) throw err;
	var metadata = JSON.parse(content);
	metadata.buildRevision = metadata.buildRevision + 1;
	fs.writeFile(
		'public/metadata.json',
		JSON.stringify(metadata),
		function (err) {
			if (err) throw err;
			console.log(
				`Current build number: ${metadata.buildMajor}.${metadata.buildMinor}.${metadata.buildRevision} ${metadata.buildTag}`
			);
		}
	);
});
fs.readFile('src/metadata.json', function (err, content) {
	if (err) throw err;
	var metadata = JSON.parse(content);
	metadata.buildRevision = metadata.buildRevision + 1;
	fs.writeFile('src/metadata.json', JSON.stringify(metadata), function (err) {
		if (err) throw err;
		console.log(
			`Current build number: ${metadata.buildMajor}.${metadata.buildMinor}.${metadata.buildRevision} ${metadata.buildTag}`
		);
	});
});
