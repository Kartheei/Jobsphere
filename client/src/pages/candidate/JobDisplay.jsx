import {
  ChakraProvider,
  CSSReset,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
// import { FaSearch } from "react-icons/fa";
import NavBar from "../../components/candidate/NavBar";
import Footer from "../../components/candidate/Footer";

function JobDisplay() {
  return (
    <ChakraProvider>
      <CSSReset />
      <NavBar />

      <Container
        maxW="container.xl"
        mt={{ base: 4, md: 8 }}
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box
          className="sidebar"
          mr={{ base: 0, md: 12 }}
          mt={{ base: 4, md: 14 }}
          mb={{ base: 8, md: 0 }}
        >
          <Flex
            direction={{ base: "row", md: "column" }}
            wrap={{ base: "wrap", md: "nowrap" }}
            align={{ base: "center", md: "start" }}
            gap="2"
          >
            {[
              "MY JOBS",
              "PREFERENCES",
              "MY NETWORK",
              "INTERVIEW PREP TIPS",
            ].map((label) => (
              <Button
                key={label}
                className="sidebar-button"
                mb={{ base: 4, md: 0 }}
                mr={{ base: 4, md: 0 }}
              >
                {label}
              </Button>
            ))}
          </Flex>
        </Box>

        <Box flex="1">
          <Heading size="lg" mb="4">
            Top Picks for You Based on Your Profile
          </Heading>
          <VStack spacing="4" align="start">
            <Box className="job-card">
              <Heading size="md" mb="2">
                Software Engineer
              </Heading>
              <Text fontWeight="bold">Tech Innovators Inc.</Text>
              <Text mb="4">
                Seeking a skilled software engineer with 3+ years of experience
                in JavaScript, Python, and cloud computing. Responsibilities
                include developing scalable web applications and collaborating
                with cross-functional teams.
              </Text>
              <Button className="apply-button">Apply</Button>
            </Box>
            <Box className="job-card">
              <Heading size="md" mb="2">
                Software Engineer
              </Heading>
              <Text fontWeight="bold">Tech Innovators Inc.</Text>
              <Text mb="4">
                Seeking a skilled software engineer with 3+ years of experience
                in JavaScript, Python, and cloud computing. Responsibilities
                include developing scalable web applications and collaborating
                with cross-functional teams.
              </Text>
              <Button className="apply-button">Apply</Button>
            </Box>
          </VStack>

          <Heading size="lg" mt="8" mb="4">
            Hiring in Your Network
          </Heading>
          <VStack spacing="4" align="start">
            <Box className="job-card">
              <Heading size="md" mb="2">
                Software Engineer
              </Heading>
              <Text fontWeight="bold">Tech Innovators Inc.</Text>
              <Text mb="4">
                Seeking a skilled software engineer with 3+ years of experience
                in JavaScript, Python, and cloud computing. Responsibilities
                include developing scalable web applications and collaborating
                with cross-functional teams.
              </Text>
              <Button className="apply-button">Apply</Button>
            </Box>
            <Box className="job-card">
              <Heading size="md" mb="2">
                Software Engineer
              </Heading>
              <Text fontWeight="bold">Tech Innovators Inc.</Text>
              <Text mb="4">
                Seeking a skilled software engineer with 3+ years of experience
                in JavaScript, Python, and cloud computing. Responsibilities
                include developing scalable web applications and collaborating
                with cross-functional teams.
              </Text>
              <Button className="apply-button">Apply</Button>
            </Box>
          </VStack>
        </Box>
      </Container>

      <Footer />
    </ChakraProvider>
  );
}

export default JobDisplay;
