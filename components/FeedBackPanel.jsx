import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import FeedBackCard from "./FeedBackCard";
import { useSnackBar } from "./SnackBar/SnackBarService";
const FeedBackPanel = ({ feedbacks, setFeedBacks, property_listing }) => {
  const [feedBackMessage, setFeedBackMessage] = useState("");
  const [disable, setDisable] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const snackBar = useSnackBar();
  const {data:session} = useSession()
  useEffect(() => {
    if (feedBackMessage.length > 3 && !submitting && session?.user) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [feedBackMessage]);
  //handler to add an feedback using POST request
  const handleAddFeedBack = async () => {
    try {
      setSubmitting(true);
      const response = await fetch("api/listing/add-feedback", {
        method: "POST",
        body: JSON.stringify({
          property_listing: property_listing,
          feedback: feedBackMessage,
        }),
      });
      if (response.ok) {
        const feedback = await response.json();
        setFeedBacks((prevState) => [feedback, ...prevState]);
        snackBar.open(
          "success",
          {
            label: "Submission Successful",
            message: "Added FeedBack Successfully",
          },
          7000
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col gap-1">
      <h1 className="mt-2 text-xl tracking-wide font-bold">Feedbacks</h1>
      <h2 className="text-base font-medium text-gray-500">
        We'd love to hear your feedback!
      </h2>
      <div className="flex gap-3 items-center">
        <textarea
          className="border-2 p-2 rounded-md focus:outline-active-orange focus:outline-2 flex-grow"
          placeholder="Your feedback here..."
          value={feedBackMessage}
          onChange={(e) => setFeedBackMessage(e.target.value)}
        ></textarea>
        <button
          className={
            "bg-active-orange text-white rounded-full w-14 h-14 flex items-center justify-center " +
            (disable && "disabled")
          }
          title="send the feed back"
          onClick={handleAddFeedBack}
        >
          <FaAngleRight size={40} />
        </button>
      </div>
      {/* Feedbacks of user */}
      <div className="flex flex-col gap-2 w-full mt-2 px-8">
        {feedbacks.map((feedback, index) => (
          <FeedBackCard  key = {feedback?._id} feedback={feedback} />
        ))}
      </div>
    </div>
  );
};

export default FeedBackPanel;
