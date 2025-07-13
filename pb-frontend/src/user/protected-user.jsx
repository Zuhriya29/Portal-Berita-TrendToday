import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedUser(props) {
  let Cmp = props.Cmp;

  const navigate = useNavigate();
  useEffect(() => {
        if (!localStorage.getItem("user")) {
          navigate("/login-user");
        }
      })

  return (
    <div>
      <Cmp />
    </div>
  )
}

export default ProtectedUser;