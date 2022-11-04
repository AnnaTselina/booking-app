import { useQuery } from "@apollo/client";
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { GET_USER } from "../../queries-graphql";
import routes from "../../utils/routes";

const PrivateRoutes = () => {
  const { data, loading } = useQuery(GET_USER, {
    fetchPolicy: "network-only",
  });

  if (loading) {
    return (
      <div className="loading">
        <span className="icon-loading big" />
      </div>
    );
  }
  return data?.getUser?.id ? <Outlet /> : <Navigate to={routes.HOME} />;
};

export default PrivateRoutes;
