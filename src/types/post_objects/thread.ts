import { PostObjectDB } from "@/types/postObject";
import PostObject from "@/types/postObject";

export interface ThreadDB extends PostObjectDB {
  _id: string;
  published_for: string;
  details: {

  },
}

export default interface Thread extends PostObject {
  _id?: string;
  published_for: string;
  link: string;
  details: {
  },
  publisher?: [
    {
      name: string;
      username: string;
    }
  ];
}