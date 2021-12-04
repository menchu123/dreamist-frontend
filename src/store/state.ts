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
};

export default state;
