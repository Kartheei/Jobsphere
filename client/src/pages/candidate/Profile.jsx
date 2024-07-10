// import {
//   Box,
//   Container,
//   Flex,
//   Heading,
//   ChakraProvider,
//   Text,
//   VStack,
//   CSSReset,
//   Image,
//   Input,
// } from "@chakra-ui/react";
// import NavBar from "../../components/candidate/NavBar";
// import Footer from "../../components/candidate/Footer";

// function Profile() {
//   return (
//     <ChakraProvider>
//       <CSSReset />
//       <NavBar />

//       <Container maxW="container.xl" mt="8">
//         <Box className="cover-image" mb="4">
//           <Heading size="xl">Cover Image</Heading>
//           <Text>Quote</Text>
//         </Box>
//         <Flex alignItems="center" mb="8">
//           <Box className="profile-picture" mr="4">
//             <Image
//               src="./images/profile.png"
//               alt="Profile"
//               borderRadius="full"
//               boxSize="150px"
//             />
//           </Box>
//           <Input placeholder="JOHN DOE" size="lg" className="input-field" />
//         </Flex>
//         <VStack align="start" spacing="6" mt="8">
//           <Box className="section">
//             <Heading size="md" mb="4">
//               About
//             </Heading>
//             <Box className="content-placeholder" />
//           </Box>
//           <Box className="section">
//             <Heading size="md" mb="4">
//               Experience
//             </Heading>
//             <Box className="content-placeholder" />
//           </Box>
//           <Box className="section">
//             <Heading size="md" mb="4">
//               Education
//             </Heading>
//             <Box className="content-placeholder" />
//           </Box>
//         </VStack>
//       </Container>

//       <Footer />
//     </ChakraProvider>
//   );
// }

// export default Profile;




import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  Image,
  Input,
  Textarea,
  Divider,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import NavBar from "../../components/candidate/NavBar";
import Footer from "../../components/candidate/Footer";

function Profile() {
  return (
    <>
      <NavBar />
      <Container maxW="container.xl" mt="8">
        {/* Cover Image and Quote Section */}
        <Box
          bg="blue.500"
          color="white"
          borderRadius="md"
          p="6"
          mb="8"
          textAlign="center"
        >
          <Heading size="xl">
            Profile
          </Heading>
        </Box>

        {/* Profile Picture and Name Section */}
        <Flex alignItems="center" mb="8">
          <Box mr="4">
            <Image
              src="./images/profile.png"
              alt="Profile"
              borderRadius="full"
              boxSize="150px"
              objectFit="cover"
            />
          </Box>
          <FormControl>
            <FormLabel fontSize="lg" fontWeight="bold">
              Name
            </FormLabel>
            <Input placeholder="John Doe" size="lg" />
          </FormControl>
        </Flex>

        <Divider mb="8" />

        {/* About Section */}
        <Box mb="8">
          <Heading size="lg" mb="4">
            About
          </Heading>
          <Textarea placeholder="Tell us about yourself..." size="lg" />
        </Box>

        <Divider mb="8" />

        {/* Experience Section */}
        <Box mb="8">
          <Heading size="lg" mb="4">
            Experience
          </Heading>
          <VStack spacing="4" align="stretch">
            <Box p="4" bg="gray.100" borderRadius="md">
              <Heading size="md" mb="2">
                Job Title
              </Heading>
              <Text fontSize="sm" color="gray.600">
                Company Name
              </Text>
              <Text fontSize="sm" color="gray.600">
                Duration
              </Text>
              <Textarea
                mt="2"
                placeholder="Describe your responsibilities and achievements"
                size="sm"
              />
            </Box>
            <Button colorScheme="blue" variant="outline" alignSelf="flex-start">
              Add Experience
            </Button>
          </VStack>
        </Box>

        <Divider mb="8" />

        {/* Education Section */}
        <Box mb="8">
          <Heading size="lg" mb="4">
            Education
          </Heading>
          <VStack spacing="4" align="stretch">
            <Box p="4" bg="gray.100" borderRadius="md">
              <Heading size="md" mb="2">
                Degree
              </Heading>
              <Text fontSize="sm" color="gray.600">
                Institution Name
              </Text>
              <Text fontSize="sm" color="gray.600">
                Years Attended
              </Text>
              <Textarea
                mt="2"
                placeholder="Describe your major and coursework"
                size="sm"
              />
            </Box>
            <Button colorScheme="blue" variant="outline" alignSelf="flex-start">
              Add Education
            </Button>
          </VStack>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Profile;

