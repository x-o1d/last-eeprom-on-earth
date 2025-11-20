const fs = require('fs')
const path = require('path')

// Replace with the path to your file
const filePath = path.join(__dirname, 'abcdefg.html.matrix')
//const filePath = path.join(__dirname, 'operator-manual.html')

// Create a readable stream in binary mode
const readStream = fs.createReadStream(filePath, { encoding: null })

readStream.on('data', (cnhok) => {
  //  01100010
  // cnhok = Buffer.from([0b00000010,0b00000100,0b00000001]); 
  let string = '';
//   for (let i = 65; i < 68; i = i + 3) {
   for (let i = 0; i < cnhok.length; i = i + 8) {
    let threeBytes = new Uint8Array(3);
    threeBytes[0] = cnhok[i];
    threeBytes[0] = threeBytes[0] | (cnhok[i+1] << 3);
    threeBytes[0] = threeBytes[0] | (cnhok[i+2] << 6);
    threeBytes[1] = cnhok[i+2] >> 2;
    threeBytes[1] = threeBytes[1] | (cnhok[i+3] << 1)
    threeBytes[1] = threeBytes[1] | (cnhok[i+4] << 4)
    threeBytes[1] = threeBytes[1] | (cnhok[i+5] << 7) 
    threeBytes[2] = cnhok[i+5] >> 1;
    threeBytes[2] = threeBytes[2] | (cnhok[i+6] << 2)
    threeBytes[2] = threeBytes[2] | (cnhok[i+7] << 5)
    string += String.fromCharCode(parseInt(threeBytes[0]));
    string += String.fromCharCode(parseInt(threeBytes[1]));
    string += String.fromCharCode(parseInt(threeBytes[2]));
    console.log(string)
    // array.push(...[byte, byte2, byte3])
    // process.stdout.write(Buffer.from([cnhok[i],cnhok[i+1],cnhok[i+2]]).toString());
  }
  //console.log('matrix-ecnoding:')
  process.stdout.write(string);
  
  //console.log('\nend of file');
})

readStream.on('end', () => {
  //console.log('Finished reading file.')
})

readStream.on('error', (err) => {
  //console.error('Error reading file:', err)
})
