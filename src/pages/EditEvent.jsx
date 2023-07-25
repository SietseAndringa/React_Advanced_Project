import { React } from "react";
import {
  Button,
  HStack,
  Heading,
  Input,
  Select,
  Text,
  Textarea,
  Center,
  Box,
} from "@chakra-ui/react";
import { Form, useLoaderData, redirect } from "react-router-dom";

export const action = async ({ request, params }) => {
  const formData = Object.fromEntries(await request.formData());
  formData["createdBy"] = parseInt(formData["createdBy"]);
  formData["categoryIds"] = parseInt(formData["categoryIds"]);
  formData["categoryIds"] = Array.from(String(formData["categoryIds"]), Number);

  const editId = await fetch(`http://localhost:3000/events/${params.eventId}`, {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => json.id);

  localStorage.setItem("showToastEditEvent", true);

  return redirect(`/event/${editId}`);
};

export const loader = async ({ params }) => {
  const users = await fetch("http://localhost:3000/users");
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);

  return {
    users: await users.json(),
    events: await events.json(),
    categories: await categories.json(),
    event: await event.json(),
  };
};

const redirectAfterCancel = (eventId) => {
  return (window.location.href = `/event/${eventId}`);
};

export const EditEvent = () => {
  const { users, event, categories } = useLoaderData();

  return (
    <Center>
      <Box w="75%" className="edit-event">
        <Heading textAlign="center" mb="1rem" color="white">
          Edit Event
        </Heading>
        <Form method="post" id="newEvent">
          <label>
            <Text as="b" color="white">
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
            <Text as="b" color="white">
              Title:
            </Text>
            <Input
              backgroundColor="blue.100"
              borderColor="transparent"
              focusBorderColor="green.500"
              defaultValue={event.title}
              mb="1rem"
              required
              type="text"
              name="title"
            />
          </label>

          <label>
            <Text as="b" color="white">
              Description:
            </Text>
            <Textarea
              backgroundColor="blue.100"
              borderColor="transparent"
              focusBorderColor="green.500"
              defaultValue={event.description}
              mb="1rem"
              required
              name="description"
              aria-label="Body"
              rows="2"
            />
          </label>
          <label>
            <Text as="b" color="white">
              Url of image:
            </Text>
            <Input
              backgroundColor="blue.100"
              borderColor="transparent"
              focusBorderColor="green.500"
              defaultValue={event.image}
              mb="1rem"
              required
              type="text"
              name="image"
            />
          </label>
          <Text as="b" color="white">
            Select categorie:
          </Text>
          <label>
            <Select
              backgroundColor="blue.100"
              borderColor="transparent"
              focusBorderColor="green.500"
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
            <Text as="b" color="white">
              Location:
            </Text>
            <Input
              backgroundColor="blue.100"
              borderColor="transparent"
              focusBorderColor="green.500"
              defaultValue={event.location}
              mb="1rem"
              required
              name="location"
              aria-label="Body"
              rows="2"
            />
          </label>
          <label>
            <Text as="b" color="white">
              Select starting date and time:
            </Text>
            <Input
              backgroundColor="blue.100"
              borderColor="transparent"
              focusBorderColor="green.500"
              mb="1rem"
              required
              type="datetime-local"
              id="meeting-time"
              name="startTime"
            ></Input>
          </label>
          <label>
            <Text as="b" color="white">
              Select ending date and time:
            </Text>
            <Input
              backgroundColor="blue.100"
              borderColor="transparent"
              focusBorderColor="green.500"
              mb="1rem"
              required
              type="datetime-local"
              id="meeting-time"
              name="endTime"
            ></Input>
          </label>
          <HStack justify="space-between">
            <Button type="submit" colorScheme="green">
              Save Changes
            </Button>
            <Button
              colorScheme="red"
              onClick={() => redirectAfterCancel(event.id)}
            >
              Cancel
            </Button>
          </HStack>
        </Form>
      </Box>
    </Center>
  );
};

{
  /* <div className="new-event">
      <Heading>Edit the event</Heading>
      <Form method="post" id="newEvent">
        <label>
          <span>User:</span>
          <Select required name="createdBy">
            {users.map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </Select>
        </label>
        <label>
          <Text fontSize="xl">Title:</Text>
          <Input defaultValue={event.title} required type="text" name="title" />
        </label>

        <label>
          <span>Description:</span>
          <Textarea
            defaultValue={event.description}
            required
            name="description"
            aria-label="Body"
            rows="2"
          />
        </label>
        <label>
          <span>Url of image:</span>
          <Input defaultValue={event.image} required type="text" name="image" />
        </label>
        <span>Categorie:</span>
        <label>
          <Select required name="categoryIds">
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </label>
        <label>
          <span>Location:</span>
          <Textarea
            defaultValue={event.location}
            required
            name="location"
            aria-label="Body"
            rows="2"
          />
        </label>
        <label htmlFor="meeting-time">Starting date and time:</label>
        <input
          required
          type="datetime-local"
          id="meeting-time"
          name="startTime"
        ></input>
        <label htmlFor="meeting-time">Ending time and date:</label>
        <input
          required
          type="datetime-local"
          id="meeting-time"
          name="endTime"
        ></input>
        <div>
          <span>
            <Button type="submit">Save changes</Button>
          </span>
          <span>
            <Button onClick={() => redirectAfterCancel(event.id)}>
              Cancel
            </Button>
          </span>
        </div>
      </Form>
    </div>
  );
}; */
}
