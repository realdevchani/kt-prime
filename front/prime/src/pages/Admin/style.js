import styled from 'styled-components';

const S = {};

// Login
S.LoginWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
  padding-top: 48px;
`;

S.LoginCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 3rem 2.5rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

S.LoginLogo = styled.img`
  height: 48px;
`;

S.LoginTitle = styled.h1`
  font-size: 1.4rem;
  font-weight: 700;
  color: #111;
  margin: 0;
`;

S.LoginForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

S.LoginInput = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  outline: none;
  &:focus { border-color: #1187CF; }
`;

S.LoginError = styled.p`
  color: #e53935;
  font-size: 0.85rem;
  margin: 0;
`;

S.LoginButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  background: #1187CF;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  &:hover { background: #0e70b0; }
`;

// Layout
S.AdminWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f0f2f5;
`;

S.Sidebar = styled.aside`
  width: 220px;
  min-width: 220px;
  background: #1a1a2e;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  gap: 1rem;
`;

S.SidebarLogo = styled.img`
  height: 40px;
  margin-bottom: 0.5rem;
  filter: brightness(10);
`;

S.SidebarTitle = styled.div`
  color: #aaa;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

S.SidebarMenu = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

S.SidebarItem = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: ${({ $active }) => $active ? '#1187CF' : 'transparent'};
  color: ${({ $active }) => $active ? '#fff' : '#aaa'};
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s, color 0.2s;
  &:hover { background: ${({ $active }) => $active ? '#1187CF' : '#2a2a4a'}; color: #fff; }
`;

S.LogoutButton = styled.button`
  margin-top: auto;
  width: 100%;
  padding: 0.75rem;
  background: transparent;
  color: #666;
  border: 1px solid #333;
  border-radius: 8px;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover { color: #fff; border-color: #666; }
`;

S.MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

S.Section = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
`;

S.SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

S.SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  color: #111;
  margin: 0;
`;

S.RefreshButton = styled.button`
  padding: 0.5rem 1rem;
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover { background: #e8e8e8; }
`;

S.LoadingText = styled.p`
  color: #888;
  text-align: center;
  padding: 2rem;
`;

S.EmptyText = styled.p`
  color: #888;
  text-align: center;
  padding: 2rem;
`;

// Two-panel layout
S.TwoPanel = styled.div`
  display: flex;
  gap: 1.5rem;
  height: calc(100vh - 220px);
`;

S.AppList = styled.div`
  width: 300px;
  min-width: 300px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

S.AppCard = styled.div`
  padding: 1rem;
  border: 2px solid ${({ $selected }) => $selected ? '#1187CF' : '#e0e0e0'};
  border-radius: 10px;
  cursor: pointer;
  background: ${({ $selected }) => $selected ? '#f0f8ff' : '#fff'};
  transition: border-color 0.2s;
  &:hover { border-color: #1187CF; }
`;

S.AppCardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.3rem;
`;

S.AppName = styled.div`
  font-weight: 700;
  font-size: 0.95rem;
  color: #111;
`;

S.AppEmail = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.2rem;
`;

S.AppMeta = styled.div`
  font-size: 0.75rem;
  color: #999;
`;

S.StatusBadge = styled.span`
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ $color }) => $color ? `${$color}20` : '#e0e0e0'};
  color: ${({ $color }) => $color || '#666'};
`;

// Detail panel
S.AppDetail = styled.div`
  flex: 1;
  overflow-y: auto;
`;

S.DetailTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 1.5rem;
`;

S.DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
  padding: 1.25rem;
  background: #f8f9fa;
  border-radius: 10px;
`;

S.DetailRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`;

S.DetailLabel = styled.span`
  font-size: 0.8rem;
  color: #888;
  min-width: 80px;
  padding-top: 2px;
`;

S.DetailValue = styled.span`
  font-size: 0.9rem;
  color: #111;
  flex: 1;
`;

S.ActionTitle = styled.h4`
  font-size: 0.95rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.75rem;
`;

S.ActionButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

S.ActionButton = styled.button`
  padding: 0.625rem 1.25rem;
  background: ${({ $color }) => $color ? `${$color}15` : '#f5f5f5'};
  color: ${({ $color }) => $color || '#333'};
  border: 1.5px solid ${({ $color }) => $color || '#e0e0e0'};
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${({ $color }) => $color || '#333'};
    color: #fff;
  }
`;

// History
S.HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

S.HistoryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

S.HistoryText = styled.span`
  flex: 1;
  font-size: 0.9rem;
  color: #333;
`;

S.HistoryActions = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

S.IconButton = styled.button`
  width: 28px;
  height: 28px;
  background: #e0e0e0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  &:disabled { opacity: 0.3; cursor: not-allowed; }
  &:not(:disabled):hover { background: #bdbdbd; }
`;

S.DeleteButton = styled.button`
  padding: 0.25rem 0.625rem;
  background: #ffebee;
  color: #c62828;
  border: 1px solid #ef9a9a;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  &:hover { background: #c62828; color: #fff; }
`;

S.AddHistoryRow = styled.div`
  display: flex;
  gap: 0.75rem;
`;

S.AddHistoryInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
  &:focus { border-color: #1187CF; }
`;

S.AddButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #1187CF;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  &:hover { background: #0e70b0; }
`;

S.SaveButton = styled.button`
  padding: 0.5rem 1.25rem;
  background: #1187CF;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  &:hover { background: #0e70b0; }
`;

S.HistoryNote = styled.p`
  margin-top: 1rem;
  font-size: 0.8rem;
  color: #999;
`;

export default S;
