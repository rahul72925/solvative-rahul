import SQL from "../../db.js";

export const sendP5Points = async (req, res) => {
  try {
    const { userid: userId } = req.headers;
    const { points, toUserId } = req.body;
    console.log(req.headers);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "unauthorized",
      });
    }

    if (!(points > 0) || !toUserId) {
      return res.status(422).json({
        success: false,
        message: "points should be more than 0  or toUserId is required",
      });
    }

    const userData =
      await SQL`select p5_points from "rewardSystem"."user" where id = ${userId}`;

    if (userData.length === 0) {
      return res.status(200).json({
        success: false,
        message: "user not available",
      });
    }

    const { p5_points } = userData[0];

    if (p5_points < points) {
      return res.status(200).json({
        success: false,
        message: "insufficient p5 points to be send",
      });
    }
    const [transaction, from_user, to_user] = await SQL.begin((sql) => [
      sql`INSERT INTO "rewardSystem"."rewardHistory" (from_user_id,  to_user_id, points) values (${userId}, ${toUserId},${points}) returning *`,
      sql`UPDATE "rewardSystem".user SET p5_points = p5_points - ${points} where id = ${userId} returning *`,
      sql`UPDATE "rewardSystem".user SET reward_points = reward_points + ${points} where id = ${toUserId} returning *`,
    ]);
    console.log({
      transaction,
      from_user,
      to_user,
    });

    return res.status(200).json({
      success: true,
      message: "Send successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

export const deleteP5Points = async (req, res) => {
  try {
    const { userid: userId } = req.headers;
    const { id: rewardHistoryId } = req.params;

    if (!rewardHistoryId) {
      return res.status(422).json({
        success: false,
        message: "id is required",
      });
    }
    console.log(rewardHistoryId);
    // get valid transaction

    const validTransaction =
      await SQL`SELECT *  FROM "rewardSystem"."rewardHistory" WHERE id = ${rewardHistoryId} and from_user_id = ${userId}`;

    if (validTransaction.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No valid transaction available",
      });
    }

    const { points, to_user_id } = validTransaction[0];
    const [transaction, from_user, to_user] = await SQL.begin((sql) => [
      sql`DELETE FROM "rewardSystem"."rewardHistory" WHERE id = ${rewardHistoryId} and from_user_id = ${userId}`,
      sql`UPDATE "rewardSystem".user SET p5_points = p5_points + ${points} where id = ${userId} returning *`,
      sql`UPDATE "rewardSystem".user SET reward_points = reward_points - ${points} where id = ${to_user_id} returning *`,
    ]);

    console.log({
      transaction,
      from_user,
      to_user,
    });

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};
export const getP5PointsHistory = async (req, res) => {
  try {
    const { userid: userId } = req.headers;

    const p5PointsHistory =
      await SQL`select rrh.id, ru.first_name, ru.last_name, rrh.created_at,points from "rewardSystem"."rewardHistory" rrh left join "rewardSystem".user ru on rrh.to_user_id = ru.id where rrh.from_user_id = ${userId} order by created_at desc`;

    return res.status(200).json({
      success: true,
      data: p5PointsHistory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

export const getRewardPointsHistory = async (req, res) => {
  try {
    const { userid: userId } = req.headers;

    const rewardPointsHistory =
      await SQL`select rrh.id, ru.first_name, ru.last_name, rrh.created_at, points from "rewardSystem"."rewardHistory" rrh left join "rewardSystem".user ru on rrh.from_user_id = ru.id where rrh.to_user_id = ${userId} order by created_at desc`;

    return res.status(200).json({
      success: true,
      data: rewardPointsHistory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};
