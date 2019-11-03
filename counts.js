var fs = require('fs');

var args = process.argv.slice(2);

if (args.length < 2) {
  return console.log("Not enough arguments. Usage: `node counts.js <dataFile> <countFile>`")
}
var dataFile = args[0];
var countsFile = args[1];

fs.readFile(dataFile, 'utf8', function(err, contents) {
  var maxNGram = 3
  var counts = {}

  contents.split(/\n/).forEach(line => {
    if (line.length) {
      var content = line.toLowerCase().replace(/[^a-z]/g, '')
      for (var length = maxNGram; length > 0; length--) {
        var paddingLength = length - 1;
        // pad with ^ (start of line) and $ (end of line) characters
        paddedLine = '^'.repeat(paddingLength) + content + '$'.repeat(paddingLength)
        for (var pos = 0; pos < paddedLine.length - paddingLength; pos++) {
          var nGram = paddedLine.slice(pos, pos + length);
          if (!counts[nGram]) {
            counts[nGram] = 0;
          }
          counts[nGram]++;
        }
      }
    }
  })

  fs.writeFile(countsFile, JSON.stringify(counts), function(err) {
    if (err) {
      return console.log("Error writing results", err);
    }
  });

  if (err) {
    return console.log("Error reading data", err);
  }
});
