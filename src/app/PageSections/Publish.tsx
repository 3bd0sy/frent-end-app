"use client";

import React, { useState, ChangeEvent, KeyboardEvent } from "react";
interface ChildComponentProps {
  title: string;
  isOpen: boolean;
  onNav: () => void;
  handleBack: () => void;
  sendData: (data:any) => void;
}

export default function Publish(props: ChildComponentProps) {
  const [person, setPerson] = useState<string[]>([]);
  const [isCheckedPublic, setIsCheckedPubilc] = useState<boolean>(false);
  const [isCheckedPFreelancer, setIsCheckedFreelancer] =
    useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(!false);
  const [showArrow, setShowArrow] = useState<boolean>(true);

  const removePerson = (index: number) => {
    if (person.length > 0) {
      const newSkills = person.filter((_, i) => i !== index);
      setPerson(newSkills);
    }
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedFreelancer(event.target.checked);
  };
  const handleCheckboxChangePublic = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsCheckedPubilc(event.target.checked);
  };

  const handleClick = () => {
    // setShowForm((prv) => !prv);
    setShowForm(true);
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([
    "item 1",
    "item 2",
    "item 3",
  ]);

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      const newPerson = [...person, inputValue.trim()];
      setPerson(newPerson);
      setInputValue("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleClick();
    setShowArrow(false);
  
    console.log({
      isPublic: isCheckedPublic,
      inviteFreelancer: isCheckedPFreelancer,
      invitedPeople: person,
    });

    alert("post has been sent successfully ");
  };

  const labelStyle = "text-xs xs:text-sm font-medium text-gray-700 mb-1";

  return (
    <>
      {!(showForm && props.isOpen) ? (
        <div
          onClick={handleClick}
          className="bg-[#D9F99D] border-[#4D7C0F] sm:mt-8 mt-3  border-[1px] rounded-[5px] mx-auto sm:h-16 h-10 max-w-[350px] sm:max-w-[600px] md:max-w-4xl  flex justify-between items-center cursor-pointer mb-10 px-5"
        >
          <h2 className="font-bold sm:text-[18px] text-[12px]">Publish</h2>
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
          <div className=" max-w-96 sm:max-w-4xl mx-auto border border-[#4D7C0F] rounded-lg p-3 xs:p-8">
            {/* title */}
            <h2 className="sm:text-xl text-[12px] font-bold mb-6">Publish</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="grid sm:grid-cols-4 grid-cols-4 gap-1">
                  <div>
                    <label htmlFor="category" className={labelStyle + ""}>
                      Jop adience
                    </label>
                  </div>

                  <div className="flex items-center col-span-1">
                    <input
                      type="checkbox"
                      id="custom-checkbox"
                      checked={isCheckedPublic}
                      onChange={handleCheckboxChangePublic}
                      className="appearance-none w-4 h-4 xs:w-5 xs:h-5 border border-black  rounded-sm bg-white checked:bg-[#4D7C0F] checked:border-[#4D7C0F] cursor-pointer transition-colors duration-200 ease-in-out relative"
                    />
                    <label htmlFor="" className="ml-1 xs:ml-3 text-[14px]">
                      Public
                    </label>
                  </div>

                  <div className="flex items-center col-span-2">
                    <input
                      type="checkbox"
                      id="custom-checkbox"
                      checked={isCheckedPFreelancer}
                      onChange={handleCheckboxChange}
                      name="Invite"
                      className="appearance-none w-4 h-4 xs:w-5 xs:h-5 border border-black  rounded-sm bg-white checked:bg-[#4D7C0F] checked:border-[#4D7C0F] cursor-pointer transition-colors duration-200 ease-in-out relative"
                    />
                    <label
                      htmlFor="Invite"
                      className="ml-1 xs:ml-3 text-[14px] xs:text-sm"
                    >
                      Invite freelancer
                    </label>
                  </div>
                </div>
                {/* invite sction */}

                {isCheckedPFreelancer ? (
                  <>
                    <div>
                      <label
                        htmlFor="country"
                        className={labelStyle + " mb-[-10px]"}
                      >
                        Invite Freelancers{" "}
                        <span className="font-light">(Optional)</span>
                      </label>
                    </div>
                    <div className="flex flex-wrap   border rounded-md p-2 bg-white">
                      {person.map((lang, index) => (
                        <span
                          key={index}
                          className=" px-2 py-1 rounded m-1 text-sm flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            // stroke-width="2"
                            strokeWidth="2"
                            strokeLinecap="round"
                            stroke-linejoin="round"
                            className="lucide lucide-user mr-2"
                          >
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                          {lang}
                          <button
                            onClick={() => removePerson(index)}
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
                        placeholder="Add person"
                        list="suggestions-list"
                        className="h-12 flex-grow outline-none text-sm ml-2"
                      />
                      <datalist id="suggestions-list" className="bg-white">
                        {suggestions.map((suggestion, index) => (
                          <option key={index} value={suggestion} />
                        ))}
                      </datalist>
                    </div>
                  </>
                ) : (
                  ""
                )}
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
                  Post
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
}
