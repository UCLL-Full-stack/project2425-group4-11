import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DropdownMenu from "@/components/dropdownMenu";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

jest.mock("next-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
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

  test("renders login menu item when no user is logged in", () => {
    render(<DropdownMenu loggedInUser={null} handleLogout={mockHandleLogout} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(screen.getByText("dropdownMenu.menuItem.login"));
  });

  test("renders menu items for logged-in user", () => {
    render(<DropdownMenu loggedInUser="user" handleLogout={mockHandleLogout} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(screen.getByText("dropdownMenu.menuItem.events"));
    expect(screen.getByText("dropdownMenu.menuItem.editProfile"));
  });

  test("renders admin dashboard menu item for admin user", () => {
    // Mock localStorage
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => JSON.stringify({ role: "admin" })),
      },
      writable: true,
    });

    render(<DropdownMenu loggedInUser="admin" handleLogout={mockHandleLogout} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(screen.getByText("dropdownMenu.menuItem.adminDashboard"));
  });

  test("calls handleLogout and navigates to the root route on logout", () => {
    render(<DropdownMenu loggedInUser="user" handleLogout={mockHandleLogout} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const logoutButton = screen.getByText("dropdownMenu.menuItem.logout");
    fireEvent.click(logoutButton);

    expect(mockHandleLogout).toHaveBeenCalledTimes(1);
    expect(mockRouterPush).toHaveBeenCalledWith("/");
  });
});
