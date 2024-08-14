import React from "react";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import PropTypes from "prop-types"; // Importing PropTypes

const Stats = ({ stats }) => {
  return (
    <Flex justify="center" mb="8" flexWrap="wrap">
      <Box
        className="stat-box"
        mr="4"
        mb={{ base: "4", md: "0" }}
        bg="#2d3748"
        color="white"
      >
        <Heading as="h3" size="xl">
          {stats.totalJobPosts}
        </Heading>
        <Text>Total job posts</Text>
      </Box>
      <Box className="stat-box" bg="#2d3748" color="white">
        <Heading as="h3" size="xl">
          {stats.totalApplicationsReceived}
        </Heading>
        <Text>Applications received</Text>
      </Box>
    </Flex>
  );
};

// Adding PropTypes validation
Stats.propTypes = {
  stats: PropTypes.shape({
    totalJobPosts: PropTypes.number.isRequired,
    totalApplicationsReceived: PropTypes.number.isRequired,
  }).isRequired,
};

export default Stats;
