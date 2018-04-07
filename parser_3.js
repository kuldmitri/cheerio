const request = require('request');
const fs = require('fs');
const cheerio = require('cheerio');

// request({uri: 'https://icowatchlist.com/upcoming', method: 'GET', encoding: 'binary'},
//     function (err, res, page) {
//         fs.writeFileSync('upcoming', page);
//
//         // let $ = cheerio.load(page);
//     });

let fileContext = fs.readFileSync('upcoming', 'utf-8');
$ = cheerio.load(fileContext);

let rows = $('table.main-ico-table:not(.junior):not(.titles-table) tr');
console.log(rows.length);

let arr = $(rows).map((i, elem) => {
    let obj = {};
    obj.info = $(elem).find('p.project-info').html();
    obj.date = $(elem).find('div.datetime-div').children().eq(0).find('p b').text();
    obj.time = $(elem).find('div.datetime-div').children().eq(1).find('p b').text();
    obj.days = $(elem).find('div.time-unit-div').map((i, elem) => {
        return $(elem).find('p.project-time').text()
    }).get();
    return obj;
}).get();

fs.writeFileSync('upcoming.json', JSON.stringify(arr, null, 4));

console.log(arr);