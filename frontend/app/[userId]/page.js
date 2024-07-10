"use client";
import { useParams, useRouter } from "next/navigation";
import { isAuthorized } from "../../utils";
import { useState } from "react";

function UserDashboard() {
  const params = useParams();
  const router = useRouter();

  const [userInfo] = useState(JSON.parse(localStorage.getItem("user-info")));
  return (
    <div>
      <div>
        <div>Name: {userInfo.first_name + " " + userInfo.last_name}</div>
        <div>P5 Points: {userInfo.pr_points || 0}</div>
        <div>Reward Points: {userInfo.reward_points}</div>
      </div>
      <div>
        <button onClick={() => router.push(`${params.userId}/p5-history`)}>
          P5 History
        </button>
        <button onClick={() => router.push(`${params.userId}/reward-history`)}>
          Reward History
        </button>
      </div>
    </div>
  );
}

export default isAuthorized(UserDashboard);
