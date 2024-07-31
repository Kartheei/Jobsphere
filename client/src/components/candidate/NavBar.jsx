import { useContext } from "react";

import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Button,
  Link,
  IconButton,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  Text,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom"; // Import RouterLink

import "../../assets/styles/HeaderFooter.css";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext

import { SearchBar } from "./SearchBar";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { isAuthenticated, user, logout } = useContext(AuthContext); // Use AuthContext

  return (
    <Box as="header" className="header" py={4}>
      <Container maxW="100%" px="8">
        <Flex justify="space-between" align="center">
          <Heading as="h1" size="lg" className="Logo-text">
            JobSphere
          </Heading>
          {isDesktop ? (
            <>
              <HStack spacing="8" className="navLink">
                <Link as={RouterLink} className="nav-link" to="/">
                  Home
                </Link>
                <Link as={RouterLink} className="nav-link" to="/jobs">
                  Find a Job
                </Link>
                <Link as={RouterLink} className="nav-link" to="/about">
                  About
                </Link>
                <Link as={RouterLink} className="nav-link" to="/contact">
                  Contact
                </Link>
              </HStack>
              <HStack spacing="4">
                <SearchBar />
                {!isAuthenticated ? (
                  <>
                    <Button
                      px={8}
                      as={RouterLink}
                      to="/auth/signup"
                      className="sign-up-button"
                    >
                      Sign Up
                    </Button>
                    <Button
                      px={8}
                      as={RouterLink}
                      to="/auth/signin"
                      className="login-button"
                    >
                      Login
                    </Button>
                  </>
                ) : (
                  <Flex alignItems={"center"}>
                    <Menu>
                      <MenuButton
                        as={Button}
                        rounded={"full"}
                        variant={"link"}
                        cursor={"pointer"}
                        minW={0}
                      >
                        <HStack>
                          <Box className="profile-avatar" />
                          <Text>{user.name}</Text>
                        </HStack>
                      </MenuButton>
                      <MenuList>
                        <MenuItem as={RouterLink} to="/profile">
                          Profile
                        </MenuItem>
                        <MenuItem as={RouterLink} to="/jobApplied">
                          Applied Jobs
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={logout}>Logout</MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                )}
              </HStack>
            </>
          ) : (
            <IconButton
              aria-label="Open Menu"
              icon={<HamburgerIcon />}
              onClick={onOpen}
            />
          )}
        </Flex>
      </Container>

      {/* Mobile and Tablet Drawer Menu */}
      {!isDesktop && (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerHeader>
              <Flex alignItems={"center"} width="100%">
                {!isAuthenticated ? (
                  <>
                    <Button
                      px={8}
                      as={RouterLink}
                      to="/auth/signup"
                      className="sign-up-button"
                    >
                      Sign Up
                    </Button>
                    <Button
                      px={8}
                      as={RouterLink}
                      to="/auth/signin"
                      className="login-button"
                    >
                      Login
                    </Button>
                  </>
                ) : (
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      variant={"link"}
                      cursor={"pointer"}
                      minW={0}
                    >
                      <HStack>
                        <Box className="profile-avatar" />
                        <Text>{user.name}</Text>
                      </HStack>
                    </MenuButton>
                    <MenuList>
                      <MenuItem as={RouterLink} to="/profile">
                        Profile
                      </MenuItem>
                      <MenuItem as={RouterLink} to="/jobApplied">
                        Applied Jobs
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem onClick={logout}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                )}
              </Flex>
            </DrawerHeader>
            <DrawerBody>
              <VStack spacing="4" align="start">
                <Link as={RouterLink} to="/" onClick={onClose}>
                  Home
                </Link>
                <Link as={RouterLink} to="/jobs" onClick={onClose}>
                  Find a Job
                </Link>
                <Link as={RouterLink} to="/about" onClick={onClose}>
                  About
                </Link>
                <Link as={RouterLink} to="/contact" onClick={onClose}>
                  Contact
                </Link>
                <SearchBar />
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </Box>
  );
};

export default NavBar;
