import React, { ReactElement, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";

export default function EmailSubmitted(): ReactElement {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => <Redirect to="/" />, 5000);
  }, [history]);

  return (
    <div className="content-container">
      <div className="grid w-11/12 h-60 max-w-xs mx-4 p-4 bg-white rounded-md shadow-md">
        <div>
          <h2 className="font-bold text-xl text-center pt-6">Email sent!</h2>
          <h2 className="font-bold text-xl text-center pt-6">
            Don&apos;t forget to check your spam folder
          </h2>
        </div>
      </div>
    </div>
  );
}
