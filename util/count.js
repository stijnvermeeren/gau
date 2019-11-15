const fs = require('fs');
const ngram = require('../modules/ngram')

const args = process.argv.slice(2);

if (args.length < 2) {
  return console.log("Not enough arguments. Usage: `node counts.js <dataFile> <countFile>`")
}
const dataFile = args[0];
const countsFile = args[1];

fs.readFile(dataFile, 'utf8', function(err, contents) {
  if (err) {
    return console.log("Error reading data", err);
  }

  const maxN = 3
  let ngrams = []

  contents.split(/\n/).forEach(line => {
    if (line.length) {
      const content = line.toLowerCase().replace(/[^a-z]/g, '')
      for (let length = maxN; length > 0; length--) {
        ngrams = ngrams.concat(ngram.ngramsForN(content, length))
      }
    }
  })

  const counts = ngram.counts(ngrams)

  fs.writeFile(countsFile, JSON.stringify(counts), function(err) {
    if (err) {
      return console.log("Error writing results", err);
    }
  });
});
