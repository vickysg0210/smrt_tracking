
export interface TopicInterface {
  topicId: number,
  title: string,
  content: string,
  author:{
   username: string,
   avatar:{
     url: string
   }
  },
  needReply: boolean,
  acceptText: string,
  rejectText: string,
  date : string
 };
