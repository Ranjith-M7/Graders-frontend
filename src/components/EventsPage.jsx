import React from "react";

import Header from "./Header";
import Events from "./Events";
import Footer from "./Footer";

function EventsPage() {
  return (
    <>
      <div className="header-nav"></div>
      <Header />

      <Events />
      <Footer />
    </>
  );
}

export default EventsPage;
