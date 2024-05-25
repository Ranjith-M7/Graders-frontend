import React from "react";

import Preloder from "./Preloader";
import Header from "./Header";
import MainBanner from "./MainBanner";
import Services from "./Services";
import About from "./About";
import Courses from "./Courses";
import Statistics from "./Statistics";
import Team from "./Team";
import Testimonial from "./Testimonial";
import Events from "./Events";
import Contact from "./Contact";
import Footer from "./Footer";

function HomePage() {
  return (
    <>
      {/* <Preloder />*/}
      <Header />
      <MainBanner />
      <Services />
      <About />
      <Courses />
      <Statistics />
      <Team />
      <Testimonial />
      <Events />
      <Contact />
      <Footer />
    </>
  );
}

export default HomePage;
