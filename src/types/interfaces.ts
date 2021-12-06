interface Dream {
  id: string;
  title: string;
  description: string;
  date: string;
  type: string;
  mood: string;
}
interface SpeechRecognitionAlternative {
  confidence: number;
  transcript: string;
}

interface SpeechRecognitionResult {
  0: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionResultList {
  0: SpeechRecognitionResult;
  1?: SpeechRecognitionResult;
  2?: SpeechRecognitionResult;
  3?: SpeechRecognitionResult;
  4?: SpeechRecognitionResult;
  5?: SpeechRecognitionResult;
  6?: SpeechRecognitionResult;
  7?: SpeechRecognitionResult;
  8?: SpeechRecognitionResult;
  9?: SpeechRecognitionResult;
  10?: SpeechRecognitionResult;
  length: number;
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
  isMobile: boolean;
  isRecording: boolean;
  transcription: string;
}
interface UserLoginData {
  username: string;
  password: string;
}

interface Image extends File {
  isAdded?: boolean;
}

export {
  State,
  Dream,
  User,
  UserLoginData,
  Image,
  DreamToUpdate,
  SpeechRecognitionResultList,
  SpeechRecognitionResult,
  SpeechRecognitionAlternative,
};
