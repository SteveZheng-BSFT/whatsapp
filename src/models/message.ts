export enum MessageType {
  TEXT = <any>'text'
}

export interface Message {
  _id?: string;
  chatId?: string;
  content?: string;
  createdAt?: Date;
  type?: MessageType;
}
