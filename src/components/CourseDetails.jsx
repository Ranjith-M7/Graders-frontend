import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function CourseDetails() {
  const { id } = useParams();

  return id;
}

export default CourseDetails;
