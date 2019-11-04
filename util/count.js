const fs = require('fs');

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

  const maxNGram = 3
  const counts = {}

  contents.split(/\n/).forEach(line => {
    if (line.length) {
      const content = line.toLowerCase().replace(/[^a-z]/g, '')
      for (let length = maxNGram; length > 0; length--) {
        // pad with ^ (start of line) and $ (end of line) characters
        const paddedLine = '^'.repeat(length) + content + '$'
        for (let pos = 0; pos <= paddedLine.length - length; pos++) {
          const nGram = paddedLine.slice(pos, pos + length);
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
});
