
# Dog Data Utility

**Dog Data Utility** is a command-line tool designed to process a CSV file containing dog license data. The utility provides a variety of analyses, such as fetching unique breeds, counting licenses by type, listing top dog names, and filtering licenses by date range. The results are displayed in JSON format for easy readability.

## Installation

1. Clone or download this repository.
2. Install dependencies by running:
   ```bash
   npm install
   ```

## Usage

### Command Format

```bash
node dogDataUtility.mjs <filePath> <command> [startDate endDate]
```

- `<filePath>`: Path to the CSV file containing dog license data (e.g., `2017.csv`).
- `<command>`: The operation you wish to perform on the data.
- `[startDate endDate]`: Required only for the `get-license-issues-by-dates` command; specify the date range in `YYYY-MM-DD` format.

### Available Commands

- **`get-unique-breeds`**: List unique dog breeds.
- **`get-unique-licenses`**: Count licenses by license type for each breed.
- **`get-licenses-by-breed`**: Count total licenses for each breed.
- **`get-top-dog-names`**: Display the top 5 most popular dog names.
- **`get-license-issues-by-dates`**: Filter licenses by a specific date range.

### Examples

#### Example 1: Get Unique Breeds

```bash
node dogDataUtility.mjs 2017.csv get-unique-breeds
```

**Sample Output**:
```json
[
  "labradorretriever",
  "germanshepherd",
  "goldenretriever",
  "poodle",
  "bulldog",
  "beagle"
]
```

#### Example 2: Get License Counts by License Type for Each Breed

```bash
node dogDataUtility.mjs 2017.csv get-unique-licenses
```

**Sample Output**:
```json
{
  "labradorretriever": {
    "Dog Individual Male": 102,
    "Dog Individual Spayed Female": 85
  },
  "germanshepherd": {
    "Dog Individual Male": 57,
    "Dog Individual Female": 49
  }
}
```

#### Example 3: Get License Counts by Breed

```bash
node dogDataUtility.mjs 2017.csv get-licenses-by-breed
```

**Sample Output**:
```json
{
  "labradorretriever": 187,
  "germanshepherd": 106,
  "goldenretriever": 75
}
```

#### Example 4: Get Top 5 Dog Names

```bash
node dogDataUtility.mjs 2017.csv get-top-dog-names
```

**Sample Output**:
```json
[
  { "name": "bella", "count": 342 },
  { "name": "buddy", "count": 257 },
  { "name": "max", "count": 209 },
  { "name": "bailey", "count": 203 },
  { "name": "lucy", "count": 189 }
]
```

#### Example 5: Filter Licenses Issued by Date Range

```bash
node dogDataUtility.mjs 2017.csv get-license-issues-by-dates 2017-01-01 2017-12-31
```

**Sample Output**:
```json
[
  {
    "LicenseType": "Dog Individual Male",
    "Breed": "labradorretriever",
    "Color": "black",
    "DogName": "rex",
    "OwnerZip": "12345",
    "ExpYear": 2017,
    "ValidDate": "2017-06-01 12:45"
  },
  {
    "LicenseType": "Dog Individual Spayed Female",
    "Breed": "poodle",
    "Color": "white",
    "DogName": "luna",
    "OwnerZip": "67890",
    "ExpYear": 2017,
    "ValidDate": "2017-08-15 10:30"
  }
]
```

### Error Handling

If you enter invalid dates or omit required arguments, the utility will display a helpful error message. For example:

```bash
node dogDataUtility.mjs 2017.csv get-license-issues-by-dates
```

**Error**:
```plaintext
For get-license-issues-by-dates, please provide both startDate and endDate in YYYY-MM-DD format.
```

## Notes

- Ensure the date format for `get-license-issues-by-dates` is `YYYY-MM-DD`.
- The utility outputs results in JSON format, making it easy to read and integrate with other tools.

## License

This project is licensed under the MIT License.
