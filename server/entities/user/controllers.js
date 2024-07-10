import SQL from "../../db.js";

export const createUser = async () => {};

export const updateUser = async () => {};

export const loginUser = async (req, res) => {
  try {
    const { username = null } = req.body;

    if (username === null) {
      return res.status(422).json({
        success: false,
        message: "username required",
      });
    }

    // check if user exist  in database
    let user =
      await SQL`select * from "rewardSystem"."user" where  username = ${username}`;

    if (user.length === 0) {
      user = await SQL`INSERT INTO "rewardSystem"."user" 
        (first_name, last_name,p5_points,reward_points,  username) 
        values ('John','Watson',0, 0, ${username}) returning id, first_name, last_name, username`;
    }

    return res.status(200).json({
      user: user[0],
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};
