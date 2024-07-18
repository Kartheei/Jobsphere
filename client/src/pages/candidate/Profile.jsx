import React, { useState, useEffect, useContext } from "react";

import { ChevronDownIcon } from "@chakra-ui/icons";
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Spinner,
} from "@chakra-ui/react";

import NavBar from "../../components/candidate/NavBar";
import Footer from "../../components/common/Footer";
import { AuthContext } from "../../context/AuthContext";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../../services/userService";

function Profile() {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    about: "",
    experience: [],
    education: [],
  });
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setProfileData({
          ...data,
          experience: data.experience || [],
          education: data.education || [],
        });
      } catch (error) {
        toast({
          title: "Error fetching profile.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, [toast]);

  const handleEditToggle = async () => {
    if (editMode) {
      await updateProfile();
      await refreshProfileData(); // Refresh profile data after update
    }
    setEditMode(!editMode);
  };

  const refreshProfileData = async () => {
    try {
      const data = await fetchUserProfile();
      setProfileData({
        ...data,
        experience: data.experience || [],
        education: data.education || [],
      });
    } catch (error) {
      toast({
        title: "Error fetching profile.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const updateProfile = async () => {
    const nonEmptyExperience = profileData.experience.filter(
      (exp) =>
        exp.jobTitle && exp.companyName && exp.duration && exp.description
    );

    const nonEmptyEducation = profileData.education.filter(
      (edu) =>
        edu.degree &&
        edu.institutionName &&
        edu.yearsAttended &&
        edu.description
    );

    try {
      await updateUserProfile({
        name: profileData.name,
        email: profileData.email,
        about: profileData.about,
        experiences: nonEmptyExperience,
        education: nonEmptyEducation,
      });
      toast({
        title: "Profile updated.",
        description: "Your profile has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error updating profile.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleExperienceChange = (e, index) => {
    const { name, value } = e.target;
    const newExperience = [...profileData.experience];
    newExperience[index][name] = value;
    setProfileData({
      ...profileData,
      experience: newExperience,
    });
  };

  const handleEducationChange = (e, index) => {
    const { name, value } = e.target;
    const newEducation = [...profileData.education];
    newEducation[index][name] = value;
    setProfileData({
      ...profileData,
      education: newEducation,
    });
  };

  const addNewExperience = () => {
    setProfileData((prevData) => ({
      ...prevData,
      experience: [
        ...prevData.experience,
        {
          jobTitle: "",
          companyName: "",
          duration: "",
          description: "",
        },
      ],
    }));
  };

  const addNewEducation = () => {
    setProfileData((prevData) => ({
      ...prevData,
      education: [
        ...prevData.education,
        {
          degree: "",
          institutionName: "",
          yearsAttended: "",
          description: "",
        },
      ],
    }));
  };

  const handleViewResume = () => {
    // Logic to view resume
    console.log("View Resume");
  };

  const handleUploadResume = () => {
    // Logic to upload resume
    console.log("Upload Resume");
  };

  if (isLoading) {
    return (
      <div className="app-spinner">
        <Spinner
          thickness="10px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <Container maxW="container.xl" mt="8">
        <Box
          bg="blue.500"
          color="white"
          borderRadius="md"
          p="6"
          mb="8"
          textAlign="center"
        >
          <Heading size="xl">Profile</Heading>
        </Box>

        <Box mr="6" mb="8">
          <Image
            src={profileData.profilePicture || "./images/profile.png"}
            alt="Profile"
            borderRadius="full"
            boxSize="150px"
            objectFit="cover"
          />
        </Box>

        <Flex alignItems="center" mb="8" bg="gray.50" p="6" borderRadius="md">
          <VStack spacing="4" align="flex-start" flex="1">
            <FormControl>
              <FormLabel fontSize="lg" fontWeight="bold">
                Name
              </FormLabel>
              {editMode ? (
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={handleChange}
                  size="lg"
                />
              ) : (
                <Text fontSize="lg">{profileData.name}</Text>
              )}
            </FormControl>

            <FormControl>
              <FormLabel fontSize="lg" fontWeight="bold">
                Email
              </FormLabel>
              {editMode ? (
                <>
                  <Input
                    id="email"
                    value={profileData.email}
                    onChange={handleChange}
                    size="lg"
                    mb="2"
                  />
                </>
              ) : (
                <>
                  <Text fontSize="lg">{profileData.email}</Text>
                </>
              )}
            </FormControl>
          </VStack>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              colorScheme="blue"
              size="lg"
              ml="6"
            >
              Resume
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleViewResume}>View</MenuItem>
              <MenuItem onClick={handleUploadResume}>Upload</MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        <Divider mb="8" />

        <Box mb="8">
          <Heading size="lg" mb="4">
            About
          </Heading>
          {editMode ? (
            <Textarea
              id="about"
              value={profileData.about}
              onChange={handleChange}
              size="lg"
            />
          ) : (
            <Text fontSize="lg">
              {profileData.about || "Tell us about yourself..."}
            </Text>
          )}
        </Box>

        <Divider mb="8" />

        <Box mb="8">
          <Heading size="lg" mb="4">
            Experience
          </Heading>
          <VStack spacing="4" align="stretch">
            {profileData.experience && profileData.experience.length > 0 ? (
              profileData.experience.map((exp, index) => (
                <Box key={index} p="4" bg="gray.100" borderRadius="md">
                  <FormControl>
                    <FormLabel fontWeight="bold">Job Title</FormLabel>
                    {editMode ? (
                      <Input
                        name="jobTitle"
                        value={exp.jobTitle}
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    ) : (
                      <Text>{exp.jobTitle}</Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold">Company Name</FormLabel>
                    {editMode ? (
                      <Input
                        name="companyName"
                        value={exp.companyName}
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    ) : (
                      <Text>{exp.companyName}</Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold">Duration</FormLabel>
                    {editMode ? (
                      <Input
                        name="duration"
                        value={exp.duration}
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    ) : (
                      <Text>{exp.duration}</Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold">Description</FormLabel>
                    {editMode ? (
                      <Textarea
                        name="description"
                        value={exp.description}
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    ) : (
                      <Text>{exp.description}</Text>
                    )}
                  </FormControl>
                </Box>
              ))
            ) : (
              <Text fontSize="lg">No experience added yet</Text>
            )}
            {editMode && (
              <Button
                colorScheme="blue"
                variant="outline"
                alignSelf="flex-start"
                onClick={addNewExperience}
              >
                Add Experience
              </Button>
            )}
          </VStack>
        </Box>

        <Divider mb="8" />

        <Box mb="8">
          <Heading size="lg" mb="4">
            Education
          </Heading>
          <VStack spacing="4" align="stretch">
            {profileData.education && profileData.education.length > 0 ? (
              profileData.education.map((edu, index) => (
                <Box key={index} p="4" bg="gray.100" borderRadius="md">
                  <FormControl>
                    <FormLabel fontWeight="bold">Degree</FormLabel>
                    {editMode ? (
                      <Input
                        name="degree"
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(e, index)}
                      />
                    ) : (
                      <Text>{edu.degree}</Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold">Institution Name</FormLabel>
                    {editMode ? (
                      <Input
                        name="institutionName"
                        value={edu.institutionName}
                        onChange={(e) => handleEducationChange(e, index)}
                      />
                    ) : (
                      <Text>{edu.institutionName}</Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold">Years Attended</FormLabel>
                    {editMode ? (
                      <Input
                        name="yearsAttended"
                        value={edu.yearsAttended}
                        onChange={(e) => handleEducationChange(e, index)}
                      />
                    ) : (
                      <Text>{edu.yearsAttended}</Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold">Description</FormLabel>
                    {editMode ? (
                      <Textarea
                        name="description"
                        value={edu.description}
                        onChange={(e) => handleEducationChange(e, index)}
                      />
                    ) : (
                      <Text>{edu.description}</Text>
                    )}
                  </FormControl>
                </Box>
              ))
            ) : (
              <Text fontSize="lg">No education added yet</Text>
            )}
            {editMode && (
              <Button
                colorScheme="blue"
                variant="outline"
                alignSelf="flex-start"
                onClick={addNewEducation}
              >
                Add Education
              </Button>
            )}
          </VStack>
        </Box>

        <Divider mb="8" />

        <Button onClick={handleEditToggle} colorScheme="blue" mb="8" mt="8">
          {editMode ? "Save" : "Edit"}
        </Button>
      </Container>
      <Footer contentType="candidate" />
    </>
  );
}

export default Profile;
