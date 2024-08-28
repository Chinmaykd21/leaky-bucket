"use client";

import React, { useState } from "react";

type requestStateType = {
  error: string;
  response: string;
};

const RateLimiter = () => {
  const [requestState, setRequestState] = useState<requestStateType>({
    error: "",
    response: "",
  });

  const makeNewRequest = async () => {
    setRequestState({
      ...requestState,
      error: "",
      response: "",
    });

    try {
      const res = await fetch("/api/hello");
      const data: { message: string; error: string } = await res.json();
      if (res.status === 429) {
        setRequestState({
          ...requestState,
          error: data.error,
          response: data.message,
        });
      } else {
        setRequestState({
          ...requestState,
          error: data.error,
          response: data.message,
        });
      }
    } catch (error) {
      setRequestState({
        ...requestState,
        error: "An error has occurred. Please try again!",
        response: "",
      });
    }
  };
  return (
    <>
      <button
        className="font-semibold bg-white text-black w-1/3 rounded-full"
        onClick={makeNewRequest}
      >
        Spam me!
      </button>
      <div className="text-center">
        <h1 className="text-xl">Status</h1>
        <div className="min-h-[40px]">
          {requestState.response.length > 0 &&
            requestState.error.length === 0 && (
              <p className="text-sm italic">
                Data fetched: {requestState.response}
              </p>
            )}
        </div>
        <div className="min-h-[40px]">
          {requestState.error.length > 0 && (
            <p className="text-sm italic text-red-500">{requestState.error}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default RateLimiter;
