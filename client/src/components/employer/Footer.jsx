import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  Link,
  Text,
} from "@chakra-ui/react";
import "../../assets/styles/HeaderFooter.css";

const Footer = () => {
  return (
    <Box as="footer" className="footer" py={{ base: "8", md: "8" }} mt="16">
      <Container maxW="100%" px={{ base: "4", md: "8" }}>
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          justify="space-between"
          align="flex-start"
        >
          <Box className="footer-section" flex="1" mb={{ base: "8", md: "0" }}>
            <Heading as="h5" size="md" mb="4">
              About Us
            </Heading>
            <Text
              className="about-para"
              width={{ lg: "350px", sm: "100%", md: "100%" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </Box>
          <Box className="footer-section" flex="1" mb={{ base: "8", md: "0" }}>
            <Heading as="h5" size="md" mb="4">
              Contact
            </Heading>
            <Text>Address: 123 Main St. Waterloo, On, Canada 85486</Text>
            <Text>Email: info@jobsphere.com</Text>
            <Text>Contact: +1 (254) 265-5555</Text>
          </Box>
          <Box className="footer-section" flex="1">
            <Heading as="h5" size="md" mb="4">
              Important Links
            </Heading>
            <Stack spacing="2">
              <Link>Home</Link>
              <Link>Find a job</Link>
              <Link>Contact Us</Link>
              <Link>About Us</Link>
            </Stack>
          </Box>
        </Flex>
        <Text textAlign="center" mt="8">
          &copy; 2024 All rights reserved by JobSphere
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
