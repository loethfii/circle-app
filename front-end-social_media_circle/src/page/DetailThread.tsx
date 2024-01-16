import React from "react";
import { useParams } from "react-router-dom";
import DetailThreadLayout from "../layouts/DetailThread/DetailThreadLayout";
// import { useLocation } from "react-router-dom";

const DetailThread: React.FC = () => {
  const { threadId } = useParams();

  if (threadId) {
    // console.log(threadId);
  }
  return (
    <div>
      <DetailThreadLayout />
    </div>
  );
};

export default DetailThread;
