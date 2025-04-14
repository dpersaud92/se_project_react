import React from "react";
import Header from "../Header";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mocking the imported assets and components
jest.mock("../../../assets/headerLogo.svg", () => "mockLogo");
jest.mock("../../../assets/headerAvatar.svg", () => "mockAvatar");
jest.mock("../../../assets/addClothes.svg", () => "mockClothes");
jest.mock("../../ToggleSwitch/ToggleSwitch", () => () => (
  <div>MockToggleSwitch</div>
));

describe("Header() Header method", () => {
  const mockHandleAddClick = jest.fn();
  const mockWeatherData = { city: "New York" };
  const mockIsFahrenheit = true;
  const mockOnToggleTemp = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Happy Path Tests
  describe("Happy Paths", () => {
    it("should render the header with logo, date, location, and user info", () => {
      // Render the Header component
      render(
        <Header
          handleAddClick={mockHandleAddClick}
          weatherData={mockWeatherData}
          isFahrenheit={mockIsFahrenheit}
          onToggleTemp={mockOnToggleTemp}
        />
      );

      // Check if the logo is rendered
      expect(screen.getByAltText("logo")).toHaveAttribute("src", "mockLogo");

      // Check if the date and location are rendered correctly
      const currentDate = new Date().toLocaleString("default", {
        month: "long",
        day: "numeric",
      });
      expect(
        screen.getByText(`${currentDate}, ${mockWeatherData.city}`)
      ).toBeInTheDocument();

      // Check if the user info is rendered
      expect(screen.getByText("Brian O'Conner")).toBeInTheDocument();
      expect(screen.getByAltText("user avatar")).toHaveAttribute(
        "src",
        "mockAvatar"
      );
    });

    it("should call handleAddClick when the add clothes button is clicked", () => {
      // Render the Header component
      render(
        <Header
          handleAddClick={mockHandleAddClick}
          weatherData={mockWeatherData}
          isFahrenheit={mockIsFahrenheit}
          onToggleTemp={mockOnToggleTemp}
        />
      );

      // Simulate clicking the add clothes button
      fireEvent.click(screen.getByRole("button", { name: /clothes image/i }));

      // Check if handleAddClick was called
      expect(mockHandleAddClick).toHaveBeenCalledTimes(1);
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    it("should handle missing weatherData gracefully", () => {
      // Render the Header component without weatherData
      render(
        <Header
          handleAddClick={mockHandleAddClick}
          weatherData={{}}
          isFahrenheit={mockIsFahrenheit}
          onToggleTemp={mockOnToggleTemp}
        />
      );

      // Check if the date is rendered without location
      const currentDate = new Date().toLocaleString("default", {
        month: "long",
        day: "numeric",
      });
      expect(screen.getByText(`${currentDate}, `)).toBeInTheDocument();
    });

    it("should render ToggleSwitch component", () => {
      // Render the Header component
      render(
        <Header
          handleAddClick={mockHandleAddClick}
          weatherData={mockWeatherData}
          isFahrenheit={mockIsFahrenheit}
          onToggleTemp={mockOnToggleTemp}
        />
      );

      // Check if the ToggleSwitch is rendered
      expect(screen.getByText("MockToggleSwitch")).toBeInTheDocument();
    });
  });
});
