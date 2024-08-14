import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  Spinner,
  useToast,
  Menu,
  MenuList,
  MenuItem,
  Tag,
  MenuButton,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { Pencil, Trash2, Eye, ChevronDown } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

import NavBar from "../../components/employer/NavBar";
const Footer = React.lazy(() => import("../../components/common/Footer"));
import {
  fetchApplicationsByJobId,
  updateApplicationStatus,
} from "../../services/applicationService";
import { fetchJobDetails } from "../../services/jobService";
import "./JobPostedDetails.css"; // Import external CSS file for additional styling

const JobPostedDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const getJobDetails = async () => {
      try {
        const jobData = await fetchJobDetails(id);
        setJob(jobData);
      } catch (error) {
        console.error("Error fetching job details:", error);
        toast({
          title: "Error fetching job details",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    const getApplications = async () => {
      try {
        const applicationsData = await fetchApplicationsByJobId(id);
        setApplications(applicationsData);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    getJobDetails();
    getApplications();
  }, [id, toast]);

  const handleStatusUpdate = async (applicationId, status) => {
    try {
      await updateApplicationStatus(applicationId, status);
      setApplications((prevApplications) =>
        prevApplications.map((application) =>
          application._id === applicationId
            ? { ...application, status }
            : application
        )
      );
      toast({
        title: `Application ${status}`,
        description: `The application has been ${status} successfully.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (isLoading) {
    return (
      <>
        <Center minH="100vh" mt={5}>
          <Spinner size="xl" />
        </Center>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <Center my="10">
        <Box width={"80%"} display={"flex"} flexDirection={"column"}>
          <Box p="6" boxShadow="md" borderRadius="md" bg="#F7FAFC" mb={6}>
            <Flex justify="space-between" alignItems="center" flexWrap="wrap">
              <Box textAlign="left" flex="1" minW="250px">
                <Heading as="h4" size="md" mb={4}>
                  {job.title}
                </Heading>
                <Text fontWeight="bold" mb={4}>
                  {job.userId.organizationName}
                </Text>
                <Text fontWeight="bold" mb={4}>
                  {job.location}
                </Text>
              </Box>
            </Flex>
          </Box>

          <Box p="6" mb={6}>
            <Flex justify="space-between" alignItems="center" flexWrap="wrap">
              <Box textAlign="left" flex="1" minW="250px">
                <Heading as="h4" size="md" mb={4}>
                  Description
                </Heading>
                <Text mb={4}>{job.description}</Text>
              </Box>
            </Flex>
          </Box>

          <Box p="6" mb={6}>
            <Flex justify="space-between" alignItems="center" flexWrap="wrap">
              <Box textAlign="left" flex="1" minW="250px">
                <Heading as="h4" size="md" mb={4}>
                  Requirements
                </Heading>
                <Text mb={4}>{job.requirements}</Text>
              </Box>
            </Flex>
          </Box>

          <Box>
            <Heading as="h4" size="md" mb={4}>
              Candidates Applied
            </Heading>
            {applications.length === 0 ? (
              <Text fontSize="lg" textAlign="center">
                No applications found for this job.
              </Text>
            ) : (
              <TableContainer>
                <Table variant="simple" size="md">
                  <Thead bg="blue.500">
                    <Tr>
                      <Th color="white">Candidate Name</Th>
                      <Th color="white">Status</Th>
                      <Th color="white">Profile</Th>
                      <Th color="white">Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {applications.map((application) => (
                      <Tr key={application._id}>
                        <Td>{application.user_id.name}</Td>
                        <Td>
                          <Tag
                            size="md"
                            variant="solid"
                            textTransform="capitalize"
                            colorScheme={getColorScheme(application.status)}
                          >
                            {application.status}
                          </Tag>
                        </Td>
                        <Td>
                          <IconButton
                            aria-label="View Profile"
                            icon={<Eye size={20} strokeWidth={1} />}
                            onClick={() =>
                              navigate(
                                `/employer/candidate/${application.user_id._id}`
                              )
                            }
                          />
                        </Td>
                        <Td>
                          <Menu>
                            <MenuButton
                              as={Button}
                              rightIcon={<ChevronDown />}
                              size="sm"
                            >
                              Actions
                            </MenuButton>
                            <MenuList>
                              <MenuItem
                                onClick={() =>
                                  handleStatusUpdate(
                                    application._id,
                                    "accepted"
                                  )
                                }
                              >
                                Accept
                              </MenuItem>
                              <MenuItem
                                onClick={() =>
                                  handleStatusUpdate(
                                    application._id,
                                    "rejected"
                                  )
                                }
                              >
                                Reject
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </Box>
      </Center>
      <React.Suspense fallback={<Spinner size="xl" />}>
        <Footer contentType="employer" />
      </React.Suspense>
    </>
  );
};

const getColorScheme = (status) => {
  switch (status) {
    case "accepted":
      return "green";
    case "rejected":
      return "red";
    case "pending":
    default:
      return "gray";
  }
};

export default JobPostedDetails;
