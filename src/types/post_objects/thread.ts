import { PostObjectDB } from "@/types/postObject";
import PostObject from "@/types/postObject";

export interface ThreadDB extends PostObjectDB {
  _id: string;
  published_for: string;
  author: string;
  details: {

  },
}

export default interface Thread extends PostObject {
  _id?: string;
  published_for: string;
  link: string;
  author: string;
  details: {
  }
}