import React, { useCallback } from "react";

import { Box, Flex, Heading, Button, Text } from "@chakra-ui/react";
import PropTypes from "prop-types"; // Importing PropTypes
import { useNavigate } from "react-router-dom";

const RecentJobs = ({ recentJobs }) => {
  const navigate = useNavigate();

  const truncateText = useCallback((text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }, []);

  return (
    <>
      <Heading as="h3" size="xl" mb="8">
        Recent Jobs Post
      </Heading>
      {recentJobs.map((job, index) => (
        <Box
          key={index}
          p="6"
          boxShadow="md"
          className="recent-jobs-box"
          borderRadius="md"
          bg="#F7FAFC"
          mb={4}
        >
          <Flex justify="space-between" alignItems="center" flexWrap="wrap">
            <Box textAlign="left" flex="1" minW="250px">
              <Heading as="h4" size="md" mb="3">
                {job.title}
              </Heading>
              <Text maxWidth="1048px" mb="2">
                {job.organizationName}
                {truncateText(job.description, 40)}
              </Text>
            </Box>
            <Button
              mt={{ base: "4", md: "0" }}
              className="view-button"
              onClick={() => navigate(`/employer/jobs/${job._id}`)}
            >
              View
            </Button>
          </Flex>
        </Box>
      ))}
    </>
  );
};

// Adding PropTypes validation
RecentJobs.propTypes = {
  recentJobs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      organizationName: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RecentJobs;
