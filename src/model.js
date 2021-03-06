import model from '../model.json'
import ngram from '../modules/ngram'

export const alphabet = [...'abcdefghijklmnopqrstuvwxyz']
const maxN = 3

// initialise empty string as total character count
model[''] = alphabet.map(count).reduce((a, b) => a + b) + count("$")

function count(nGram) {
  const value = model[nGram]
  return value ? value : 0
}

export function logPNGram(nGram) {
  const countGiven = count(nGram.slice(0, -1))
  const p = countGiven ? count(nGram) / countGiven : 0
  return Math.log(Math.max(0.0001, p)) // TODO: implement proper smoothing
}

export function logP(text) {
  let logP = 0

  text = text.toLowerCase().replace(/[^a-z]/g, '')

  ngram.ngramsForN(text, maxN).forEach(ngram => {
    logP += logPNGram(ngram)
  })

  return logP
}

export function perplexity(text) {
  return Math.pow(2, - logP(text) / (text.length + 1))
}
