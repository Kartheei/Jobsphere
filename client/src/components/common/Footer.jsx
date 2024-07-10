import React from "react";

import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  Link,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";

import "../../assets/styles/HeaderFooter.css";
import { footerContent, footerContentEmployer } from "./footerContent"; // Import the footer content

const Footer = ({ contentType }) => {
  const content =
    contentType === "employer" ? footerContentEmployer : footerContent;

  return (
    <Box as="footer" className="footer" py={{ base: "8", md: "8" }} mt="16">
      <Container maxW="100%" px={{ base: "4", md: "8" }}>
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          justify="space-between"
          align="flex-start"
        >
          {content.about && (
            <Box
              className="footer-section"
              flex="1"
              mb={{ base: "8", md: "0" }}
            >
              <Heading as="h5" size="md" mb="4">
                {content.about.heading}
              </Heading>
              <Text
                className="about-para"
                width={{ lg: "350px", sm: "100%", md: "100%" }}
              >
                {content.about.text}
              </Text>
            </Box>
          )}

          {content.contact && (
            <Box
              className="footer-section"
              flex="1"
              mb={{ base: "8", md: "0" }}
            >
              <Heading as="h5" size="md" mb="4">
                {content.contact.heading}
              </Heading>
              <Text>Address: {content.contact.address}</Text>
              <Text>Email: {content.contact.email}</Text>
              <Text>Contact: {content.contact.phone}</Text>
            </Box>
          )}

          <Box className="footer-section" flex="1">
            <Heading as="h5" size="md" mb="4">
              {content.links.heading}
            </Heading>
            <Stack spacing="2">
              {content.links.items.map((item, index) => (
                <Link as={RouterLink} to={item.to} key={index}>
                  {item.name}
                </Link>
              ))}
            </Stack>
          </Box>
        </Flex>
        <Text textAlign="center" mt="8">
          {content.copyright}
        </Text>
      </Container>
    </Box>
  );
};

Footer.propTypes = {
  contentType: PropTypes.oneOf(["employer", "candidate"]).isRequired,
};

export default Footer;
