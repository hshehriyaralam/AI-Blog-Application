export interface  ReduxUser {
  id?: string;
  name: string;
  email: string;
  profilePic?: string | null;
  role?: string;
  isAdmin?: boolean;
}

export interface AuthState {
  user:  ReduxUser | null,
  token: string | null,
  loading: boolean;
  error: string | null;
}

export interface AlertState {
  visible: boolean;
  message: string;
  type: AlertType;
  progress: number;
}


 export interface ThemeContextType {
  themeValue: boolean;
  changeTheme: () => void;
  light : string,
  dark : string,
  lightText : string,
  DarkText : string
}

