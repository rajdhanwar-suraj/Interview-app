import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

const QuestionTracker = ({
  questions,
  currentQuestionIndex,
  onQuestionChange,
  userAnswers,
}) => {
  const [questionStatus, setQuestionStatus] = useState(
    questions.map((_, index) => userAnswers[index] !== undefined)
  );

  useEffect(() => {
    setQuestionStatus(questions.map((_, index) => userAnswers[index] !== undefined));
  }, [questions, userAnswers]);

  const handleQuestionClick = (index) => {
    setQuestionStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[index] = !newStatus[index];
      return newStatus;
    });

    // Call the onQuestionChange callback to update the current question
    onQuestionChange(index);
  };

  return (
    <Box
      width={{ base: "100%", md: "20%" }}
      textAlign="center"
      bgColor="#F3F4F6"
      p={4}
      borderRadius="md"
      overflowY="auto" // Add this line for vertical scrolling
      maxHeight="80vh" // Adjust the maxHeight as needed
    >
      <Text fontSize="lg" fontWeight="bold" mb={2}>
        Question Tracker
      </Text>
      <Box display="flex" flexWrap="wrap" justifyContent="space-around">
        {questions.map((question, index) => (
          <Box
            key={index}
            bg={
              userAnswers[index] !== undefined
                ? "#38B2AC" // Change color for submitted answers
                : currentQuestionIndex === index
                ? "#E2E8F0" // Change color for the current question
                : "#E2E8F0"
            }
            border="1px solid #A0AEC0"
            borderRadius="md"
            p={2}
            m={1}
            cursor="pointer"
            onClick={() => handleQuestionClick(index)}
            width={{ base: "30px", md: "50px" }}
            height={{ base: "30px", md: "50px" }}
            textAlign="center"
            lineHeight={{ base: "30px", md: "50px" }}
          >
            {index + 1}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default QuestionTracker;
