const fs = require('fs')
const path = require('path')
const outputPath = 'abcdefg.html.matrix'; // The file to write to
const writeStream = fs.createWriteStream(outputPath);
// Replace with the path to your file
const filePath = path.join(__dirname, 'abcdefg.html')
//const filePath = path.join(__dirname, 'operator-manual.html')

// Create a readable stream in binary mode
const readStream = fs.createReadStream(filePath, { encoding: null })

readStream.on('data', (cnhok) => {
  
//   for (let i = 65; i < 68; i = i + 3) {
   for (let i = 0; i < cnhok.length; i = i + 3) {
    console.log(cnhok[i]);
    console.log(cnhok[i+1]);
    console.log(cnhok[i+2]);
    const array = new Uint8Array(8)
    array[0] = (cnhok[i] & '0b00000111')
    array[1] = ((cnhok[i] & '0b00111000') >> 3)
    array[2] = (
      (
        ((cnhok[i] & '0b11000000') >> 6) 
      |
        ((cnhok[i + 1] & '0b00000001') << 2))
    );
    array[3] = ((cnhok[i + 1] & '0b00001110') >> 1)
    array[4] = ((cnhok[i + 1] & '0b01110000') >> 4)
    array[5] = (
      (
      ((cnhok[i + 1] & '0b10000000') >> 7) 
      | 
        ((cnhok[i + 2] & '0b00000011') << 1))
    )
    array[6] = ((cnhok[i + 2] & '0b00011100') >> 2)
    array[7] = ((cnhok[i + 2] & '0b11100000') >> 5)
    // console.log(array[3],array[4],array[5]);
    // console.log(array)
    writeStream.write(array);
  }
  //console.log('matrix-ecnoding:')
  // array.forEach((digit) => {
  //   process.stdout.write(digit.toString());
  //   writeStream.write(digit);
  // })
  writeStream.end();

// Write chunks of data to the stream
  
  //console.log('\nend of file');
})

readStream.on('end', () => {
  //console.log('Finished reading file.')
})

readStream.on('error', (err) => {
  //console.error('Error reading file:', err)
})
