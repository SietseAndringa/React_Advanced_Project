import React from "react";
import {
  Button,
  Heading,
  Box,
  Image,
  Text,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  HStack,
  Center,
  Flex,
} from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";

export const loader = async ({ params }) => {
  const users = await fetch("http://localhost:3000/users");
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categories = await fetch("http://localhost:3000/categories");

  return {
    users: await users.json(),
    event: await event.json(),
    categories: await categories.json(),
  };
};

const deleteEvent = async (eventId) => {
  await fetch(`http://localhost:3000/events/${eventId}`, {
    method: "DELETE",
  });
  localStorage.setItem("showToastRemoved", true);
  return (window.location.href = "/");
};

export const EventPage = () => {
  const { users, event, categories } = useLoaderData();

  // Toast
  const toast = useToast();
  const showToastNewEvent = JSON.parse(
    localStorage.getItem("showToastNewEvent")
  );
  const showToastEditEvent = JSON.parse(
    localStorage.getItem("showToastEditEvent")
  );

  if (showToastNewEvent) {
    toast({
      title: "Event Added!",
      description: "The event was succesfully added",
      position: "bottom-left",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    localStorage.setItem("showToastNewEvent", false);
  }

  if (showToastEditEvent) {
    toast({
      title: "Event Changed!",
      description: "The event was succesfully changed",
      status: "success",
      position: "bottom-left",
      duration: 5000,
      isClosable: true,
    });
    localStorage.setItem("showToastEditEvent", false);
  }

  // Alert dialog
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <>
      <Center>
        <Box width="550px" p="2%" borderRadius="2%" backgroundColor="white">
          <Heading mb="1rem">{event.title}</Heading>
          <Text>{event.description}</Text>
          <Image
            mt="1rem"
            mb="1rem"
            fit="cover"
            borderRadius="10px"
            width="500px"
            height="250px"
            src={event.image}
            alt="Image not found, please check url"
          />
          <HStack spacing="1rem">
            <Text as="b">Start:</Text>
            <Text>{event.startTime.slice(0, 16).replace("T", " ")}</Text>

            <Text as="b">End:</Text>
            <Text>{event.startTime.slice(0, 16).replace("T", " ")}</Text>
          </HStack>
          <HStack mt="1rem" spacing="1rem">
            <Text as="b">Location:</Text>
            <Text>{event.location}</Text>
          </HStack>
          <HStack mt="1rem" spacing="1rem">
            <Text as="b">Categorie:</Text>
            {categories.map((category) =>
              event.categoryIds.includes(category.id) ? (
                <Text key={category.id}>{category.name}</Text>
              ) : null
            )}
          </HStack>
          <HStack mt="1rem" mb="1rem" spacing="1rem">
            <Text as="b">Created by:</Text>
            <Text>
              {users.find((user) => user.id === event.createdBy).name}
            </Text>
          </HStack>
          <Flex justify="space-between">
            <Link to={`/editEvent/${event.id}`}>
              <Button colorScheme="green">Edit Event</Button>
            </Link>
            <Button colorScheme="red" onClick={onOpen}>
              Delete Event
            </Button>
          </Flex>

          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete Event
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? You can not undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => deleteEvent(event.id)}
                    ml={3}
                  >
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Box>
      </Center>
    </>
  );
};
