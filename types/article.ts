export interface Article {
  content: string;
  id: number;
  createdAt: string;
  image: string;
  likeCount: number;
  title: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
  };
}