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
};

export default state;
