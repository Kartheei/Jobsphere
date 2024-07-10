import { Search2Icon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  useBreakpointValue,
} from "@chakra-ui/react";

export const SearchBar = () => {
  const inputWidth = useBreakpointValue({
    base: "100px",
    sm: "100%",
    md: "200px",
    lg: "250px",
  });
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <InputGroup borderRadius={5} size={buttonSize}>
      <InputLeftElement pointerEvents="none">
        <Search2Icon color="gray.600" />
      </InputLeftElement>
      <Input
        width={inputWidth}
        placeholder="Search..."
        border="1px solid #28395a"
      />
      <InputRightAddon p={0} border="none">
        <Button
          size={buttonSize}
          backgroundColor="#28395a"
          color="#fff"
          borderLeftRadius={0}
          borderRightRadius={3.3}
          border="1px solid #949494"
          className="jobSearch"
        >
          Search
        </Button>
      </InputRightAddon>
    </InputGroup>
  );
};
