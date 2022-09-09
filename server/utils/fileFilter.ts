import fs from 'fs';

export const declareImageFileType = async (image: Express.Multer.File) => {
  const determineHeader = () =>
    new Promise((resolve, reject) => {
      try {
        const file = fs.readFileSync(image.path, null).buffer;
        const header = new Uint8Array(file).subarray(0,4).reduce((result, byte) => result + byte.toString(16), '');
        resolve(header);
      } catch (err) {
        reject(err);
      }
    });

  try {
    const header = await determineHeader();

    switch (header) {
      case '89504e47':
        return 'image/png';
      case '47494638':
        return 'image/gif';
      case 'ffd8ffe0':
      case 'ffd8ffe1':
      case 'ffd8ffe2':
      case 'ffd8ffe3':
      case 'ffd8ffe8':
        return 'image/jpeg';
      default:
        return 'unknown';
    }
  } catch (err) {
    return 'unknown';
  }
};
