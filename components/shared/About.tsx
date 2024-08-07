import React from "react";
import { AnimatedTooltip } from "../ui/animated-tooltip";

const About = () => {
  const tooltips = [
    {
      id: 1,
      name: "Facebook",
      designation: "anh.n.huynh.1",
      image:
        "https://i.pinimg.com/736x/42/75/49/427549f6f22470ff93ca714479d180c2.jpg",
    },
    {
      id: 2,
      name: "Github",
      designation: "Vyzz1",
      image:
        "https://i.pinimg.com/564x/66/71/3a/66713a96b9b21dffd3a85a5d748a3171.jpg",
    },
    {
      id: 3,
      name: "Vỹ Huỳnh",
      designation: "Developer",
      image:
        "https://i.pinimg.com/280x280_RS/02/78/62/027862192de18acae257c34b4804b597.jpg",
    },
    {
      id: 4,
      name: "Created At",
      designation: "7th August 2024",
      image:
        "https://i.pinimg.com/564x/63/7b/f5/637bf57da546dde7e866de829fbd890e.jpg",
    },
  ];

  return (
    <section className="py-8 px-4 lg:mx-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex mt-10 items-center justify-center w-full">
          <AnimatedTooltip items={tooltips} />
        </div>
      </div>
    </section>
  );
};

export default About;
