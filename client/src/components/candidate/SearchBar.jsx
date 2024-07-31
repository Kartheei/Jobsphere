import { useState } from "react";

import { Search2Icon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const inputWidth = useBreakpointValue({
    base: "100px",
    sm: "100%",
    md: "200px",
    lg: "250px",
  });
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
  const navigate = useNavigate();
  const toast = useToast();

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (searchQuery.trim() === "") {
        toast({
          title: "Search field is empty.",
          description: "Please enter a job title or location to search.",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      navigate(
        `/jobs?title=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(searchQuery)}`
      );
    }
  };

  return (
    <InputGroup borderRadius={5}>
      <InputLeftElement pointerEvents="none">
        <Search2Icon color="gray.600" />
      </InputLeftElement>
      <Input
        width={inputWidth}
        placeholder="Job Title or Location"
        border="1px solid #28395a"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
    </InputGroup>
  );
};
