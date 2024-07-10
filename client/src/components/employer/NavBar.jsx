import { useContext } from "react";
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
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Menu,
  Text,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import "../../assets/styles/HeaderFooter.css";
import { AuthContext } from "../../context/AuthContext"; // Ensure correct path to AuthContext

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { isAuthenticated, user, logout } = useContext(AuthContext); // Use AuthContext

  return (
    <Box as="header" className="emp-header" py={4}>
      <Container maxW="100%" px="8">
        <Flex justify="space-between" align="center">
          <Heading as="h1" size="lg" className="emp-logo-text">
            JobSphere
          </Heading>
          {isDesktop ? (
            <>
              <HStack spacing="8" className="emp-navLink">
                <Link className="nav-link" as={RouterLink} to="/employer">
                  Home
                </Link>
                <Link
                  className="nav-link"
                  as={RouterLink}
                  to="/employer/job-creation"
                >
                  Post a Job
                </Link>
                <Link className="nav-link" to="/employer/find-employee">
                  Find Employee
                </Link>
              </HStack>
              <HStack spacing="4">
                {isAuthenticated ? (
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
                          <Avatar size={"sm"} src={"../images/profile.png"} />
                          <Text color={"white"}>{user.name}</Text>
                        </HStack>
                      </MenuButton>
                      <MenuList>
                        <MenuItem>Profile</MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={logout}>Logout</MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                ) : (
                  <>
                    <Button
                      px={8}
                      as={RouterLink}
                      to="/auth/signup"
                      className="emp-sign-up-button"
                    >
                      Sign Up
                    </Button>
                    <Button
                      px={8}
                      as={RouterLink}
                      to="/auth/signin"
                      className="emp-login-button"
                    >
                      Login
                    </Button>
                  </>
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
                {isAuthenticated ? (
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      variant={"link"}
                      cursor={"pointer"}
                      minW={0}
                    >
                      <HStack>
                        <Avatar size={"sm"} src={"../images/profile.png"} />
                        <Text>{user.name}</Text>
                      </HStack>
                    </MenuButton>
                    <MenuList>
                      <MenuItem>Profile</MenuItem>
                      <MenuDivider />
                      <MenuItem onClick={logout}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                ) : (
                  <>
                    <Button
                      px={8}
                      as={RouterLink}
                      to="/auth/signup"
                      className="emp-sign-up-button"
                    >
                      Sign Up
                    </Button>
                    <Button
                      px={8}
                      as={RouterLink}
                      to="/auth/signin"
                      className="emp-login-button"
                    >
                      Login
                    </Button>
                  </>
                )}
              </Flex>
            </DrawerHeader>
            <DrawerBody>
              <VStack spacing="4" align="start">
                <Link
                  className="nav-link"
                  as={RouterLink}
                  to="/employer"
                  onClick={onClose}
                >
                  Home
                </Link>
                <Link
                  className="nav-link"
                  as={RouterLink}
                  to="/employer/job-creation"
                  onClick={onClose}
                >
                  Post a Job
                </Link>
                <Link
                  className="nav-link"
                  as={RouterLink}
                  to="/employer/find-employee"
                  onClick={onClose}
                >
                  Find Employee
                </Link>
                {isAuthenticated ? null : (
                  <>
                    <Button
                      as={RouterLink}
                      to="/auth/signup"
                      onClick={onClose}
                      className="emp-sign-up-button"
                      width="100%"
                    >
                      Sign Up
                    </Button>
                    <Button
                      as={RouterLink}
                      to="/auth/signin"
                      onClick={onClose}
                      className="emp-login-button"
                      width="100%"
                    >
                      Login
                    </Button>
                  </>
                )}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </Box>
  );
};

export default NavBar;