export interface Writer {
  id: number;
  nickname: string;
  image: string;
}

export interface Comment {
  content: string;
  createdAt: string;
  id: number;
  updatedAt: string;
  writer: Writer;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  favoriteCount: number;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
  images: string[];
  tags: string[];
}

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
