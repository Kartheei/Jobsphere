import React, { Suspense } from "react";

import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  Image,
  Grid,
  GridItem,
  Input,
  Textarea,
  Button,
  Link,
  Spinner,
} from "@chakra-ui/react";

import NavBar from "../../components/candidate/NavBar";
const LazyFooter = React.lazy(() => import("../../components/common/Footer"));

function ContactUs() {
  return (
    <>
      <NavBar />
      <Container maxW="container.xl" my="10">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box
            width={{ base: "100%", md: "70%" }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src="/images/Contact.webp"
              alt="Contact Us"
              boxSize="300px"
              objectFit="cover"
            />
          </Box>
          <Box
            width={{ base: "100%", md: "70%" }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <VStack spacing="4" align="stretch" width="100%">
              <Heading size="lg">Get in Touch</Heading>
              <form>
                <VStack spacing="4" align="stretch">
                  <Input placeholder="Your Name *" />
                  <Input placeholder="Your Email *" type="email" />
                  <Input placeholder="Subject" />
                  <Textarea placeholder="Comments *" />
                  <Button
                    colorScheme="blue"
                    type="submit"
                    bg="#003366"
                    color="white"
                    _hover={{ bg: "#002244" }}
                  >
                    Send Message
                  </Button>
                </VStack>
              </form>
            </VStack>
          </Box>
        </Box>

        <Box mt="12">
          <Heading size="lg" mb="8" textAlign="center">
            Contact Information
          </Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap="8">
            <GridItem>
              <Text fontSize="lg" mb="4">
                Phone
              </Text>
              <Link href="tel:+152534-468-854" color="#003366">
                +1 525 34-468-854
              </Link>
            </GridItem>
            <GridItem>
              <Text fontSize="lg" mb="4">
                Email
              </Text>
              <Link href="mailto:contact@example.com" color="#003366">
                contact@example.com
              </Link>
            </GridItem>
            <GridItem>
              <Text fontSize="lg" mb="4">
                Location
              </Text>
              <Link
                href="https://www.google.com/maps"
                color="#003366"
                isExternal
              >
                View on Google Map
              </Link>
            </GridItem>
          </Grid>
        </Box>

        <Box mt="12" w="100%" p="0" m="0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1244105975795!2d-122.42067908468142!3d37.77902697975854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808f8b4b4d59%3A0x88c53d83d0ddf54!2sApple%20Park!5e0!3m2!1sen!2sus!4v1618367271425!5m2!1sen!2sus"
            width="100%"
            height="500px"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Map"
          ></iframe>
        </Box>
      </Container>
      <Suspense fallback={<Spinner size="xl" />}>
        <LazyFooter contentType="employer" />
      </Suspense>
    </>
  );
}

export default ContactUs;
