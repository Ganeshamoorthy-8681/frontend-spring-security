import styled from "@emotion/styled";
import { AppBar, Avatar, Toolbar, useTheme } from "@mui/material";
import { ThemeToggle } from "../theme-toggle/ThemeToggle";

const ToolbarContainer = styled.div<{ isDarkMode: boolean }>`
   .content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
   }
   .profile {
      display: flex;
      align-items: center;
      gap: 12px;
      div {
         display: flex;
         flex-direction: row;
         line-height: 1.2;
         font-size: 0.875rem;
         color: ${props => props.isDarkMode ? '#ffffff' : '#ffffff'};
    }
    .profile-details {
      display: flex;
      flex-direction: column;
    }
   }
   .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
   }
`;

export function AppHeader() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <ToolbarContainer isDarkMode={isDarkMode}>
      <AppBar>
        <Toolbar>
          <div className="content">
            <div>IAM FLOW</div>
            <div className="header-actions">
              <ThemeToggle />
              <div className="profile">
                <div className="profile-details">
                  <div className="email">email@example.com</div>
                  <div className="name">first middle last</div>
                </div>
                <Avatar src="https://via.placeholder.com/150"></Avatar>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </ToolbarContainer>
  );
}
