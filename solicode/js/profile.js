import {
  checkIfuserLogin,
  setUserName,
  user_id,
  user_img,
  user_name,
  class_id,
} from "./functions.js";

checkIfuserLogin(user_id, getStatistic);
setUserName(user_name, user_img);

function getStatistic() {}
