import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("ErrorBoundary caught:", error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0f0f0f] text-[#f1f1f1] flex flex-col items-center justify-center gap-4 px-6 text-center">
          <h1 className="text-2xl font-semibold">Something went wrong.</h1>
          <p className="text-[#aaaaaa] text-sm max-w-md">
            The page crashed unexpectedly. Please try reloading.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-[#3ea6ff] text-[#0f0f0f] text-sm font-semibold rounded-full px-5 py-2 hover:bg-[#65b8ff] transition-colors"
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
