var maxmind=require('maxmind');

maxmind.init('/tmp/GeoLiteCity.dat');

var location = maxmind.getLocation('66.6.44.4');

console.log(location);