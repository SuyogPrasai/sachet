import { PostObjectDB } from "@/types/postObject";
import PostObject from "@/types/postObject";

export interface AnnouncementDB extends PostObjectDB {
  author: string;
  _id: string;
  link?: string;
  show: boolean;
}

export default interface Announcement extends PostObject {
  _id?: string;
  link?: string;
  author: string;
  show: boolean;
}