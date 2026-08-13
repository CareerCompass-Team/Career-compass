import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, info: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    this.setState({ info })
    console.error('[ErrorBoundary caught]', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          background: '#0f1117',
          color: '#f8fafc',
          fontFamily: 'monospace',
        }}>
          <div style={{
            maxWidth: 700,
            width: '100%',
            background: '#1e293b',
            borderRadius: 16,
            padding: '2rem',
            border: '1px solid #ef4444',
          }}>
            <div style={{ color: '#ef4444', fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>
              ⚠️ Runtime Error Caught
            </div>
            <div style={{ color: '#f87171', marginBottom: 12, fontSize: 14 }}>
              {this.state.error?.toString()}
            </div>
            {this.state.info?.componentStack && (
              <pre style={{
                fontSize: 11,
                color: '#94a3b8',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                maxHeight: 400,
                overflowY: 'auto',
                background: '#0f172a',
                padding: '1rem',
                borderRadius: 8,
              }}>
                {this.state.info.componentStack}
              </pre>
            )}
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: 16,
                padding: '8px 20px',
                background: '#7c3aed',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
