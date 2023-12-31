import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Steps, Button, message } from "antd";
import "./StepComponent.css";
import DestinationInput from "./DestinationInput";
import ActivityInput from "./ActivityInput";
import FoodInput from "./FoodInput";
import Cookies from "js-cookie";
import { ItineraryContext } from "./ItineraryContext";

const StepComponent = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Accessing the context values and update functions using the useContext hook
  const { destinationValue, durationValue } = useContext(ItineraryContext);

  const handleNextStep = (event) => {
    if (currentStep === 0) {
      // Validate DestinationInput
      if (!destinationValue) {
        message.error("Please enter a destination, country, or city");
        return;
      }
      if (!durationValue) {
        message.error("Please select the number of days");
        return;
      }
    }
    setCurrentStep(currentStep + 1);
    event.preventDefault();
  };

  const handlePreviousStep = (event) => {
    setCurrentStep(currentStep - 1);
    event.preventDefault();
  };

  const handleSubmission = (event) => {
    if (isLoggedIn) {
      setCurrentStep(currentStep + 1);
      navigate("/generator");
      event.preventDefault();
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token !== "undefined") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="step-component">
      <Steps
        direction="horizontal"
        current={currentStep}
        size="small"
        items={[
          {
            title: "Step 1",
            description: "Destination",
          },
          {
            title: "Step 2",
            description: "Activity",
          },
          {
            title: "Step 3",
            description: "Food",
          },
        ]}
      />
      <div className="step-content">
        {currentStep === 0 && <DestinationInput />}
        {currentStep === 1 && <ActivityInput />}
        {currentStep === 2 && <FoodInput />}
      </div>
      <div className="step-navigation">
        {currentStep > 0 && (
          <Button className="back" onClick={handlePreviousStep}>
            Back
          </Button>
        )}
        {currentStep < 2 && (
          <Button className="next" type="primary" onClick={handleNextStep}>
            Next
          </Button>
        )}
        {currentStep === 2 && (
          <Button className="submit" type="primary" onClick={handleSubmission}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default StepComponent;
