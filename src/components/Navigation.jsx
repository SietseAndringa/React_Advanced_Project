import { Box, Flex, Button, Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <>
      <Box
        borderBottom="2px"
        borderStyle="solid"
        borderColor="black"
        mb="1%"
        pb="2%"
      >
        <nav>
          <Flex justify="space-around">
            <Link to="/">
              <Button size="lg" backgroundColor="blue.100">
                View Events
              </Button>
            </Link>

            <Heading textColor="white">Winc Events</Heading>

            <Link to="/newEvent">
              <Button colorScheme="green" size="lg">
                Add new event
              </Button>
            </Link>
          </Flex>
        </nav>
      </Box>
    </>
  );
};
