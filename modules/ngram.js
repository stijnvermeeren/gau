
function ngramsForN(content, n) {
  // pad with ^ (start of line) and $ (end of line) characters
  const paddedLine = '^'.repeat(n) + content + '$'

  let ngrams = []

  for (let pos = 0; pos <= paddedLine.length - n; pos++) {
    ngrams.push(paddedLine.slice(pos, pos + n))
  }

  return ngrams
}

function counts(ngrams) {
  const counts = {}

  ngrams.forEach(ngram => {
    if (!counts[ngram]) {
      counts[ngram] = 0;
    }
    counts[ngram]++;
  })

  return counts
}

module.exports = {
  ngramsForN,
  counts
}
