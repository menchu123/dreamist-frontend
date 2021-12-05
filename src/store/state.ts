const state = {
  dreams: [],
  user: {
    isAuthenticated: false,
    user: {
      userName: "",
      userId: "",
    },
  },
  currentDream: {
    id: "",
    title: "",
    description: "",
    date: "",
    type: "",
    mood: "",
  },
  isLoading: false,
  isMobile: false,
  isRecording: false,
};

export default state;
