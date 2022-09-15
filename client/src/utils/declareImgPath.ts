const declareImgPath = (path: string) => {
  return process.env.NODE_ENV === 'development' ? 'http://localhost:8000' + path : path;
};

export default declareImgPath;
