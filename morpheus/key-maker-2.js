const fs = require('fs')
const path = require('path')

// Replace with the path to your file
const filePath = path.join(__dirname, '/minimal/operator-manual.html')
//const filePath = path.join(__dirname, 'operator-manual.html')

// Create a readable stream in binary mode
const readStream = fs.createReadStream(filePath, { encoding: null })

readStream.on('data', (cnhok) => {
  // cnhok = Buffer.from([0b11010001,0b01011000,0b00011111]); 
  const array = []
//   for (let i = 65; i < 68; i = i + 3) {
   for (let i = 0; i < cnhok.length; i = i + 3) {
    array.push((cnhok[i] & '0b00000111'))
    array.push((cnhok[i] & '0b00111000') >> 3)
    array.push(
      (
        ((cnhok[i] & '0b11000000') >> 6) 
      |
        ((cnhok[i + 1] & '0b00000001') << 2))
    );
    array.push((cnhok[i + 1] & '0b00001110') >> 1)
    array.push((cnhok[i + 1] & '0b01110000') >> 4)
    array.push(
      (
      ((cnhok[i + 1] & '0b10000000') >> 7) 
      | 
        ((cnhok[i + 2] & '0b00000011') << 1))
    )
    array.push((cnhok[i + 2] & '0b00011100') >> 2)
    array.push((cnhok[i + 2] & '0b11100000') >> 5)
    //process.stdout.write(Buffer.from([cnhok[i],cnhok[i+1],cnhok[i+2]]).toString());
  }
  //console.log('matrix-ecnoding:')
  array.forEach((digit) => {
    process.stdout.write(digit.toString());
  })
  
  //console.log('\nend of file');
})

readStream.on('end', () => {
  //console.log('Finished reading file.')
})

readStream.on('error', (err) => {
  //console.error('Error reading file:', err)
})
