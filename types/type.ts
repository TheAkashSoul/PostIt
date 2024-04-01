export type User = {
  bio: string;
  createdAt: string;
  displaypic: string;
  email: string;
  followers: string[];
  following: string[];
  name: string;
  password: string;
  posts: string[];
  updatedAt: string;
  username: string;
  __v: number;
  _id: string;
};

export type Post = {
  comments: any[];
  createdAt: string;
  description: string;
  imageUrl: string;
  likes: string[];
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
};
