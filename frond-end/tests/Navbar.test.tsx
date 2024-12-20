import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "@/components/navbar";

jest.mock("next-i18next", () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));
jest.mock("next/router", () => ({
  useRouter: () => ({
    locale: "en",
  }),
}));

test("Given Navbar is rendered, When the logo is displayed, Then it should show the correct logo text", () => {
  render(<Navbar />);
  expect(screen.getByText("navbar.logo"));
  expect(screen.getByText("navbar.welcome"));
});

