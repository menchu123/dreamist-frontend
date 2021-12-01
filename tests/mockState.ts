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
};

export default stateMock as unknown as State;
