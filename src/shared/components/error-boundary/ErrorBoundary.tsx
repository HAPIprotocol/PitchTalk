import React from 'react';

import { ErrorMessage } from './ErrorMessage';

type ErrorBoundaryState = { hasError: boolean };

export default class ErrorBoundary extends React.PureComponent<
  any,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState;

  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error(error);
    console.error(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorMessage />;
    }

    return this.props.children;
  }
}
