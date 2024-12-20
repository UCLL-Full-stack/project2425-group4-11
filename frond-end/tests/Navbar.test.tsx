import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "@/components/navbar";
import "@testing-library/jest-dom";

window.React = React;

jest.mock("next-i18next", () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: (key: string) => key,
  }),
}));

beforeAll(() => {
  global.open = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

test("Given Navbar is rendered, When the logo is displayed, Then it should show the correct logo text", () => {
  render(<Navbar />);
  expect(screen.getByText("navbar.logo"));
});

