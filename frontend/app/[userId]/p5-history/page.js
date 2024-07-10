import { useEffect } from "react";
import { isAuthorized } from "../../../utils";
import { useParams } from "next/navigation";

function P5History() {
  const params = useParams();
  useEffect(() => {
    //  fetch P5 history from  end point for params.userId
  }, []);
  return <div></div>;
}

export default isAuthorized(P5History);
