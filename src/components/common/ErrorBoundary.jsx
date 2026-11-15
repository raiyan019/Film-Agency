import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Render error:", error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div
        role="alert"
        style={{
          minHeight: "100svh",
          padding: "2rem",
          background: "#080808",
          color: "#E9E6DF",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <p
          style={{
            color: "#C5FF45",
            letterSpacing: ".18em",
            textTransform: "uppercase",
            fontSize: 12,
          }}
        >
          Something went wrong
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 6vw, 4rem)", margin: "1rem 0" }}>
          This scene failed to load.
        </h1>
        {import.meta.env.DEV && (
          <pre style={{ whiteSpace: "pre-wrap", color: "#999", fontSize: 13 }}>
            {String(this.state.error?.stack || this.state.error)}
          </pre>
        )}
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: "1.5rem",
            padding: "0.75rem 1.5rem",
            border: "1px solid #C5FF45",
            color: "#C5FF45",
          }}
        >
          Reload
        </button>
      </div>
    );
  }
}
