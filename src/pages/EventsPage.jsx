import { React, useState } from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Input,
  Text,
  Badge,
  useToast,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";

export const loader = async () => {
  const users = await fetch("http://localhost:3000/users");
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    users: await users.json(),
    events: await events.json(),
    categories: await categories.json(),
  };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();
  const toast = useToast();
  const showToastRemoved = JSON.parse(localStorage.getItem("showToastRemoved"));

  if (showToastRemoved) {
    toast({
      title: "Event Removed!",
      description: "The event was succesfully removed",
      position: "bottom-left",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    localStorage.setItem("showToastRemoved", false);
  }

  // Search function
  const [searchField, setSearchField] = useState("");
  const [category, setCategory] = useState(0);

  const handleOnChangeSearch = (event) => {
    setSearchField(event.target.value);
  };

  const searchFilter = function (events) {
    const searchEvents = events.filter((item) => {
      return item.title.toLowerCase().includes(searchField.toLowerCase());
    });
    if (category === 1) {
      const sports = searchEvents.filter(function (event) {
        return event.categoryIds.includes(category);
      });
      return sports;
    } else if (category === 2) {
      const games = searchEvents.filter(function (event) {
        return event.categoryIds.includes(category);
      });
      return games;
    } else {
      return searchEvents;
    }
  };

  const filteredEvents = searchFilter(events);

  return (
    <>
      <Center>
        <HStack p="1%" spacing="25px">
          <Heading textColor="white" size="md">
            Select categorie:
          </Heading>
          <Button backgroundColor="blue.100" onClick={() => setCategory(0)}>
            All
          </Button>
          {categories.map((category) => (
            <Button
              backgroundColor="blue.100"
              key={category.id}
              onClick={() => setCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </HStack>
      </Center>

      <Center>
        <Input
          placeholder="Search for event"
          borderColor="blue.100"
          borderWidth="2px"
          onChange={handleOnChangeSearch}
          width="50%"
          height="40px"
          variant={"outline"}
          focusBorderColor="green.500"
          color="white"
        />
      </Center>
      <Flex wrap="wrap" justifyContent="space-evenly">
        {filteredEvents.map((event) => (
          <Box
            w="400px"
            bg="blue.100"
            m="1%"
            p="1%"
            borderRadius="10px"
            key={event.id}
            className="event"
          >
            <Link to={`/event/${event.id}`}>
              <Heading m="0.5rem" size="md" align="center">
                {event.title}
              </Heading>
              <Text align="center">{event.description}</Text>
              <Center>
                <Image
                  m="1rem"
                  fit="cover"
                  borderRadius="full"
                  boxSize="200px"
                  src={event.image}
                  alt="Image not found, please check url"
                />
              </Center>
              <Text align="center">
                Start: {event.startTime.slice(0, 16).replace("T", " ")}
              </Text>
              <Text lineHeight="200%" align="center">
                End: {event.endTime.slice(0, 16).replace("T", " ")}
              </Text>
              <Center>
                <HStack>
                  {categories.map((category) =>
                    event.categoryIds.includes(category.id) ? (
                      <Badge
                        backgroundColor="green.200"
                        m="1rem"
                        key={category.id}
                      >
                        {category.name}
                      </Badge>
                    ) : null
                  )}
                </HStack>
              </Center>
            </Link>
          </Box>
        ))}
      </Flex>
    </>
  );
};
