import { SetStateAction, useState } from "react";
import { trpc } from "../lib/trpc";
import {
  Button,
  majorScale,
  Pane,
  TextInput,
  Heading,
  toaster,
} from "evergreen-ui";

export default () => (
  <Pane
    display="flex"
    width="100%"
    justifyContent="space-between"
    alignItems="center"
    padding={majorScale(2)}
  >
    <Heading>Nav Bar</Heading>
    <Button
      appearance="primary"
      cursor="pointer"
      onClick={() => toaster.success("To Do!")}
    >
      Sign Up
    </Button>
  </Pane>
);
