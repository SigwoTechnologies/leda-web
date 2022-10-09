interface IImageService {
  upload(file: File): Promise<string>;
}

export default IImageService;
