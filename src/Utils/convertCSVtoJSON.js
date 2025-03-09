import fs from 'fs';                      // Import fs module for filesystem operations
import csv from 'csv-parser';             // Import csv-parser for handling CSV data
import { writeFileSync } from 'fs';       // Import writeFileSync specifically from fs

const results = [];                       // Array to hold the parsed data

// Create a read stream from the CSV file and pipe it through csv-parser
fs.createReadStream('InitialDataFinal.csv')
  .pipe(csv({
    separator: ';'  // Specify the delimiter used in your CSV file
  }))                           
  .on('data', (data) => results.push(data))  // For each piece of data, push it to the results array
  .on('end', () => {
    // When all data has been parsed, write it to output.json
    writeFileSync('output.json', JSON.stringify(results, null, 2));  // Write the results to output.json
    console.log('Data has been written to output.json');
  });
