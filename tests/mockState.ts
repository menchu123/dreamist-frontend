import { State } from "@/types/interfaces";

const stateMock = {
  dreams: [],
  user: {
    isAuthenticated: false,
    user: {
      userName: "aaa",
      userId: "098",
    },
  },
  isLoading: false,
  isMobile: true,
  isRecording: false,
  transcription: "dream description",
  currentDream: {
    id: "123",
    title: "Current title",
    description: "Current description",
    date: "Today",
    type: "normal",
    mood: "1",
  },
};

export default stateMock as unknown as State;
