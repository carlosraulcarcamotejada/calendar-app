import { FC } from "react";

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
