"use client";

import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";

const schema = z.object({
  description: z.string().min(1, "description is required"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
});
type FormData = z.infer<typeof schema>;
interface ChildComponentProps {
  title: string;
  isOpen: boolean;
  onNav: () => void;
  handleBack: () => void;
  sendData: (data:any) => void;
}

export default function DescriptionSkills(props: ChildComponentProps) {
  const [skills, setSkills] = useState<string[]>(["UI/UX"]);
  const [inputValue, setInputValue] = useState("");
  const [showForm, setShowForm] = useState<boolean>(!false);
  const [showArrow, setShowArrow] = useState<boolean>(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: "",
      skills: skills,
    },
  });
  const handleClick = () => {
    // setShowForm((prv) => !prv);
    setShowForm(true);
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      const newSkills = [...skills, inputValue.trim()];
      setSkills(newSkills);
      setValue("skills", newSkills as [string, ...string[]]);
      setInputValue("");
    }
  };

  const removeSkille = (index: number) => {
    if (skills.length > 0) {
      const newSkills = skills.filter((_, i) => i !== index);
      setSkills(newSkills);
      setValue("skills", newSkills as [string, ...string[]]);
    }
  };

  const onSubmit = (data: FormData) => {
    handleClick();
    setShowArrow(false);
    console.log(data);
  
    props.onNav();
  };

  const labelStyle = "text-xs xs:text-sm font-medium text-gray-700 mb-1";
  const errorStyle = "text-red-500 text-sm mt-1";
  return (
    <>
      {!(showForm && props.isOpen) ? (
        <div
          onClick={handleClick}
          className="bg-[#D9F99D] sm:mt-8 mt-3 border-[#4D7C0F]  border-[1px] rounded-[5px] mx-auto sm:h-16 h-10 max-w-[350px] sm:max-w-[600px] md:max-w-4xl flex justify-between items-center cursor-pointer  px-5"
        >
          <h2 className="font-bold sm:text-[18px] text-[12px]">
            Description and Skills
          </h2>
          {/* icon */}
          <div>
            {showArrow ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                // stroke-width="2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-down"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                // stroke-width="2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-check"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            )}
          </div>
        </div>
      ) : (
        <section className="bg-white mt-4 p-1 xs:p-8">
          <div className=" max-w-96 sm:max-w-4xl mx-auto border border-[#4D7C0F] rounded-lg p-8">
            {/* title */}
            <h2 className="sm:text-xl text-[12px] font-bold mb-6">
              Description and Skills
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                {/* Description*/}
                <div className="job-description mb-[20px]">
                  <label htmlFor="job-desc" className="block mb-[5px]">
                    Job Description
                  </label>
                  <div className="text-editor-toolbar  border rounded-[5px] h-14 border-[#ccc] mb-[10px]">
                    <button className="ml-3  sm:mr-[5px] sm:ml-5 sm:pt-4 bg-none  rounded-[3px]">
                      B
                    </button>
                    <button className="ml-3  sm:mr-[5px] sm:p-[5px_20px] bg-none rounded-[3px]">
                      <i>i</i>
                    </button>
                    <button className="ml-3 sm:mr-[5px] sm:p-[5px_10px] bg-none  rounded-[3px]">
                      <u>U</u>
                    </button>
                    <button className="ml-3 sm:mr-[5px] sm:p-[5px_20px] bg-none   rounded-[3px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        // stroke-width="1"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-align-left"
                      >
                        <line x1="21" x2="3" y1="6" y2="6" />
                        <line x1="15" x2="3" y1="12" y2="12" />
                        <line x1="17" x2="3" y1="18" y2="18" />
                      </svg>
                    </button>
                    <button className="ml-3 mt-3 sm:mr-[5px] sm:p-[3px_10px] bg-none  rounded-[3px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        // stroke-width="1"
                        strokeWidth="1"
                        stroke="currentColor"
                        className="size-5 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99"
                        />
                      </svg>
                    </button>
                    <button className="ml-3 sm:mr-[5px] sm:p-[5px_15px] bg-none text-lg  rounded-[3px]">
                      "
                    </button>
                  </div>

                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        style={{ resize: "none" }}
                        id="job-desc"
                        className="w-full sm:h-[150px] h-[120px] border border-[#4D7C0F] rounded-[5px] p-[10px]"
                      ></textarea>
                    )}
                  />
                  {errors.description && (
                    <p className={errorStyle}>{errors.description.message}</p>
                  )}
                </div>
                {/* Skills */}
                <div className="grid sm:grid-cols-1 grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="skills" className={labelStyle}>
                      Required Skills
                    </label>
                    <div className="flex flex-wrap items-center border rounded-md p-2 bg-white">
                      {skills.map((lang, index) => (
                        <span
                          key={index}
                          className="bg-[#D9F99D] text-[#4D7C0F] px-2 py-1 rounded m-1 text-sm flex items-center"
                        >
                          {lang}
                          <button
                            onClick={() => removeSkille(index)}
                            className="ml-1 text-[#4D7C0F] focus:outline-none"
                            type="button"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                        placeholder="Add skill"
                        className="flex-grow outline-none text-sm ml-2"
                      />
                    </div>
                    {errors.skills && (
                      <p className={errorStyle}>{errors.skills.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
                <button
                  onClick={props.handleBack}
                  className="hidden sm:block underline-offset-8"
                >
                  back
                </button>
                <button
                  type="submit"
                  className=" sm:w-[86px] w-full h-[50px] text-xs sm:text-base bg-[#4D7C0F] rounded-[5px] p-[13px_25px] gap-[10px] text-white"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
}
