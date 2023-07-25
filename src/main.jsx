import { Box, Center, ChakraProvider, Heading } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage, loader as postLoader } from "./pages/EventPage";
import { EventsPage, loader as postListLoader } from "./pages/EventsPage";
import {
  NewEvent,
  loader as addEventLoader,
  action as createEventAction,
} from "./pages/NewEvent";
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import { Root } from "./components/Root";
import {
  EditEvent,
  loader as editEventLoader,
  action as editEventAction,
} from "./pages/EditEvent";

// Error handling

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);

  return (
    <>
      <Box>
        <Center>
          <Heading>Oops...Something went wrong. </Heading>
        </Center>
      </Box>
      <Box>
        <Center>
          <Heading>Please try again later</Heading>
        </Center>
      </Box>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: postListLoader,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        loader: postLoader,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/newEvent",
        element: <NewEvent />,
        loader: addEventLoader,
        action: createEventAction,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/editEvent/:eventId",
        element: <EditEvent />,
        loader: editEventLoader,
        action: editEventAction,
        errorElement: <ErrorBoundary />,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
