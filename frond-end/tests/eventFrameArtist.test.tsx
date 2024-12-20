import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MyEventFrame from "@/components/events/eventFrameArtist";
import ShowTimeService from "@/services/ShowTimeService";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

jest.mock("@/services/ShowTimeService");
jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));
jest.mock("next-i18next", () => ({
    useTranslation: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock;
const mockUseTranslation = useTranslation as jest.Mock;

describe("MyEventFrame", () => {
    const eventProps = {
        id: 1,
        title: "Event Title",
        genre: "Genre",
        date: "2023-10-10",
        time: "18:00",
        concertHallName: "Concert Hall",
        imageUrl: "",
    };

    beforeEach(() => {
        mockUseRouter.mockReturnValue({
            reload: jest.fn(),
        });
        mockUseTranslation.mockReturnValue({
            t: (key: string) => key,
        });
    });

    test("renders event details", () => {
        render(<MyEventFrame {...eventProps} />);

        expect(screen.getByText("Event Title"));
        expect(screen.getByText("Genre"));
        expect(screen.getByText("2023-10-10, 18:00"));
        expect(screen.getByText("Concert Hall: Concert Hall"));
    });

    test("opens edit dialog when edit button is clicked", () => {
        render(<MyEventFrame {...eventProps} />);

        fireEvent.click(screen.getByRole("button", { name: /edit/i }));
        expect(screen.getByText("eventFrameArtist.title"))
    });

    test("calls delete API when delete button is clicked", async () => {
        (ShowTimeService.deleteEvent as jest.Mock).mockResolvedValue({ ok: true });
        render(<MyEventFrame {...eventProps} />);

        fireEvent.click(screen.getByRole("button", { name: /delete/i }));
        expect(ShowTimeService.deleteEvent).toHaveBeenCalledWith(1);
    });

    test("calls reschedule API when edit form is submitted", async () => {
        (ShowTimeService.rescheduleEvent as jest.Mock).mockResolvedValue({ ok: true });
        render(<MyEventFrame {...eventProps} />);

        fireEvent.click(screen.getByRole("button", { name: /edit/i }));
        fireEvent.change(screen.getByLabelText("eventFrameArtist.date"), {
            target: { value: "2023-11-11" },
        });
        fireEvent.change(screen.getByLabelText("eventFrameArtist.time"), {
            target: { value: "19:00" },
        });
        fireEvent.click(screen.getByRole("button", { name: /save/i }));

        expect(ShowTimeService.rescheduleEvent).toHaveBeenCalledWith({
            eventId: "1",
            date: "2023-11-11",
            time: "19:00",
        });
    });
});