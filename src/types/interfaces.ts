interface Dream {
  id: string;
  title: string;
  description: string;
  date: string;
  type: string;
  mood: string;
}

interface User {
  userName: string;
  userId: string;
}

interface State {
  dreams: Array<Dream>;
  user: {
    isAuthenticated: boolean;
    user: User;
  };
  isLoading: boolean;
}
interface UserLoginData {
  username: string;
  password: string;
}

export { State, Dream, User, UserLoginData };
