export interface Content {
  id: number;
  content: string;
}

export interface ButtonContent extends Content {
  path: string;
}
