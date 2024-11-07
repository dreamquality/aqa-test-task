import fs from 'fs';
import { pipeline } from 'stream/promises';
import csvParser from 'csv-parser';

// Get command line arguments
const filePath = process.argv[2];
const command = process.argv[3];
const dateRange = process.argv.slice(4); // Expected [startDate, endDate] for get-license-issues-by-dates

// Argument validation
if (!filePath || !command) {
  console.error('Usage: node dogDataUtility.mjs <filePath> <command> [startDate endDate]');
  console.error('Commands: get-unique-breeds, get-unique-licenses, get-licenses-by-breed, get-top-dog-names, get-license-issues-by-dates');
  process.exit(1);
}

// Function to read and parse CSV data into an array
async function processCSV(filePath) {
  const data = [];
  try {
    await pipeline(
      fs.createReadStream(filePath),
      csvParser(),
      async function* (source) {
        for await (const row of source) {
          data.push(row);
        }
      }
    );
  } catch (error) {
    console.error('Error reading or parsing CSV file:', error);
    process.exit(1);
  }
  return data;
}

// Function to retrieve and display unique breeds in lowercase without spaces
function getUniqueBreeds(data) {
  const breedsSet = new Set(data.map(row => row.Breed.replace(/\s+/g, '').toLowerCase()));
  console.log(JSON.stringify(Array.from(breedsSet), null, 2));
}

// Function to count licenses by LicenseType for each breed
function getUniqueLicenses(data) {
  const licenseCounts = data.reduce((acc, row) => {
    const breed = row.Breed.replace(/\s+/g, '').toLowerCase();
    const licenseType = row.LicenseType;
    if (!acc[breed]) acc[breed] = {};
    if (!acc[breed][licenseType]) acc[breed][licenseType] = 0;
    acc[breed][licenseType]++;
    return acc;
  }, {});
  console.log(JSON.stringify(licenseCounts, null, 2));
}

// Function to count total licenses for each breed, regardless of LicenseType
function getLicensesByBreed(data) {
  const licenseByBreed = data.reduce((acc, row) => {
    const breed = row.Breed.replace(/\s+/g, '').toLowerCase();
    if (!acc[breed]) acc[breed] = 0;
    acc[breed]++;
    return acc;
  }, {});
  console.log(JSON.stringify(licenseByBreed, null, 2));
}

// Function to find and display the top 5 most popular dog names along with counts
function getTopDogNames(data) {
  const nameCounts = data.reduce((acc, row) => {
    const dogName = row.DogName;
    acc[dogName] = (acc[dogName] || 0) + 1;
    return acc;
  }, {});
  const topDogNames = Object.entries(nameCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));
  console.log(JSON.stringify(topDogNames, null, 2));
}

// Function to filter and display licenses issued within a specified date range
function getLicenseIssuesByDates(data, startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start) || isNaN(end)) {
    console.error('Invalid date format. Please use YYYY-MM-DD.');
    process.exit(1);
  }

  const filteredData = data.filter(row => {
    const validDate = new Date(row.ValidDate);
    return validDate >= start && validDate <= end;
  });

  console.log(JSON.stringify(filteredData, null, 2));
}

// Main function to process the CSV file and execute the specified command
async function main() {
  try {
    const data = await processCSV(filePath);
    
    // Execute command based on user input
    switch (command) {
      case 'get-unique-breeds':
        console.log('Executing command: get-unique-breeds');
        getUniqueBreeds(data);
        break;
      case 'get-unique-licenses':
        console.log('Executing command: get-unique-licenses');
        getUniqueLicenses(data);
        break;
      case 'get-licenses-by-breed':
        console.log('Executing command: get-licenses-by-breed');
        getLicensesByBreed(data);
        break;
      case 'get-top-dog-names':
        console.log('Executing command: get-top-dog-names');
        getTopDogNames(data);
        break;
      case 'get-license-issues-by-dates':
        if (dateRange.length !== 2) {
          console.error('For get-license-issues-by-dates, please provide both startDate and endDate in YYYY-MM-DD format.');
          process.exit(1);
        }
        console.log('Executing command: get-license-issues-by-dates');
        getLicenseIssuesByDates(data, dateRange[0], dateRange[1]);
        break;
      default:
        console.error('Unknown command. Available commands are: get-unique-breeds, get-unique-licenses, get-licenses-by-breed, get-top-dog-names, get-license-issues-by-dates');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

// Execute the main function
main();
