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
  isLoadingEvents: boolean;
  activeEvent: CalendarEvent | null;
}

// Define the initial state using that type
const initialState: Calendar = {
  events: [],
  isLoadingEvents: true,
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
    onDeleteEvent: (state, action: PayloadAction<number>) => {
      state.events = state.events.filter(
        (event) => event._id !== action.payload
      );
      state.activeEvent = null;
    },
    onLoadEvents: (state, action: PayloadAction<CalendarEvent[]>) => {
      state.isLoadingEvents = false;

      action.payload.forEach((event) => {
        const exists = state.events.some(
          (dbEvent) => dbEvent._id === event._id
        );

        if (!exists) {
          state.events.push(event);
        }
      });
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true;
      state.events = [];
      state.activeEvent = null;
    },
  },
});

export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
} = calendarSlice.actions;

export default calendarSlice.reducer;
