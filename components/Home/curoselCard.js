import * as React from "react";
import ImageSlider from "./imageSlider";
export default function MediaCard({ slides }) {
  return (
      <ImageSlider slides={slides}></ImageSlider>
  );
}
