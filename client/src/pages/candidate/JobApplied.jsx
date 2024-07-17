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

import "../../assets/styles/empHome.css";
import Footer from "../../components/common/Footer";
import NavBar from "../../components/candidate/NavBar";
import { fetchJoblistbyEmployer } from "../../services/jobService";

const JobApplied = () => {
    const [jobList, setJobList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        const getJobs = async () => {
            try {
                const jobsData = await fetchJoblistbyEmployer();
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
                        {/* {jobList && jobList.map((data, index) => (
                            <Box
                                p="6"
                                boxShadow="md"
                                className="recent-jobs-box"
                                borderRadius="md"
                                bg="#F7FAFC"
                                mb={6}

                            >
                                <Flex justify="space-between" alignItems="center" flexWrap="wrap" key={index} >
                                    <Box textAlign="left" flex="1" minW="250px">
                                        <Heading as="h4" size="md" mb={4}>
                                            {data.title}
                                        </Heading>
                                        <Text fontWeight="bold" mb={4}>{data.organizationName}</Text>
                                        <Text fontWeight="bold" mb={4}>{truncateDescription(data.description)}</Text>
                                    </Box>
                                     
                                        <Button mt={{ base: "4", md: "0" }} className="view-button">
                                            View
                                        </Button>
                                       
                                </Flex>
                            </Box>
                        ))} */}

                        {/* Static Data */}
                        <Box
                            p="6"
                            boxShadow="md"
                            className="recent-jobs-box"
                            borderRadius="md"
                            bg="#F7FAFC"
                            mb={6}
                        >
                            <Flex justify="space-between" alignItems="center" flexWrap="wrap"  >
                                <Box textAlign="left" flex="1" minW="250px">
                                    <Heading as="h4" size="md" mb={4}>
                                        Software Developer
                                    </Heading>
                                    <Text fontWeight="bold" mb={4}>Standard Chartered GBS</Text>
                                    <Text fontWeight="bold" mb={4}>
                                        In-depth knowledge of API and networking patterns, including RESTful services and modern asynchronous communication techniques, to ensure seamless data exchange and integration between front-end applications and back-end services
                                        Evangelize the importance of communication through code, presentations, slack/teams, and meetings
                                        Skilled at building user-facing applications and supporting systems and libraries on web and/or desktop using front-end technologies such as JavaScript, TypeScript, React, VUE, HTML and CSS
                                        Familiarity with CI/CD pipelines and DevOps practices
                                        Knowledge of cloud platforms such as AWS, Azure, or Google Cloud
                                        Knowledge of modern authorization mechanisms, such as JSON Web Tokens

                                    </Text>
                                </Box>

                                <Button mt={{ base: "4", md: "0" }} className="view-button">
                                    View
                                </Button>

                            </Flex>
                        </Box>

                        <Box
                            p="6"
                            boxShadow="md"
                            className="recent-jobs-box"
                            borderRadius="md"
                            bg="#F7FAFC"
                            mb={6}
                        >
                            <Flex justify="space-between" alignItems="center" flexWrap="wrap"  >
                                <Box textAlign="left" flex="1" minW="250px">
                                    <Heading as="h4" size="md" mb={4}>
                                        Software Developer
                                    </Heading>
                                    <Text fontWeight="bold" mb={4}>Standard Chartered GBS</Text>
                                    <Text fontWeight="bold" mb={4}>
                                        In-depth knowledge of API and networking patterns, including RESTful services and modern asynchronous communication techniques, to ensure seamless data exchange and integration between front-end applications and back-end services
                                        Evangelize the importance of communication through code, presentations, slack/teams, and meetings
                                        Skilled at building user-facing applications and supporting systems and libraries on web and/or desktop using front-end technologies such as JavaScript, TypeScript, React, VUE, HTML and CSS
                                        Familiarity with CI/CD pipelines and DevOps practices
                                        Knowledge of cloud platforms such as AWS, Azure, or Google Cloud
                                        Knowledge of modern authorization mechanisms, such as JSON Web Tokens

                                    </Text>
                                </Box>

                                <Button mt={{ base: "4", md: "0" }} className="view-button">
                                    View
                                </Button>

                            </Flex>
                        </Box>
                        <Box
                            p="6"
                            boxShadow="md"
                            className="recent-jobs-box"
                            borderRadius="md"
                            bg="#F7FAFC"
                            mb={6}
                        >
                            <Flex justify="space-between" alignItems="center" flexWrap="wrap"  >
                                <Box textAlign="left" flex="1" minW="250px">
                                    <Heading as="h4" size="md" mb={4}>
                                        Software Developer
                                    </Heading>
                                    <Text fontWeight="bold" mb={4}>Standard Chartered GBS</Text>
                                    <Text fontWeight="bold" mb={4}>
                                        In-depth knowledge of API and networking patterns, including RESTful services and modern asynchronous communication techniques, to ensure seamless data exchange and integration between front-end applications and back-end services
                                        Evangelize the importance of communication through code, presentations, slack/teams, and meetings
                                        Skilled at building user-facing applications and supporting systems and libraries on web and/or desktop using front-end technologies such as JavaScript, TypeScript, React, VUE, HTML and CSS
                                        Familiarity with CI/CD pipelines and DevOps practices
                                        Knowledge of cloud platforms such as AWS, Azure, or Google Cloud
                                        Knowledge of modern authorization mechanisms, such as JSON Web Tokens

                                    </Text>
                                </Box>

                                <Button mt={{ base: "4", md: "0" }} className="view-button">
                                    View
                                </Button>

                            </Flex>
                        </Box>


                    </Box>
                )}

            </Flex>
            <Footer contentType="employer" />
        </>
    );
};

export default JobApplied;
