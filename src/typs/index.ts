export interface UserInterface {
  firstName: string;
  lastName: string;
  mobile: string;
  id: string;
  birthDate: string;
  address: string;
  image: string;
  pin?: boolean;
  approve?: boolean;
}

export interface UserState {
  firstName: boolean;
  lastName: boolean;
  mobile: boolean;
  id: boolean;
  birthDate: boolean;
  address: boolean;
  image: boolean;
}
export interface UsersApproveListState {
  [key: string]: UserState | boolean;
}
export interface ApprovedUsersState {
  [key: string]: UserState;
}
