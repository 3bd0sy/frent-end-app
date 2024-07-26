"use client";

import Title from "./PageSections/Title";
import DescriptionSkills from "./PageSections/DescriptionSkills";
import TimeBudget from "./PageSections/TimeBudget";
import Publish from "./PageSections/Publish";
import { useState } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState<number>(0);
  const [FormData, setFormData] = useState({});

  const handleFormData = <T extends object>(data: T) => {
    setFormData((prevFormData) => ({ ...prevFormData, ...data }));
    console.log("Data received from child:", data);
  };
  const handleNav = (prevStep: number): number => {
    return Math.min(prevStep + 1, 3);
  };
  const handleBack = (prevStep: number): number => {
    console.log("nav", activeSection);
    return Math.max(prevStep - 1, 0);
  };
  return (
    <div>
      <h1 className="sm:text-3xl   mt-10 text-xl font-bold text-[#374151] mb-8 mx-auto max-w-96  xs:max-w-[350px] sm:max-w-4xl ">
        Post a Job
      </h1>
      <Title
        title="Section 1"
        isOpen={activeSection === 0}
        sendData={handleFormData}
        onNav={() => setActiveSection(handleNav(activeSection))}
      />
      <DescriptionSkills
        title="Section 2"
        isOpen={activeSection === 1}
        sendData={handleFormData}
        onNav={() => setActiveSection(handleNav(activeSection))}
        handleBack={() => setActiveSection(handleBack)}
      />
      <TimeBudget
        title="Section 3"
        isOpen={activeSection === 2}
        sendData={handleFormData}
        onNav={() => setActiveSection(handleNav(activeSection))}
        handleBack={() => setActiveSection(handleBack)}
      />
      <Publish
        title="Section 4"
        isOpen={activeSection === 3}
        onNav={() => setActiveSection(handleNav(activeSection))}
        sendData={handleFormData}
        handleBack={() => setActiveSection(handleBack)}
      />
    </div>
  );
}
