const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(process.env.port || 3000, function(){
	console.log('app running');
});