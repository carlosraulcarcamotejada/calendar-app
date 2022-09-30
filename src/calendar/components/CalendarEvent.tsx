import { FC } from "react";

type CloudinaryResp = {
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor: string;
  user: User;
};

type User = {
  _id: number;
  name: string;
};

export const CalendarEvent: FC<{ event: any }> = ({ event }): JSX.Element => {
  const { title, user } = event;
 
  return (
    <>
      <strong>{title}</strong>
      <span>-{user.name}</span>
    </>
  );
};
