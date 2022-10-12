import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState, User } from "..";
import { addHours } from "date-fns";

// Define a type for the slice state

export interface CalendarEvent {
  _id?: number;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor: string;
  user: User;
}

interface Calendar {
  events: CalendarEvent[];
  activeEvent: CalendarEvent | null;
}

// Define the initial state using that type
const initialState: Calendar = {
  events: [
    {
      _id: new Date().getTime(),
      title: "Cumpleaños del jefe",
      notes: "Hay que comprar el pastel.",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        _id: 123,
        name: "Carlos",
        lastname: "Carcamo",
        email: "carlos@gmail.com",
      },
    },
  ],
  activeEvent: null,
};

export const calendarSlice = createSlice({
  name: "calendar",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    onSetActiveEvent: (state, action: PayloadAction<CalendarEvent | null>) => {
      state.activeEvent = action.payload;
    },
    onAddNewEvent: (state, action: PayloadAction<CalendarEvent>) => {
      state.events.push(action.payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, action: PayloadAction<CalendarEvent>) => {
      state.events = state.events.map((event) => {
        if (event._id === action.payload._id) {
          return action.payload;
        }
        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event._id !== state.activeEvent?._id
        );
        state.activeEvent = null;
      }
    },
  },
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } =
  calendarSlice.actions;

export default calendarSlice.reducer;
