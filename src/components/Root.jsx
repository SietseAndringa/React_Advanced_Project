import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";

export const Root = () => {
  return (
    <Box p="2%" backgroundColor="gray.700" minHeight="100vh">
      <Navigation />
      <Outlet />
    </Box>
  );
};
