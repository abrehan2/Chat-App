import { HStack, Avatar, Text } from "@chakra-ui/react";

const Message = ({ text, uri, user = "other" }) => {
  return (
    <>
      <HStack
        borderRadius={"base"}
        paddingX={user === "me" ? "4" : "2"}
        paddingY={"2"}
        bg={"gray.100"}
        alignSelf={user === "me" ? "flex-end" : "flex-start"}
      >
        {user === "other" && <Avatar src={uri} />}
        <Text>{text}</Text>
        {user === "me" && <Avatar src={uri} />}
      </HStack>
    </>
  );
};

export default Message;
