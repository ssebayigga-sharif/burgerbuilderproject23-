import React from "react";
import Modal from "../../components/UI/Modal/Modal";
import Auxi from "../Auxi";
import axios from "../../AxiosOrders"; // or "axios" if you want the global instance
import useHttpErrorHandler from "./Hooks/http-error-handler";

const WithErrorHandler = (WrappedComponent) => {
  return function ErrorHandler(props) {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <Auxi>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Auxi>
    );
  };
};

export default WithErrorHandler;
