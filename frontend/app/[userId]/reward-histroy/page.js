import { useEffect } from "react";
import { isAuthorized } from "../../../utils";
import { useParams } from "next/navigation";

function RewardHistory() {
  const params = useParams();
  useEffect(() => {
    //  fetch reward history from  end point for params.userId
  }, []);
  return <div></div>;
}

export default isAuthorized(RewardHistory);
