import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("should not go up in smoke", () => {
  render(<Carousel />);
});

it("should render the same thing every time", () => {
  const {asFragment} = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("should go back when you click on the left arrow", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // click right arrow first 
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  // click the left arrow
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

it("should not show a left arrow when the first image is showing", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  
  //make sure we're on the first image
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();

  const leftArrow = queryByTestId("left-arrow");
  expect(leftArrow).not.toBeInTheDocument();
});

it("should not show a right arrow when the last image is showing", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  
  // get to last image by clicking right arrow twice 
  fireEvent.click(queryByTestId("right-arrow"));
  fireEvent.click(queryByTestId("right-arrow"));

  //make sure we're on the last image
  expect(queryByAltText("Photo by Josh Post on Unsplash")).toBeInTheDocument();

  const rightArrow = queryByTestId("right-arrow");
  expect(rightArrow).not.toBeInTheDocument();
});