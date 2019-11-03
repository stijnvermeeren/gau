# Gau

Gau...
- is the [Caesar](https://en.wikipedia.org/wiki/Caesar_cipher) -4 shift of the word "key"
- is pronounced as the Dutch word "gauw", meaning "quickly"

Put together, Gau is a tool that runs in the browser and quickly finds the key to decrypt a code that uses a simple encryption such as the Caesar cipher. In order to identify the most likely key, Gau uses an n-gram based language model.

(If things don't work as expected, Gau could also mean [Größter anzunehmender Unfall](https://folio.nzz.ch/2018/mai/ein-wort-fuer-alle-gelegenheiten)...) 

## Training the language model
The language model requires a JSON file with character n-gram counts (1-gram, 2-gram and 3-gram).

A Node.js script `counts.js` is provided to generate this file based on a plain text file. It is executed using the command 
```
node counts.js <dataFile> <outputFile>
```

This script
- Reads the data file line by line
- Converts each line to lowercase and removes all non-alphabetical characters
- Computes the resulting character n-gram counts, using special symbols `^` for _start of line_ and `$` for _end of line_.
- Writes the JSON object containing all of the n-gram counts to the output file.

For example, for a data file containing
```
Hi
Hello world!
```
the resulting output file will contain
```json
{"^^h":2,"^hi":1,"hi$":1,"i$$":1,"^h":2,"hi":1,"i$":1,"h":2,"i":1,"^he":1,"hel":1,"ell":1,"llo":1,"low":1,"owo":1,"wor":1,"orl":1,"rld":1,"ld$":1,"d$$":1,"he":1,"el":1,"ll":1,"lo":1,"ow":1,"wo":1,"or":1,"rl":1,"ld":1,"d$":1,"e":1,"l":3,"o":2,"w":1,"r":1,"d":1} 
```
