import type { BlogPostCollectionItem } from "@nuxt/content";

export interface Article {
  title: string;
  _path: string;
  description: string;
  tags?: string[];
}
export interface BlogPostItem extends BlogPostCollectionItem {
  title: string;
  description: string;
  tags: string[];
  image: string;
  date: Date;
}

export type BlogPostList = {
  title: string;
  description: string;
  tags: string[];
  path: string;
}[];
