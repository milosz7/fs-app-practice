export const isImageUploaded = (path: string) => {
  const isUploadedRegexp = /(?=.*\/public).*/;
  return isUploadedRegexp.test(path);
};
