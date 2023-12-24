import { useState } from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
  Container,
} from "@chakra-ui/react";

const QuizComponent = ({ questions, userAnswers, setUserAnswers, currentQuestionIndex, setCurrentQuestionIndex }) => {
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // If the last question is reached, show the result
      setShowResult(true);
      calculateScore();
    }
  };

  const handleAnswerSelect = (selectedOption) => {
    // Update userAnswers with the selected option for the current question
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(updatedAnswers);

    // Move to the next question
    handleNextQuestion();
  };

  const calculateScore = () => {
    // Assuming questions have a 'correctAnswer' field
    const newScore = questions.reduce((totalScore, question, index) => {
      const userAnswer = userAnswers[index];
      const correctAnswer = question.correctAnswer;

      // Check if the user's answer is correct and increment the score
      if (userAnswer === correctAnswer) {
        return totalScore + 1;
      }

      return totalScore;
    }, 0);

    setScore(newScore);
  };

  const handleShowTotalScore = () => {
    // Additional logic to handle showing the total score separately
    setShowResult(true);
    calculateScore();
  };

  const handleRestartQuiz = () => {
    // Reset state to restart the quiz
    setUserAnswers([]);
    setShowResult(false);
    setScore(0);
    setCurrentQuestionIndex(0);
  };

  return (
    <HStack spacing={0} alignItems="start" width={{ base: "100%", md: "80%" }} h="100vh">
      <Box flex="1" alignItems="start">
        <Container p={4} maxW="600px">
          {showResult ? (
            // Render result or feedback component here
            <VStack align="center">
              <Text fontSize="xl" fontWeight="bold" textAlign="center">
                Quiz Completed! Your Score: {score}/{questions.length}
              </Text>
              <Button
                onClick={handleRestartQuiz}
                colorScheme="teal"
                borderRadius="full"
                mt={4}
                w="100%"
              >
                Restart Quiz
              </Button>
              {/* You can add more details or customize the feedback here */}
            </VStack>
          ) : (
            // Render current question and options
            <VStack align="start" spacing={4}>
              <Text fontSize="xl" fontWeight="bold">
                Question {currentQuestionIndex + 1}:
              </Text>
              <Text>{questions[currentQuestionIndex]?.question}</Text>
              {/* Render options here */}
              {questions[currentQuestionIndex]?.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  variant="outline"
                  colorScheme="teal"
                  borderRadius="full"
                >
                  {option}
                </Button>
              ))}
              {/* Render Next Question button only if it's not the last question */}
              {currentQuestionIndex < questions.length - 1 && (
                <Button
                  onClick={handleNextQuestion}
                  colorScheme="teal"
                  borderRadius="full"
                >
                  Next Question
                </Button>
              )}
              {/* Render Show Total Score button on the last question */}
              {currentQuestionIndex === questions.length - 1 && (
                <Button
                  onClick={handleShowTotalScore}
                  colorScheme="green"
                  borderRadius="full"
                  mt={4}
                  w="100%"
                >
                  Show Total Score
                </Button>
              )}
            </VStack>
          )}
        </Container>
      </Box>
    </HStack>
  );
};

export default QuizComponent;
