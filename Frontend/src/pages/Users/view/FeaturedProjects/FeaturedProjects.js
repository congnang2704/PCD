import React from "react";
import FeaturedOne from "./FeaturedProjects1/Featured_One";
import FeaturedTwo from "./FeaturedProjects2/FeaturedTwo";
import FeaturedThree from "./FeaturedProjects3/FeaturedThree";

const FeaturedProjects = () => {
  return (
    <div className="featured-projects-section container-wrapper">
      <FeaturedOne />
      <FeaturedTwo />
      <FeaturedThree />
    </div>
  );
};

export default FeaturedProjects;
