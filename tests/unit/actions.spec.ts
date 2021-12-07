import axios from "axios";
import { Commit } from "vuex";
import configActionContext from "../test-utils";
import actions from "@/store/actions";
import { Dream, DreamToUpdate } from "@/types/interfaces";
import mockedState from "../mockState";

jest.mock("axios");
jest.mock("jwt-decode", () => () => ({}));

const mockedAxios = axios as jest.Mocked<typeof axios>;
const commit = jest.fn() as jest.MockedFunction<Commit>;

describe("Given a getDreamsFromApi action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call commit with loadDreams and receive the dreams", async () => {
      const data: Array<Dream> = mockedState.dreams;
      mockedAxios.get.mockResolvedValue({ data });
      JSON.parse = jest.fn().mockResolvedValue("123456");

      await actions.getDreamsFromApi(configActionContext(commit));
      expect(commit).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith("loadDreams", data);
    });
  });

  describe("When the action is invoked but axios fails", () => {
    test("Then it should not call commit with loadDreams", async () => {
      mockedAxios.get.mockResolvedValue(null);
      JSON.parse = jest.fn().mockResolvedValue("123456");

      await actions.getDreamsFromApi(configActionContext(commit));
      expect(commit).toHaveBeenCalledWith("startLoading");
      expect(commit).not.toHaveBeenCalledWith("loadDreams");
    });
  });
});

describe("Given a getDreamsFromApi action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call commit with getDremas and receive the dreams", async () => {
      const data: Array<Dream> = mockedState.dreams;
      mockedAxios.get.mockResolvedValue({ data });
      JSON.parse = jest.fn().mockResolvedValue("123456");

      await actions.getDreamsFromApi(configActionContext(commit));
      expect(commit).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith("loadDreams", data);
    });
  });
});

describe("Given a getCurrentDream action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call commit with loadCurrentDream and receive the dream", async () => {
      const data: Array<Dream> = mockedState.dreams;
      const id = "123";
      mockedAxios.get.mockResolvedValue({ data });
      JSON.parse = jest.fn().mockResolvedValue("123456");

      await actions.getCurrentDream(configActionContext(commit), id);
      expect(commit).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith("loadCurrentDream", data);
    });
  });
});

describe("Given a addDream action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call commit with addDream and receive the new dream", async () => {
      const data: Dream = mockedState.dreams[0];

      mockedAxios.post.mockResolvedValue({ data });
      JSON.parse = jest.fn().mockResolvedValue("123456");

      await actions.addDream(configActionContext(commit), data);
      expect(commit).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith("loadCurrentDream", []);
    });
  });
  describe("When the action is invoked but axios fails", () => {
    test("Then it should not call commit with newDream", async () => {
      const data: Dream = mockedState.dreams[0];

      mockedAxios.post.mockResolvedValue(null);
      JSON.parse = jest.fn().mockResolvedValue("123456");

      await actions.addDream(configActionContext(commit), data);
      expect(commit).toHaveBeenCalledWith("startLoading");
      expect(commit).not.toHaveBeenCalledWith("newDream");
    });
  });
});

describe("Given a deleteDream action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call commit with deleteCurrentDream and receive the id", async () => {
      const data: Dream = mockedState.dreams[0];
      const id = "123";
      mockedAxios.post.mockResolvedValue({ data });
      JSON.parse = jest.fn().mockResolvedValue("123456");

      await actions.deleteDream(configActionContext(commit), id);
      expect(commit).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith("deleteCurrentDream", id);
    });
  });
});

describe("Given a updateDream action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call commit with updateDream and receive the dream", async () => {
      const dreamToUpdate: DreamToUpdate = {
        formData: mockedState.dreams[0],
        id: "123",
      };

      const data: Dream = mockedState.dreams[0];
      mockedAxios.put.mockResolvedValue({ data });
      JSON.parse = jest.fn().mockResolvedValue("123456");

      await actions.updateDream(configActionContext(commit), dreamToUpdate);
      expect(commit).toHaveBeenCalled();
    });
  });
});

describe("Given a loginUser action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call commit", async () => {
      const { user } = mockedState.user;
      const data = {
        token: "123",
      };

      mockedAxios.post.mockResolvedValue({ data });
      JSON.parse = jest.fn().mockResolvedValue("123456");

      await actions.loginUser(configActionContext(commit), user);
      expect(commit).toHaveBeenCalled();
    });
  });
});

describe("Given a checkToken action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call commit", async () => {
      JSON.parse = jest.fn().mockResolvedValue("123456");

      await actions.checkToken(configActionContext(commit));
      expect(commit).toHaveBeenCalled();
    });
  });
  describe("When the action is invoked but there is no token", () => {
    test("Then it should not call commit with loadUser", async () => {
      JSON.parse = jest.fn().mockReturnValue(null);

      await actions.checkToken(configActionContext(commit));
      expect(commit).not.toHaveBeenCalledWith("loadUser");
    });
  });
});

describe("Given a logoutUser action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call commit with emptyUser and receive the empty user", async () => {
      const emptyUser = {
        userName: "",
        userId: "",
      };

      await actions.logoutUser(configActionContext(commit));
      expect(commit).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith("emptyUser", emptyUser);
    });
  });
});

describe("Given a isMobileAction action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call commit with isMobileMutation and receive a boolean", async () => {
      const value = true;
      await actions.isMobileAction(configActionContext(commit), value);
      expect(commit).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith("isMobileMutation", value);
    });
  });
});
describe("Given a startRecording action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call commit with isRecordingMutation", async () => {
      await actions.startRecording(configActionContext(commit));
      expect(commit).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith("isRecordingMutation");
    });
  });
});
describe("Given a stopRecording action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call commit with notRecordingMutation", async () => {
      await actions.stopRecording(configActionContext(commit));
      expect(commit).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith("notRecordingMutation");
    });
  });
});
describe("Given a fillInTranscription action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call commit with isMobileMutation and receive a boolean", async () => {
      const value = "transcription";
      await actions.fillInTranscription(configActionContext(commit), value);
      expect(commit).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith("addTranscription", value);
    });
  });
});
