interface IImageService {
  upload(file: File, itemId: string): Promise<string>;
}

export default IImageService;
