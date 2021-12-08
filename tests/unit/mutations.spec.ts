import mutations from "@/store/mutations";
import stateMock from "../mockState";
import { State, User, Dream } from "@/types/interfaces";

let state: State;

describe("Given a store mutations object", () => {
  describe("When loadUser receives a state and payload with user", () => {
    test("Then isAuthenticated should be true in store", () => {
      state = stateMock;
      const payload: User = {
        userName: "Peix",
        userId: "61a9d9f93d1576bdbb9af859",
      };

      mutations.loadUser(state, payload);

      expect(state.user.isAuthenticated).toBe(true);
    });
  });
  describe("When loadDreams receives a state and payload with an array of dreams", () => {
    test("Then dreams should contain those dreams in the store", () => {
      state = stateMock;
      const payload: Array<Dream> = [
        {
          id: "61a9d9f93d1576bdbb9af859",
          title: "sueño",
          description: "descripción de sueño",
          date: "11-11-2021",
          type: "normal",
          mood: "1",
        },
        {
          id: "61a9d9f93d1576bdbb9af859",
          title: "sueño",
          description: "descripción de sueño",
          date: "11-11-2021",
          type: "normal",
          mood: "1",
        },
      ];

      mutations.loadDreams(state, payload);

      expect(state.dreams).toEqual(payload);
    });
  });

  describe("When loadCurrentDream receives a state and payload with a dream", () => {
    test("Then currentDream should contain that dreams in the store", () => {
      state = stateMock;
      const payload: Dream = {
        id: "61a9d9f93d1576bdbb9af859",
        title: "sueño",
        description: "descripción de sueño",
        date: "11-11-2021",
        type: "normal",
        mood: "1",
      };

      mutations.loadCurrentDream(state, payload);

      expect(state.currentDream).toEqual(payload);
    });
  });

  describe("When emptyUser receives a state and payload with an empty user", () => {
    test("Then user should contain the empty user", () => {
      state = stateMock;
      const payload: User = {
        userName: "",
        userId: "",
      };

      mutations.emptyUser(state, payload);

      expect(state.user.user).toEqual(payload);
    });
  });
  describe("When addDream receives a state and payload with a new dream", () => {
    test("Then dreams should contain the new dream", () => {
      state = stateMock;
      const payload: Dream = {
        id: "61a9d9f93d1576bdbb9af859",
        title: "sueño",
        description: "descripción de sueño",
        date: "11-11-2021",
        type: "normal",
        mood: "1",
      };

      mutations.addDream(state, payload);

      expect(state.dreams).toContainEqual(payload);
    });
  });
  describe("When startLoading receives a state", () => {
    test("Then isLoading should be changed to true", () => {
      state = stateMock;

      mutations.startLoading(state);

      expect(state.isLoading).toBeTruthy();
    });
  });
  describe("When stopLoading receives a state", () => {
    test("Then isLoading should be changed to false", () => {
      state = stateMock;

      mutations.stopLoading(state);

      expect(state.isLoading).toBeFalsy();
    });
  });
  describe("When updateDream receives a state and payload with a dream", () => {
    test("Then dreams should contain the updated dream", () => {
      state = stateMock;
      const payload: Dream = {
        id: "61a9d9f93d1576bdbb9af859",
        title: "sueño",
        description: "descripción de sueño",
        date: "11-11-2021",
        type: "normal",
        mood: "1",
      };

      mutations.updateDream(state, payload);

      expect(state.dreams).toContainEqual(payload);
    });
  });

  describe("When deleteCurrentDream receives a state and payload with an id", () => {
    test("Then dreams should not contain the corresponding dream", () => {
      state = stateMock;
      const deletedDream: Dream = {
        id: "61a9d9f93d1576bdbb9af859",
        title: "sueño",
        description: "descripción de sueño",
        date: "11-11-2021",
        type: "normal",
        mood: "1",
      };
      const payload = "61a9d9f93d1576bdbb9af859";

      mutations.deleteCurrentDream(state, payload);

      expect(state.dreams).not.toContainEqual(deletedDream);
    });
  });
  describe("When isMobileMutation receives a state and a payload with a true", () => {
    test("Then isMobile should be changed to true", () => {
      state = stateMock;
      const payload = true;

      mutations.isMobileMutation(state, payload);

      expect(state.isMobile).toBeTruthy();
    });
  });
  describe("When isRecordingMutation receives a state", () => {
    test("Then isRecording should be changed to true", () => {
      state = stateMock;

      mutations.isRecordingMutation(state);

      expect(state.isRecording).toBeTruthy();
    });
  });
  describe("When notRecordingMutation receives a state", () => {
    test("Then isRecording should be changed to false", () => {
      state = stateMock;

      mutations.notRecordingMutation(state);

      expect(state.isRecording).toBeFalsy();
    });
  });
  describe("When addTranscription receives a state and a payload with a string", () => {
    test("Then transcription should be changed to the string", () => {
      state = stateMock;
      const payload = "description";
      mutations.addTranscription(state, payload);

      expect(state.transcription).toContain(payload);
    });
  });
  describe("When lightMode receives a state", () => {
    test("Then isLight should be toggled", () => {
      state = stateMock;
      stateMock.isLight = false;

      mutations.lightMode(state);

      expect(state.isLight).toBeTruthy();
    });
  });
});
