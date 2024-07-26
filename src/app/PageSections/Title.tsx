"use client";

import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, Controller, ControllerRenderProps } from "react-hook-form";

const schema = z.object({
  title: z.string().min(1, "Job Title is required"),
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().min(1, "Subcategory is required"),
  country: z.string().optional(),
  languages: z.array(z.string()).min(1, "At least one language is required"),
});
type FormData = z.infer<typeof schema>;
interface ChildComponentProps {
  title: string;
  isOpen: boolean;
  onNav: () => void;
  sendData: (data:any) => void;
}

export default function Title(props: ChildComponentProps) {
  const [languages, setLanguages] = useState<string[]>(["Arabic"]);
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
      title: "",
      category: "",
      subcategory: "",
      country: "",
      languages: languages,
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
      const newLanguages = [...languages, inputValue.trim()];
      setLanguages(newLanguages);
      setValue("languages", newLanguages as [string, ...string[]]);
      setInputValue("");
    }
  };

  const removeLanguage = (index: number) => {
    if (languages.length > 1) {
      const newLanguages = languages.filter((_, i) => i !== index);
      setLanguages(newLanguages);
      setValue("languages", newLanguages as [string, ...string[]]);
    }
  };

  const onSubmit = (data: FormData) => {
    handleClick();
    setShowArrow(false);
    console.log(data);
   
    props.onNav();
  };

  const inputStyle =
    "h-[50px] rounded-[5px] text-xs xs:text-sm border border-[#D1D5DB] w-full px-2";
  const labelStyle = "text-xs xs:text-sm font-medium text-gray-700 mb-1";
  const errorStyle = "text-red-500 text-sm mt-1";
  return (
    <>
      {!(showForm && props.isOpen) ? (
        <div
          onClick={handleClick}
          className="bg-[#D9F99D] border-[#4D7C0F]  border-[1px] rounded-[5px] mx-auto sm:h-16 h-10 max-w-[350px] sm:max-w-[600px] md:max-w-4xl flex justify-between items-center cursor-pointer  px-5"
        >
          <h2 className="font-bold sm:text-[18px] text-[12px]">Title</h2>
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
        <section className="bg-white p-1 xs:p-8">
          <div className=" max-w-96 sm:max-w-4xl mx-auto border border-[#4D7C0F] rounded-lg p-8">
            {/* title */}
            <h2 className="sm:text-xl text-[12px] font-bold mb-6">Title</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className={labelStyle + " "}>
                    Job Title{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      color="#9CA3AF"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      // stroke-width="2"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-alert inline-block"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" x2="12" y1="8" y2="12" />
                      <line x1="12" x2="12.01" y1="16" y2="16" />
                    </svg>{" "}
                  </label>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        id="title"
                        className={inputStyle}
                      />
                    )}
                  />
                  {errors.title && (
                    <p className={errorStyle}>{errors.title.message}</p>
                  )}
                </div>
                {/* Category & Subcategory */}
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="category" className={labelStyle}>
                      Category
                    </label>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <select {...field} id="category" className={inputStyle}>
                          <option value="">Select</option>
                          <option value="HR">HR</option>
                          <option value="programming">Programming</option>
                        </select>
                      )}
                    />
                    {errors.category && (
                      <p className={errorStyle}>{errors.category.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="subcategory" className={labelStyle}>
                      Subcategory
                    </label>
                    <Controller
                      name="subcategory"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          id="subcategory"
                          className={inputStyle}
                        >
                          <option value="">Select</option>
                          <option value="HR-1">HR-1</option>
                          <option value="programming-1">Programming-1</option>
                        </select>
                      )}
                    />
                    {errors.subcategory && (
                      <p className={errorStyle}>{errors.subcategory.message}</p>
                    )}
                  </div>
                </div>
                {/* Country & Language */}
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="country" className={labelStyle}>
                      Country <span className="font-light">(Optional)</span>
                    </label>
                    <Controller
                      name="country"
                      control={control}
                      render={({
                        field,
                      }: {
                        field: ControllerRenderProps<FormData, "country">;
                      }) => (
                        <select {...field} id="country" className={inputStyle}>
                          <option value="">Select</option>
                          <option value="syria">Syria</option>
                          <option value="turkey">Turkey</option>
                        </select>
                      )}
                    />
                  </div>
                  <div>
                    <label htmlFor="language" className={labelStyle}>
                      Language
                    </label>
                    <div className="flex flex-wrap items-center border rounded-md xs:p-2 bg-white">
                      {languages.map((lang, index) => (
                        <span
                          key={index}
                          className="bg-[#D9F99D] text-[#4D7C0F] px-1 py-0 xs:px-2 xs:py-1 rounded m-1 text-xs xs:text-sm flex items-center"
                        >
                          {lang}
                          <button
                            onClick={() => removeLanguage(index)}
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
                        placeholder="Add language"
                        className="flex-grow outline-none w-2/3 text-sm xs:ml-2"
                      />
                    </div>
                    {errors.languages && (
                      <p className={errorStyle}>{errors.languages.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
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
