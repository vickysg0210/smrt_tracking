
export interface AccountInterface {
  accountID : number,
  username : string,
  pwdSalt : string,
  pwdHash : string,
  avatar: {
    url: string
  },
  type: string,
  active: string,
  date : string
};
