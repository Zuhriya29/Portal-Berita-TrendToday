import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedAdmin(props) {
  let Cmp = props.Cmp;

  const navigate = useNavigate();
  useEffect(() => {
        if (!localStorage.getItem("user-admin")) {
          navigate("/login-admin");
        }
      })

  return (
    <div>
      <Cmp />
    </div>
  )
}

export default ProtectedAdmin;