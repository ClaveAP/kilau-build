import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 m-8 border-2 border-red-500 rounded-lg bg-red-50 text-red-900">
          <h1 className="text-2xl font-bold mb-4">⚠️ Terjadi Kesalahan</h1>
          <p className="mb-4">
            Maaf, terjadi kesalahan saat memuat halaman. Silakan refresh halaman
            atau hubungi administrator.
          </p>
          {this.state.error && (
            <details className="mt-4">
              <summary className="cursor-pointer font-bold mb-2">
                Detail Error (Klik untuk melihat)
              </summary>
              <pre className="p-4 bg-red-100 rounded overflow-auto text-sm">
                {this.state.error.toString()}
                {this.state.errorInfo && (
                  <>
                    {"\n\n"}
                    {this.state.errorInfo.componentStack}
                  </>
                )}
              </pre>
            </details>
          )}
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary-blue text-white border-none rounded cursor-pointer text-base hover:bg-primary-blue-dark transition-colors"
          >
            Refresh Halaman
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
