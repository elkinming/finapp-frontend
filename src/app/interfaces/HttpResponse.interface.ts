export interface LoginResponse {
  user:  User;
  token: string;
}

export interface User {
  uuid_user: string;
  username:  string;
  password:  string;
}

export interface CreateUserResponse {
  errorCode:    number;
  errorMessage: string;
}
