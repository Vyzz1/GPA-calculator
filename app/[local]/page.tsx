"use client";
import AverageCalculate from "@/components/shared/AverageCalculate";
import CumulativeGPA from "@/components/shared/CumulativeGPA";
import Hero from "@/components/shared/Hero";
import Information from "@/components/shared/Information";
import { store } from "@/store";

import { Provider } from "react-redux";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Provider store={store}>
        <CumulativeGPA />
      </Provider>
      <AverageCalculate />
      <Information />
    </>
  );
};

export default HomePage;
