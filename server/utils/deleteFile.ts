import fs from 'fs';

export const deleteFile = (path: string) => {
  fs.unlink(path, (err) => {
    if (err) {
      console.log('failed to delete!');
    }
  });
};
