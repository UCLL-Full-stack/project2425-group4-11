import React from "react";
import { render, screen } from "@testing-library/react";
import DropdownMenu from "@/components/dropdownMenu";
import { useRouter } from "next/router";
import "@testing-library/jest-dom";

jest.mock("next-i18next", () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));
jest.mock("next/router", () => ({
  useRouter: () => ({
    locale: "en",
  }),
}));

describe("DropdownMenu component", () => {
  const mockHandleLogout = jest.fn();
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("given dropDownMenu - when rendered - then it shows the correct titles", async () => {
    // when
    render(<DropdownMenu loggedInUser={null} handleLogout={mockHandleLogout} />);
  
    // then
    expect(screen.getByText("dropdownMenu.menuItem.events")).toBeInTheDocument();
    expect(screen.getByText("dropdownMenu.menuItem.editProfile")).toBeInTheDocument();
    expect(screen.getByText("dropdownMenu.menuItem.logout")).toBeInTheDocument();
    expect(screen.getByText("dropdownMenu.menuItem.login")).toBeInTheDocument();
    expect(screen.getByText("dropdownMenu.menuItem.adminDashboard")).toBeInTheDocument();
  });
})