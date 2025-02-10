import React from "react";
import * as router from "react-router-dom";

const Redirect = ({ to }) => {
  const navigate = router.useNavigate();
  React.useEffect(() => {
    return navigate(to, { replace: true });
  });
};

export default Redirect;
