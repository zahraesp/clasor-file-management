export interface IFile {
    attributes: [];
    created: number;
    extension: string;
    hash: string;
    name: string;
    owner: {
      username: string;
      name: string;
      ssoId: number;
      roles: string[]
    };
    parentHash: string;
    postId?: number;
    size: number;
    thumbnail: string;
    type: string;
    updated: number;
    uploader: {
      username: string;
      name: string;
      ssoId: number;
      roles: string[]
    };
    version: string;
  }

export interface ILocalImage {
    imageAddress?: string | undefined;
      imageName?: string | undefined;
      imageType?: string | undefined;
      originalImage?: File | undefined;
      compressedImage?: File | undefined;
      compressedPreview?: string | undefined;
  }
