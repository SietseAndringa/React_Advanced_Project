import { React } from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Form, useLoaderData, redirect } from "react-router-dom";

export const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  // convert object values from formData to correct data type
  formData["createdBy"] = parseInt(formData["createdBy"]);
  formData["categoryIds"] = parseInt(formData["categoryIds"]);
  formData["categoryIds"] = Array.from(String(formData["categoryIds"]), Number);

  const newId = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => json.id);

  // Have to use localStorage to get Toast to work in action component

  localStorage.setItem("showToastNewEvent", true);

  return redirect(`/event/${newId}`);
};

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

export const NewEvent = () => {
  const { users, categories } = useLoaderData();

  return (
    <Center>
      <Box w="75%">
        <Heading textAlign="center" mb="1rem" color="white">
          Add a new event
        </Heading>
        <Form method="post" id="newEvent">
          <label>
            <Text color="white" as="b">
              Select user:
            </Text>
            <Select
              backgroundColor="blue.100"
              borderColor="transparent"
              focusBorderColor="green.500"
              mb="1rem"
              required
              name="createdBy"
            >
              {users.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
          </label>
          <label>
            <Text color="white" as="b">
              Title:
            </Text>
            <Input
              backgroundColor="blue.100"
              borderColor="transparent"
              focusBorderColor="green.500"
              mb="1rem"
              required
              type="text"
              name="title"
            />
          </label>

          <label>
            <Text color="white" as="b">
              Description:
            </Text>
            <Textarea
              borderColor="transparent"
              focusBorderColor="green.500"
              mb="1rem"
              required
              name="description"
              aria-label="Body"
              rows="2"
              backgroundColor="blue.100"
            />
          </label>
          <label>
            <Text color="white" as="b">
              Url of image:
            </Text>
            <Input
              borderColor="transparent"
              focusBorderColor="green.500"
              backgroundColor="blue.100"
              mb="1rem"
              required
              type="text"
              name="image"
            />
          </label>
          <Text color="white" as="b">
            Select categorie:
          </Text>
          <label>
            <Select
              borderColor="transparent"
              focusBorderColor="green.500"
              backgroundColor="blue.100"
              mb="1rem"
              required
              name="categoryIds"
            >
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </label>
          <label>
            <Text color="white" as="b">
              Location:
            </Text>
            <Input
              borderColor="transparent"
              focusBorderColor="green.500"
              mb="1rem"
              required
              name="location"
              aria-label="Body"
              rows="2"
              backgroundColor="blue.100"
            />
          </label>
          <label>
            <Text color="white" as="b">
              Select starting date and time:
            </Text>
            <Input
              borderColor="transparent"
              focusBorderColor="green.500"
              mb="1rem"
              required
              type="datetime-local"
              id="meeting-time"
              name="startTime"
              backgroundColor="blue.100"
            ></Input>
          </label>
          <label>
            <Text color="white" as="b">
              Select ending date and time:
            </Text>
            <Input
              borderColor="transparent"
              focusBorderColor="green.500"
              mb="1rem"
              required
              type="datetime-local"
              id="meeting-time"
              name="endTime"
              backgroundColor="blue.100"
            ></Input>
          </label>

          <Button type="submit" colorScheme="green" size="lg">
            Save
          </Button>
        </Form>
      </Box>
    </Center>
  );
};
