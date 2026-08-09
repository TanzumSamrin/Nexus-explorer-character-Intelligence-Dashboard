import {
  Component,
} from "react";

import FallbackUI from "./FallbackUI";

import {
  logError,
} from "../../utils/logger";

class ErrorBoundary
  extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(
    error
  ) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(
    error,
    errorInfo
  ) {
    logError(
      "React component crashed.",
      "ErrorBoundary",
      error
    );

    console.error(
      "Error details:",
      errorInfo
    );
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (
      this.state.hasError
    ) {
      return (
        <FallbackUI
          error={
            this.state.error
          }
          resetErrorBoundary={
            this.handleReset
          }
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;