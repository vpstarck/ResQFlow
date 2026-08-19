import React, { useState } from "react";

const Navbar = ({
  title = "eZResQ",
  subtitle = "",
  userName = "",
  userRole = "",
  navItems = [],
  activeItem = "",
  onNavigate = () => {},
  onLogout = () => {},
  showLogout = true,
  showBackButton = false,
  onBack = () => {},
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (item) => {
    onNavigate(item);
    setMenuOpen(false);
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>

        {/* Left Section */}
        <div style={styles.leftSection}>
          {showBackButton && (
            <button
              type="button"
              onClick={onBack}
              style={styles.backButton}
              aria-label="Go back"
            >
              ←
            </button>
          )}

          <div style={styles.logo}>
            🚑
          </div>

          <div>
            <div style={styles.title}>{title}</div>

            {subtitle && (
              <div style={styles.subtitle}>{subtitle}</div>
            )}
          </div>
        </div>

        {/* Desktop Navigation */}
        <div style={styles.desktopNav}>
          {navItems.map((item, index) => {
            const label =
              typeof item === "string" ? item : item.label;

            const value =
              typeof item === "string" ? item : item.value || item.label;

            return (
              <button
                key={`${value}-${index}`}
                type="button"
                onClick={() => handleNavigate(value)}
                style={{
                  ...styles.navButton,
                  ...(activeItem === value
                    ? styles.activeNavButton
                    : {}),
                }}
              >
                {typeof item === "object" && item.icon && (
                  <span>{item.icon}</span>
                )}

                {label}
              </button>
            );
          })}
        </div>

        {/* User Section */}
        <div style={styles.userSection}>
          <div style={styles.userInfo}>
            {userName && (
              <div style={styles.userName}>{userName}</div>
            )}

            {userRole && (
              <div style={styles.userRole}>{userRole}</div>
            )}
          </div>

          {showLogout && (
            <button
              type="button"
              onClick={onLogout}
              style={styles.logoutButton}
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          style={styles.menuButton}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          {navItems.map((item, index) => {
            const label =
              typeof item === "string" ? item : item.label;

            const value =
              typeof item === "string" ? item : item.value || item.label;

            return (
              <button
                key={`${value}-mobile-${index}`}
                type="button"
                onClick={() => handleNavigate(value)}
                style={{
                  ...styles.mobileNavButton,
                  ...(activeItem === value
                    ? styles.activeMobileButton
                    : {}),
                }}
              >
                {typeof item === "object" && item.icon && (
                  <span>{item.icon}</span>
                )}

                {label}
              </button>
            );
          })}

          {showLogout && (
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onLogout();
              }}
              style={styles.mobileLogout}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

const styles = {
  navbar: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  container: {
    minHeight: "64px",
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
  },

  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    minWidth: "180px",
  },

  logo: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    backgroundColor: "#eef2ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
  },

  title: {
    fontSize: "19px",
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    fontSize: "12px",
    color: "#6b7280",
    marginTop: "2px",
  },

  backButton: {
    border: "none",
    background: "transparent",
    fontSize: "24px",
    cursor: "pointer",
    color: "#374151",
  },

  desktopNav: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    flex: 1,
    justifyContent: "center",
  },

  navButton: {
    border: "none",
    background: "transparent",
    padding: "9px 13px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#4b5563",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  activeNavButton: {
    backgroundColor: "#eef2ff",
    color: "#3730a3",
    fontWeight: "600",
  },

  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  userInfo: {
    textAlign: "right",
  },

  userName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#111827",
  },

  userRole: {
    fontSize: "11px",
    color: "#6b7280",
    marginTop: "2px",
  },

  logoutButton: {
    border: "1px solid #fecaca",
    backgroundColor: "#fff",
    color: "#dc2626",
    padding: "8px 12px",
    borderRadius: "7px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
  },

  menuButton: {
    display: "none",
    border: "none",
    background: "transparent",
    fontSize: "24px",
    cursor: "pointer",
  },

  mobileMenu: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 20px 15px",
    borderTop: "1px solid #f3f4f6",
    gap: "5px",
  },

  mobileNavButton: {
    border: "none",
    backgroundColor: "#f9fafb",
    padding: "12px",
    borderRadius: "8px",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "14px",
  },

  activeMobileButton: {
    backgroundColor: "#eef2ff",
    color: "#3730a3",
    fontWeight: "600",
  },

  mobileLogout: {
    border: "none",
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    textAlign: "left",
    fontWeight: "600",
  },
};

export default Navbar;
