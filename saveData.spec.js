const fs = require('fs');
const { saveDataToFile } = require('./saveData.js');

jest.mock('fs');

describe('saveDataToFile', () => {
  const mockData = [{ name: 'John', age: 30, hair:'black'}];

  test('saving data to the file', () => {
    saveDataToFile(mockData);

    // Check if writeFileSync was called with the correct arguments
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      'peopleList.json',
      JSON.stringify(mockData),
      'utf-8'
    );
  });
});
