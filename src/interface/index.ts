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
    roles: string[];
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
    roles: string[];
  };
  version: string;
}

export interface IFolder {
  attributes: [];
  created: number;
  extension: string;
  hash: string;
  name: string;
  owner: {
    username: string;
    name: string;
    ssoId: number;
    roles: string[];
  };
  parentHash: string;
  postId?: number;
  size: number;
  type: "application/vnd.podspace.folder";
  updated: number;
  uploader: {
    username: string;
    name: string;
    ssoId: number;
    roles: string[];
  };
  version: string;
}

export interface IBreadcrumb {
  attributes: [];
  hash: string;
  name: string;
  parentHash: string;
}

export interface ILocalImage {
  imageAddress?: string | undefined;
  imageName?: string | undefined;
  imageType?: string | undefined;
  originalImage?: File | undefined;
  compressedImage?: File | undefined;
  compressedPreview?: string | undefined;
}

export interface IReport {
  categories: number;
  documents: number;
  drafts: number;
  pendingDrafts: number;
  pendingVersions: number;
  podSpaceStatus: {
    bandwidthLimit: number;
    plan: {
      title: string;
      hash: string;
      description: string;
      type: string;
      size: number;
      bandwidth: number;
      connections: number;
      versions: number;
    };
    storageLimit: number;
    storageUsage: number;
  };
}

export interface IPodspaceResult<T> {
  path: string;
  reference: string;
  result: T;
  status: number;
  timestamp: string;
}
