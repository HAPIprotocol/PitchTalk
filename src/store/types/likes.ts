export interface ILike {
  id: number;
  createdAt: Date;
  onChainProjectId: string;
  user: string;
  event: string;
  pitch: string;
  project: string;
}

export interface ILikeProject {
  user: string;
}
