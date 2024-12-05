import React from "react";
import { Events } from "@types";

type Props = {
  events: Array<Event>;
  selectEvent: (event: Event) => void;
};

const EventOverviewTable: React.FC<Props> = ({
  events,
  selectEvent,
}: Props) => {
  return (
    <>
      {events && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">title</th>
              <th scope="col">genre</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr
                key={index}
                onClick={() => selectEvent(event)}
                role="button"
              >
                <td>{event.description}</td>
                <td>{event.genre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default EventOverviewTable;
