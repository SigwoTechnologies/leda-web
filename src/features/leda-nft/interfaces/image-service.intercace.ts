export interface IImageService {
  upload(file: File): Promise<string>;
}
