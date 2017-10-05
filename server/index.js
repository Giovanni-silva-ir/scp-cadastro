'use strict';

var admin = require('firebase-admin');

var sa = require('./my-key.json');

admin.initializeApp({
    credential: admin.credential.cert(sa),
    databaseURL: 'https://my-marketdata.firebaseio.com/'
});
var database = admin.database();
console.log(sa);
const localData = [{
        papel: 'FIBR5',
        rangeFrom: 52,
        rangeTo: 53,
        value: 53,
        desc: 'Fibria Celulose'
    },
    {
        papel: 'PETR4',
        rangeFrom: 14,
        rangeTo: 15,
        value: 15,
        desc: 'Petrobras'
    },
    {
        papel: 'TOYB4',
        rangeFrom: 7,
        rangeTo: 8,
        value: 8,
        desc: 'Tectoy'
    },
    {
        papel: 'VALE5',
        rangeFrom: 33,
        rangeTo: 35,
        value: 35,
        desc:'Vale do Rio Doce'
    },
];

const randomFromInterval = function (min, max) {
    return Math.random() * (max - min + 1) + min;
}

const generate = function () {
    localData.forEach(function (item) {
        const newValue = randomFromInterval(item.rangeFrom, item.rangeTo);
        item.value = newValue.toFixed(2);
    });
};

const updateDatabase = function(){
    generate();
    const updates = {};
    const uPath = '/papeis/';
    localData.forEach(function(item){
        updates[uPath + item.papel] = {
            simbolo: item.papel,
            descricao: item.desc,
            valorAtual: item.value
        };
    });
    admin.database().ref().update(updates);
};

setInterval(updateDatabase, 300);
