import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Flex,
    Heading,
    Text,
    Spinner,
    useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import "../../assets/styles/empHome.css";
import Footer from "../../components/common/Footer";
import NavBar from "../../components/candidate/NavBar";
import { fetchJobsApplied } from "../../services/jobService";

const JobApplied = () => {
    const [jobList, setJobList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const getJobs = async () => {
            try {
                const jobsData = await fetchJobsApplied();
                setJobList(jobsData);
            } catch (error) {
                toast({
                    title: "Error.",
                    description: error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } finally {
                setIsLoading(false);
            }
        };
        getJobs();
    }, [toast]);

    const [rightNav, setRightNav] = useState([
        "My Jobs",
        "Preferences",
        "My Network",
        "Interview Prep Tips"
    ]);
    const truncateDescription = (description, limit = 500) => {
        if (description.length > limit) {
            return description.substring(0, limit) + '...';
        }
        return description;
    };
    const handleViewClick = (jobId) => {
        navigate(`/jobs/jobDetails/${jobId}`);
    };
    return (
        <>
            <NavBar />
            <Flex p={5} justifyContent={'center'} columnGap={5}>
                <Box p="6"
                    boxShadow="md"
                    className="recent-jobs-box"
                    borderRadius="md"
                    bg="#F7FAFC"
                    mb={6}
                    width={'20%'}
                    height={'310px'}>
                    {rightNav && rightNav.map((data, index) => (
                        <Text key={index} fontWeight="bold" mb={4} textAlign={'center'}>{data}</Text>
                    ))}
                </Box>
                {isLoading ? (
                    <Spinner size="xl" />
                ) : (
                    <Box width={'70%'}>
                        {jobList && jobList.map((data, index) => (
                            <Box
                                p="6"
                                boxShadow="md"
                                className="recent-jobs-box"
                                borderRadius="md"
                                bg="#F7FAFC"
                                mb={6}
                                key={index}
                            >
                                <Flex justify="space-between" alignItems="center" flexWrap="wrap" >
                                    <Box textAlign="left" flex="1" minW="250px">
                                        <Heading as="h4" size="md" mb={4}>
                                            {data.title}
                                        </Heading>
                                        <Text fontWeight="bold" mb={4}>{data.organizationName}</Text>
                                        <Text fontWeight="bold" mb={4}>{truncateDescription(data.description)}</Text>
                                    </Box>

                                    <Button mt={{ base: "4", md: "0" }} className="view-button" onClick={() => handleViewClick(data._id)}>
                                        View
                                    </Button>

                                </Flex>
                            </Box>
                        ))}
                    </Box>
                )}

            </Flex>
            <Footer contentType="employer" />
        </>
    );
};

export default JobApplied;
