import { CumulativeForm } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { getCookie, hasCookie, setCookie } from "cookies-next";

const cookieStore = hasCookie("cumulative")
  ? JSON.parse(getCookie("cumulative") as string)
  : null;
// cookieStore = JSON.parse(cookieStore);
const isAccepted = getCookie("isAccepted");

const initialState: CumulativeForm[] =
  cookieStore?.length > 0 && cookieStore !== null && isAccepted === "true"
    ? (cookieStore as unknown as CumulativeForm[])
    : [
        {
          id: 1,
          name: "Semester 1",
          gpa: 3.5,
          credits: 4,
        },
        {
          id: 2,
          name: "Semester 2",
          gpa: 3.6,
          credits: 3,
        },
        {
          id: 3,
          name: "Semester 3",
          gpa: 3.7,
          credits: 2,
        },
      ];

const saveStateToCookie = (state: CumulativeForm[]) => {
  if (isAccepted === "true") {
    setCookie("cumulative", state, { maxAge: 180 * 60 * 24 * 30 });
  } else {
    return;
  }
};

const cumulativeSlice = createSlice({
  name: "cumulative",
  initialState,
  reducers: {
    addSemester: (state, action) => {
      state.push({ ...action.payload, id: state.length + 1 });
      saveStateToCookie(state);
    },
    removeSemester: (state, action) => {
      const newState = state.filter(
        (semester) => semester.id !== action.payload
      );
      saveStateToCookie(newState);
      return newState;
    },
    editSemester: (state, action) => {
      const existingSemester = state.find(
        (semester) => semester.id === action.payload.id
      );
      if (existingSemester) {
        existingSemester.name = action.payload.name;
        existingSemester.gpa = action.payload.gpa;
        existingSemester.credits = action.payload.credits;
      }
      saveStateToCookie(state);
    },
  },
});

const cumulativeReducer = cumulativeSlice.reducer;
export default cumulativeReducer;

export const { addSemester, removeSemester, editSemester } =
  cumulativeSlice.actions;
