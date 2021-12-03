import axios from "axios";
import { Commit } from "vuex";
import actions from "@/store/actions";
import configActionContext from "../test-utils";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const commit = jest.fn() as jest.MockedFunction<Commit>;

describe("Given an action object from store", () => {
  describe("When the action getDreamsFromApi is invoked", () => {
    test("Then it should call commit with loadDreams and received data", async () => {
      const data = [
        {
          id: "61a9d9f93d1576bdbb9af859",
          title: "sueño",
          description: "descripción de sueño",
          date: "11-11-2021",
          type: "normal",
          mood: "1",
        },
      ];
      mockedAxios.get.mockResolvedValue({
        data,
      });

      await actions.getDreamsFromApi(configActionContext(commit));

      expect(commit).toHaveBeenCalledWith("startLoading");
    });
  });
});
