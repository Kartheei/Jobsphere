import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  Image,
  Spinner,
  Grid,
  GridItem,
  Link,
  Icon,
} from "@chakra-ui/react";
import {
  Phone,
  MessageSquare,
  Clock,
  Star,
  Info,
  CircleCheck,
  CircleHelp,
} from "lucide-react";

import NavBar from "../../components/candidate/NavBar";
import Footer from "../../components/common/Footer";

function AboutUs() {
  const features = [
    {
      title: "24/7 Support",
      description: "Many desktop publishing now use and a search for job.",
      icon: Phone,
    },
    {
      title: "Tech & Startup Jobs",
      description: "Many desktop publishing now use and a search for job.",
      icon: MessageSquare,
    },
    {
      title: "Quick & Easy",
      description: "Many desktop publishing now use and a search for job.",
      icon: Clock,
    },
    {
      title: "Save Time",
      description: "Many desktop publishing now use and a search for job.",
      icon: Star,
    },
    {
      title: "Apply with Confidence",
      description: "Many desktop publishing now use and a search for job.",
      icon: Info,
    },
    {
      title: "Reduce Hiring Bias",
      description: "Many desktop publishing now use and a search for job.",
      icon: CircleCheck,
    },
    {
      title: "Proactive Employers",
      description: "Many desktop publishing now use and a search for job.",
      icon: CircleHelp,
    },
  ];

  const minds = [
    {
      name: "Jack John",
      role: "Managing Director",
      image: "/images/Jack.webp",
    },
    {
      name: "Krista John",
      role: "Hiring manager",
      image: "/images/Krista.webp",
    },
    { name: "Roger Jackson", role: "Marketing", image: "/images/Roger.webp" },
    { name: "Johnny English", role: "Ceo", image: "/images/Johnny.webp" },
  ];

  return (
    <>
      <NavBar />
      <Box
        w="100%"
        h="300px"
        bgImage="url('/images/Hero_Candidate.webp')"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Heading color="white" fontSize="4xl">
          About Us
        </Heading>
      </Box>
      <Container maxW="container.xl" mt="8">
        <Box display="flex" alignItems="center" justifyContent="center">
          <Image
            src="/images/image5.webp"
            boxSize="300px"
            objectFit="cover"
            mr="8"
          />
          <VStack spacing="4" align="start">
            <Heading size="lg">Our Story</Heading>
            <Text>
              Our company was founded with the mission to revolutionize the
              industry with innovative solutions. Over the years, we have grown
              into a team of dedicated professionals who are passionate about
              delivering excellence.
            </Text>
            <Text>
              Our vision is to create a future where technology and innovation
              drive progress and improvement in all aspects of life. We believe
              in the power of teamwork and collaboration to achieve our goals.
            </Text>
            <Text>
              Our history is filled with milestones and achievements that
              reflect our commitment to quality and customer satisfaction. We
              take pride in our diverse and talented team who work tirelessly to
              bring our vision to life.
            </Text>
          </VStack>
        </Box>

        {/* Features Section */}
        <Box mt="12">
          <Heading size="lg" mb="8" textAlign="center">
            Here is why you will love Jobsphere
          </Heading>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap="8"
          >
            {features.map((feature, index) => (
              <GridItem
                key={index}
                p="6"
                borderWidth="1px"
                borderRadius="md"
                textAlign="center"
              >
                <Icon as={feature.icon} boxSize="6" mb="4" />
                <Heading size="md" mb="4">
                  {feature.title}
                </Heading>
                <Text mb="4">{feature.description}</Text>
                <Link color="blue.500">Read More</Link>
              </GridItem>
            ))}
          </Grid>
        </Box>

        {/* Our Minds Section */}
        <Box mt="12" bg="gray.100" p="8" borderRadius="md">
          <Heading size="lg" mb="8" textAlign="center">
            Our Minds
          </Heading>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap="8"
          >
            {minds.map((mind, index) => (
              <GridItem
                key={index}
                p="6"
                borderWidth="1px"
                borderRadius="md"
                textAlign="center"
              >
                <VStack spacing="4" align="center">
                  <Image
                    src={mind.image}
                    alt={mind.name}
                    boxSize="150px" // Increased size of the image
                    borderRadius="full"
                    objectFit="cover"
                    fallbackSrc="https://via.placeholder.com/150?text=No+Image"
                  />
                  <Heading size="md" mb="2">
                    {mind.name}
                  </Heading>
                  <Text>{mind.role}</Text>
                </VStack>
              </GridItem>
            ))}
          </Grid>
        </Box>

        {/* Questions & Answers Section */}
        <Box mt="12">
          <Heading size="lg" mb="8" textAlign="center">
            Questions & Answers
          </Heading>
          <VStack spacing="4" align="start">
            <Text>
              <strong>How does Jobsphere work?</strong> <br />
              Due to its widespread use as filler text for layouts,
              non-readability is of great importance: human perception is tuned
              to recognize certain patterns and repetitions in texts.
            </Text>
            <Text>
              <strong>What is the main process to open an account?</strong>{" "}
              <br />
              If the distribution of letters and words is random, the reader
              will not be distracted from making a neutral judgement on the
              visual impact.
            </Text>
            <Text>
              <strong>How to make unlimited data entry?</strong> <br />
              Furthermore, it is advantageous when the dummy text is relatively
              realistic so that the layout impression of the final publication
              is not compromised.
            </Text>
            <Text>
              <strong>Is Jobsphere safer to use with my account?</strong> <br />
              The most well-known dummy text is the Lorem Ipsum, which is said
              to have originated in the 16th century. Lorem Ipsum is composed in
              a pseudo-Latin language which more or less corresponds to proper
              Latin.
            </Text>
            <Text>
              <strong>Have questions? Get in touch!</strong> <br />
              Start working with Jobsphere that can provide everything you need
              to generate awareness, drive traffic, connect.
            </Text>
            <Link color="blue.500">Contact Us</Link>
          </VStack>
        </Box>
      </Container>
      <Footer contentType="employer" />
    </>
  );
}

export default AboutUs;
