interface Dream {
  id: string;
  title: string;
  description: string;
  date: string;
  type: string;
  mood: string;
}

interface DreamToUpdate {
  formData: Dream;
  id: string;
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
  currentDream: Dream;
}
interface UserLoginData {
  username: string;
  password: string;
}

interface Image extends File {
  isAdded?: boolean;
}

export { State, Dream, User, UserLoginData, Image, DreamToUpdate };
