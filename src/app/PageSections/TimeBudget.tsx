"use client";

import React, { useState, ChangeEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";

const schema = z.object({
  date: z.string().min(1, "date is required"),
  type: z.string().min(1, "type is required"),
  from: z.string().optional(),
  to: z.string().optional(),
  budget: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

interface ChildComponentProps {
  title: string;
  isOpen: boolean;
  onNav: () => void;
  handleBack: () => void;
  sendData: (data:any) => void;
}

export default function TimeBudget(props: ChildComponentProps) {
  const [jopType, setJopType] = useState<string>("Hourly");
  const [showBudgetElement, setShowBudgetElement] = useState<boolean>(!false);
  const [showForm, setShowForm] = useState<boolean>(!false);
  const [showArrow, setShowArrow] = useState<boolean>(true);
  const [valueFrom, setValueFrom] = useState("");
  const [valueTo, setValueTo] = useState("");
  const [valueBudget, setValueBudget] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: "",
      type: "Hourly",
    },
  });
  const handleClick = () => {
    // setShowForm((prv) => !prv);
    setShowForm(true);
  };
  const handeType = () => {
    jopType === "Hourly"
      ? setShowBudgetElement(false)
      : setShowBudgetElement(true);
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
          className="bg-[#D9F99D] border-[#4D7C0F] sm:mt-8 mt-3  border-[1px] rounded-[5px] mx-auto sm:h-16 h-10 max-w-[350px] sm:max-w-[600px] md:max-w-4xl flex justify-between items-center cursor-pointer  px-5"
        >
          <h2 className="font-bold sm:text-[18px] text-[12px]">
            Time and Budget
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
          <div className=" max-w-96 sm:max-w-4xl mx-auto border  border-[#4D7C0F] rounded-lg p-8">
            {/* title */}
            <h2 className="sm:text-xl text-[12px] font-bold mb-6">
              Description and Skills
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                {/*type & cost*/}
                <div className="grid sm:grid-cols-3 grid-cols-1 gap-6">
                  {/* 1 */}
                  <div>
                    <label htmlFor="category" className={labelStyle}>
                      Jop Type
                    </label>
                    <Controller
                      name="type"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            setJopType(e.target.value);
                            handeType();
                          }}
                          id="type"
                          className={inputStyle}
                        >
                          <option  value="Hourly">
                            Hourly
                          </option>
                          <option value="FixedRate">Fixed rate</option>
                        </select>
                      )}
                    />
                    {errors.type && (
                      <p className={errorStyle}>{errors.type.message}</p>
                    )}
                  </div>
                  {showBudgetElement ? (
                    <>
                      <div>
                        <label htmlFor="from" className={labelStyle}>
                          From <span className="font-light">(Optional)</span>
                        </label>
                        <div className="relative max-w-xs">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 text-lg font-medium">
                            $
                          </span>
                          <input
                            type="text"
                            value={valueFrom}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              setValueFrom(
                                e.target.value.replace(/[^0-9.]/g, "")
                              )
                            }
                            className={inputStyle + " pl-8 font-light"}
                            placeholder="0.00"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="to" className={labelStyle}>
                          To <span className="font-light">(Optional)</span>
                        </label>
                        <div className="relative max-w-xs">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 text-lg font-medium">
                            $
                          </span>

                          <input
                            type="text"
                            value={valueTo}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              setValueTo(e.target.value.replace(/[^0-9.]/g, ""))
                            }
                            className={inputStyle + " pl-8 font-light"}
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="col-span-2 w-full">
                      <label htmlFor="budget" className={labelStyle}>
                        Budget <span className="font-light">(Optional)</span>
                      </label>
                      <div className="relative w-full">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 text-lg font-medium">
                          $
                        </span>

                        <input
                          type="text"
                          value={valueBudget}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setValueBudget(
                              e.target.value.replace(/[^0-9.]/g, "")
                            )
                          }
                          className={inputStyle + " pl-8 font-light"}
                          placeholder="0.00"
                          name="budget"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative h-12 pt-3 mb-4">
                  <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="date"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg w-full pl-10 p-5"
                      />
                    )}
                  />
                  {errors.date && (
                    <p className={errorStyle}>{errors.date.message}</p>
                  )}

                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
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
