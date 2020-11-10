export const url = 'api/'
// 加密接口
export const publicApi = {
  // imgCode: 'user/code',
  // smsCode: 'merchant/code/username',
  // key: 'merchant/cst/encrypt/key',
  // examineUserName: 'merchant/cst/regist/username/check',
  smsCode: '',
  imgCode: '',
  testPort: 'userName',
  register: 'register',
  getUserInfo: 'user/getUserInfo'// Post
}
export const login = {
  loginConfirm: 'user/login', // Post
  registerConfirm: 'user/register', // Post
  resetConfirm: 'user/reset'// Post
}
export const userInfo = {
  userInfoModified: 'user/userInfoModified', // Post
  userNameModified: 'user/userNameModified', // Post
  userIconModified: 'user/userIconModified', // Post
  userConfigModified: 'user/userConfigModified'// Post
}
export const home = {
  addTodoList: 'todoPanel/addTodoList',
  getTodoList: 'todoPanel/getTodoList',
}
