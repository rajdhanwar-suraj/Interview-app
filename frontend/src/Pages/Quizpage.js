import React, { useState, useEffect } from "react";
import { Box, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, useDisclosure } from "@chakra-ui/react";
import Questionbox from "../components/Questionbox";
import QuizSidebar from "../components/QuizSidebar";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";

const Quizpage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const { user } = ChatState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("/api/questions");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleQuestionChange = (newIndex) => {
    setCurrentQuestionIndex(newIndex);
  };

  const handleAnswerSubmit = (answer) => {
    // handle answer submission logic
  };

  return (
    <Box>
      {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" p="10px">
        {user && (
          <QuizSidebar
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            onQuestionChange={handleQuestionChange}
            userAnswers={userAnswers}
            setUserAnswers={setUserAnswers}
            display={{ base: "none", md: "block" }} // Hide on mobile
          />
        )}
        {user && (
          <Questionbox
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            onAnswerSubmit={handleAnswerSubmit}
            onQuestionChange={handleQuestionChange}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            userAnswers={userAnswers}
            setUserAnswers={setUserAnswers}
          />
        )}
      </Box>
      {user && (
        <Button
          display={{ base: "block", md: "none" }}
          position="fixed"
          bottom="4"
          right="4"
          zIndex="999"
          colorScheme="blue"
          onClick={onOpen}
        >
          Open Sidebar
        </Button>
      )}
      {user && (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Quiz Sidebar</DrawerHeader>
            <DrawerBody>
              <QuizSidebar
                questions={questions}
                currentQuestionIndex={currentQuestionIndex}
                onQuestionChange={handleQuestionChange}
                userAnswers={userAnswers}
                setUserAnswers={setUserAnswers}
              />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </Box>
  );
};

export default Quizpage;
