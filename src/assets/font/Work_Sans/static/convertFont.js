const opentype = require('opentype.js');
const fs = require('fs');

// Load the font file
opentype.load('../Work_Sans/WorkSans-VariableFont_wght.ttf', function(err, font) {
  if (err) {
    console.error('Error loading font:', err);
    return;
  }

  // Convert the font to an array buffer
  const arrayBuffer = font.toArrayBuffer();

  // Convert the array buffer to a Buffer
  const buffer = Buffer.from(arrayBuffer);

  // Write the buffer to a file
  fs.writeFileSync('work_sans.json', buffer, 'utf-8');
});