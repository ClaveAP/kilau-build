import React from 'react';

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  return (
    <nav style={{ 
      width: '100%', 
      height: '100%',
      backgroundColor: 'transparent',
      margin: 0,
      padding: '1rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxSizing: 'border-box'
    }}>
      {/* Logo dan Judul di pojok kiri */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={onToggleSidebar}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.2s',
            color: '#0066AE'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.7';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
          aria-label="Toggle sidebar"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <img 
          src="/logo.png" 
          alt="Logo" 
          style={{ 
            width: '2.5rem', 
            height: '2.5rem', 
            objectFit: 'contain',
            display: 'block'
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        <h2 style={{ 
          whiteSpace: 'nowrap', 
          color: '#0066AE', 
          margin: 0, 
          fontSize: '1.25rem', 
          fontWeight: 600 
        }}>
          Kilau Build Admin Dashboard
        </h2>
      </div>
      
      {/* Avatar di pojok kanan */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
        <div style={{ 
          width: '2.5rem', 
          height: '2.5rem', 
          backgroundColor: '#0066AE', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'white',
          fontWeight: 600,
          flexShrink: 0
        }}>
          A
        </div>
        <span style={{ color: '#0066AE', fontWeight: 500, flexShrink: 0 }}>Admin</span>
      </div>
    </nav>
  );
};

export default Navbar;
