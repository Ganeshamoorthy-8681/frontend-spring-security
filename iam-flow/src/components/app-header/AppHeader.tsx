import styled from "@emotion/styled";
import { AppBar, Avatar, Toolbar, useTheme } from "@mui/material";
import { ThemeToggle } from "../theme-toggle/ThemeToggle";
import { useCurrentUser } from "../../hooks/useCurrentUser";

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
      gap: 8px;
      
      .profile-details {
         display: flex;
         flex-direction: column;
         align-items: flex-end;
         text-align: right;
         
         .name {
            font-size: 0.875rem;
            font-weight: 500;
            color: ${props => props.isDarkMode ? '#ffffff' : '#ffffff'};
            line-height: 1.2;
         }
         
         .email {
            font-size: 0.75rem;
            font-weight: 400;
            color: ${props => props.isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.8)'};
            line-height: 1.1;
         }
      }
   }
   .header-actions {
      display: flex;
      align-items: center;
      gap: 12px;
   }
   
   @media (max-width: 600px) {
      .profile .profile-details {
         display: none;
      }
   }
`;

export function AppHeader() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const currentUser = useCurrentUser();

  // Create full name from user data
  const fullName = currentUser 
    ? [currentUser.firstName, currentUser.lastName]
        .filter(Boolean)
        .join(' ')
    : 'Loading...';

  const userEmail = currentUser?.email || 'Loading...';

  // Create initials for avatar
  const avatarInitials = currentUser && fullName !== 'Loading...'
    ? fullName
        .split(' ')
        .map(name => name.charAt(0))
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '?';

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
                  <div className="name">{fullName}</div>
                  <div className="email">{userEmail}</div>
                </div>
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    backgroundColor: currentUser?.status === 'ACTIVE' 
                      ? theme.palette.success.main 
                      : theme.palette.grey[500]
                  }}
                >
                  {avatarInitials}
                </Avatar>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </ToolbarContainer>
  );
}
