import React from "react";
import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Text,
} from "@chakra-ui/react";

import "../../assets/styles/empHome.css";
import Footer from "../../components/common/Footer";
import NavBar from "../../components/candidate/NavBar";

const JobPostedDetails = () => {


    return (
        <>
            <NavBar />
            <Center minH="100vh" mt={5}>

                <Box width={'80%'} display={'flex'} justifyContent={'center'} alignContent={'center'} flexDirection={'column'}>
                    <Box
                        p="6"
                        boxShadow="md"
                        className="recent-jobs-box"
                        borderRadius="md"
                        bg="#F7FAFC"
                        mb={6}
                    >
                        <Flex justify="space-between" alignItems="center" flexWrap="wrap">
                            <Box textAlign="left" flex="1" minW="250px">
                                <Heading as="h4" size="md" mb={4}>
                                    Software Engineer
                                </Heading>
                                <Text fontWeight="bold" mb={4}>Tech Innovators Inc.</Text>
                                <Text fontWeight="bold" mb={4}>Waterloo</Text>
                            </Box>
                            <Button mt={{ base: "4", md: "0" }} className="view-button">
                                Apply
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
                        <Flex justify="space-between" alignItems="center" flexWrap="wrap">
                            <Box textAlign="left" flex="1" minW="250px">
                                <Heading as="h4" size="md" mb={4}>
                                    Description
                                </Heading>
                                <Text mb={4}>We are the movers of the world and the makers of the future. We get up every day, roll up our sleeves and build a better world -- together. At Ford, we’re all a part of something bigger than ourselves. Are you ready to change the way the world moves?

                                    At Ford of Canada, we believe freedom of movement drives human progress. We also believe in providing you with the freedom to define and realize your dreams! With our incredible plans for the future of mobility, we have a wide variety of opportunities for you to accelerate your career potential as you help us define tomorrow’s transportation.

                                    Electric Vehicle Digital Design (EVDD) is responsible for developing the key technologies and capabilities – such as EV platforms, batteries, e-motors, inverters, charging and recycling – to create ground-up breakthrough electric vehicles. By joining the best software, engineering, design and UX talent, you will be a part of creating new technologies and concepts that can be applied across the Ford enterprise. Being on the EVDD team means building the future as Ford’s center of innovation and growth through electric and connected vehicles and services.

                                    As a key member of our team, you will be responsible for designing and developing complex infotainment systems with focus on high performance UI. You'll collaborate with cross-functional teams to ensure seamless integration of software and hardware components. Our ideal candidate is a tech expert who demands developer-friendly APIs, bulletproof code, and adheres to SOLID principles and TDD. You’ll have a strong background in 2D graphics frameworks, 3D rendering pipelines, as well as experience working with game engines such as Unreal Engine. You'll stay up-to-date with the latest trends and technologies, continually evaluating and incorporating new tools, techniques, and best practices to improve product performance and efficiency. Additionally, you'll cultivate a culture of high achievers and maintain comprehensive documentation on software design, architecture, and API usage.
                                </Text>
                            </Box>
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
                        <Flex justify="space-between" alignItems="center" flexWrap="wrap">
                            <Box textAlign="left" flex="1" minW="250px">
                                <Heading as="h4" size="md" mb={4}>
                                    Requirements
                                </Heading>
                                <Text mb={4}>Master’s degree in engineering or computer science, or related math or science field.
                                    Expertise in C/C++ and proficiency in Rust.
                                    Demonstratable knowledge of advanced graphics programming and rendering techniques including pipelining, image processing, color spaces, and Physically Based Rendering (PBR).
                                    Proficiency in managing scene formats such as glTF for efficient loading, parsing, and rendering of complex 3D scenes.
                                    Hands-on experience with Entity Component System (ECS) architecture.
                                    Proficient in writing custom tooling for graphics development, integrating animation APIs, and enhancing workflow efficiency in graphics projects.
                                    Strong experience in instrumenting and optimizing graphics performance for embedded devices.
                                    Substantial experience with window management systems such as Wayland, X11, and related technologies for effective handling of graphical interfaces.
                                    Understanding of dynamic linking, and memory management to load external libraries that provide specific graphics functionalities.
                                    Ability to work with multiple programming languages and understand how to interface and communicate between them effectively including knowledge of language interoperability techniques, FFI, IPC, and serialization.
                                    Proficient working in Linux and macOS environments.
                                    Proficient with version control systems, such as Git, and Agile development methodologies.
                                    Expertise with Vulkan and/or Metal API.
                                    Experience with Embedded Linux and/or Android system development.
                                    Experience with embedded HMI development (Qt, Flutter, React Native, Android).
                                </Text>
                            </Box>
                        </Flex>
                    </Box>
                    <Box>
                        <Heading as="h4" size="md" mb={4}>
                            Candidates Applied
                        </Heading>
                        <Flex justify={'center'} flexDirection={'column'} >
                            <Box height={'40px'} bg={'#d1e1ec'} w={'100%'} display={'flex'} flexDirection={'row'} gap={'700px'} mb={3}>
                                <Text p={2} width={'60%'} pl={'100px'} fontWeight={'bold'}>Chris Evans</Text>
                                <Flex gap={3}  mt={1}  pr={1} width={'30%'}>
                                    <Button size={'sm'} mt={{ base: "4", md: "0" }} className="view-button" >
                                        View Profile
                                    </Button>
                                    <Button size={'sm'} mt={{ base: "4", md: "0" }} className="btn-approve">
                                        Accept
                                    </Button>
                                    <Button size={'sm'} mt={{ base: "4", md: "0" }} className="btn-delete">
                                        Reject
                                    </Button>
                                </Flex>
                            </Box>

                            <Box height={'40px'} bg={'#d1e1ec'} w={'100%'} display={'flex'} flexDirection={'row'} gap={'700px'} mb={3}>
                                <Text p={2}  width={'60%'} pl={'100px'} fontWeight={'bold'}>Mike</Text>
                                <Flex gap={3}  mt={1}  pr={1} width={'30%'}>
                                    <Button size={'sm'} mt={{ base: "4", md: "0" }} className="view-button" >
                                        View Profile
                                    </Button>
                                    <Button size={'sm'} mt={{ base: "4", md: "0" }} className="btn-approve">
                                        Accept
                                    </Button>
                                    <Button size={'sm'} mt={{ base: "4", md: "0" }} className="btn-delete">
                                        Reject
                                    </Button>
                                </Flex>
                            </Box>


                            <Box height={'40px'} bg={'#d1e1ec'} w={'100%'} display={'flex'} flexDirection={'row'} gap={'700px'} mb={3}>
                                <Text p={2} pl={'100px'} width={'60%'} fontWeight={'bold'}>Tyson</Text>
                                <Flex gap={3}  mt={1} pr={1} width={'30%'}>
                                    <Button size={'sm'} mt={{ base: "4", md: "0" }} className="view-button" >
                                        View Profile
                                    </Button>
                                    <Button size={'sm'} mt={{ base: "4", md: "0" }} className="btn-approve">
                                        Accept
                                    </Button>
                                    <Button size={'sm'} mt={{ base: "4", md: "0" }} className="btn-delete">
                                        Reject
                                    </Button>
                                </Flex>
                            </Box>
                        </Flex>

                    </Box>
                </Box>

            </Center>


            <Footer contentType="employer" />
        </>
    );
};

export default JobPostedDetails;
