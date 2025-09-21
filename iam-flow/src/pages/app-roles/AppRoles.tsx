import { useState } from 'react';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import SecurityIcon from '@mui/icons-material/Security';
import SearchIcon from '@mui/icons-material/Search';
import { TablePagination } from '../../components';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  createdAt: string;
  updatedAt: string;
}

// Mock data - replace with actual API calls
const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Account Owner',
    description: 'Full access to all account features and settings',
    permissions: ['admin.full'],
    userCount: 1,
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z'
  },
  {
    id: '2',
    name: 'Admin',
    description: 'Administrative access with user and role management',
    permissions: ['users.read', 'users.write', 'users.delete', 'roles.read', 'roles.write', 'account.read'],
    userCount: 2,
    createdAt: '2024-01-20T10:30:00Z',
    updatedAt: '2024-02-15T14:20:00Z'
  },
  {
    id: '3',
    name: 'User Manager',
    description: 'Can manage users but not roles or account settings',
    permissions: ['users.read', 'users.write', 'account.read'],
    userCount: 1,
    createdAt: '2024-02-01T11:00:00Z',
    updatedAt: '2024-02-01T11:00:00Z'
  },
  {
    id: '4',
    name: 'User',
    description: 'Basic user access with read-only permissions',
    permissions: ['account.read'],
    userCount: 8,
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z'
  },
  {
    id: '5',
    name: 'Content Manager',
    description: 'Can manage content and moderate discussions',
    permissions: ['users.read', 'account.read'],
    userCount: 3,
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-02-10T10:00:00Z'
  },
  {
    id: '6',
    name: 'Support Agent',
    description: 'Customer support access with limited user management',
    permissions: ['users.read', 'account.read'],
    userCount: 5,
    createdAt: '2024-03-01T14:30:00Z',
    updatedAt: '2024-03-01T14:30:00Z'
  },
  {
    id: '7',
    name: 'Data Analyst',
    description: 'Read-only access to analytics and reporting',
    permissions: ['account.read'],
    userCount: 2,
    createdAt: '2024-03-15T09:45:00Z',
    updatedAt: '2024-03-15T09:45:00Z'
  },
  {
    id: '8',
    name: 'Marketing Team',
    description: 'Access to marketing tools and user communication',
    permissions: ['users.read', 'account.read'],
    userCount: 4,
    createdAt: '2024-04-01T11:15:00Z',
    updatedAt: '2024-04-01T11:15:00Z'
  },
  {
    id: '9',
    name: 'Developer',
    description: 'Technical access for development and integration',
    permissions: ['users.read', 'roles.read', 'account.read'],
    userCount: 6,
    createdAt: '2024-04-15T13:20:00Z',
    updatedAt: '2024-04-15T13:20:00Z'
  },
  {
    id: '10',
    name: 'Quality Assurance',
    description: 'Testing access with limited modification rights',
    permissions: ['users.read', 'account.read'],
    userCount: 3,
    createdAt: '2024-05-01T16:00:00Z',
    updatedAt: '2024-05-01T16:00:00Z'
  },
  {
    id: '11',
    name: 'Financial Analyst',
    description: 'Access to financial data and reporting features',
    permissions: ['account.read'],
    userCount: 2,
    createdAt: '2024-05-15T10:30:00Z',
    updatedAt: '2024-05-15T10:30:00Z'
  },
  {
    id: '12',
    name: 'Project Manager',
    description: 'Project coordination access with team visibility',
    permissions: ['users.read', 'roles.read', 'account.read'],
    userCount: 4,
    createdAt: '2024-06-01T08:45:00Z',
    updatedAt: '2024-06-01T08:45:00Z'
  }
];

export default function AppRoles() {
  const navigate = useNavigate();
  const [roles] = useState(mockRoles);
  const [loading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter roles based on search
  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate filtered roles
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRoles = filteredRoles.slice(startIndex, endIndex);

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const handleViewRole = (role: Role) => {
    navigate(`/app/roles/${role.id}`);
  };

  const handleCreateRole = () => {
    navigate('/app/roles/create');
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderRolesList = () => (
    <Box>
      {/* Search Bar */}
      <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            size="small"
            sx={{ minWidth: '300px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Paper>

      <Paper elevation={2}>
        <TableContainer>
          {loading ? (
            <Box sx={{ p: 3 }}>
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} variant="rectangular" height={53} sx={{ mb: 1 }} />
              ))}
            </Box>
          ) : filteredRoles.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Alert severity="info" sx={{ maxWidth: 400, mx: 'auto' }}>
                {searchTerm
                  ? 'No roles match your search criteria.'
                  : 'No roles found. Create your first role to get started.'}
              </Alert>
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Role Name</strong></TableCell>
                  <TableCell><strong>Description</strong></TableCell>
                  <TableCell><strong>Permissions</strong></TableCell>
                  <TableCell><strong>Last Updated</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRoles.map((role) => (
                  <TableRow 
                    key={role.id} 
                    hover 
                    sx={{ 
                      cursor: 'pointer',
                      '& td': {
                        borderBottom: (theme) => `1px solid ${theme.palette.divider}`
                      }
                    }} 
                    onClick={() => handleViewRole(role)}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SecurityIcon fontSize="small" color="action" />
                        <Typography fontWeight="medium">{role.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{
                        maxWidth: '300px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {role.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={`${role.permissions.length} permissions`}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {formatDateTime(role.updatedAt)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        {/* Pagination */}
        {!loading && filteredRoles.length > 0 && (
          <TablePagination
            totalItems={filteredRoles.length}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            label="roles"
          />
        )}
      </Paper>
    </Box>
  );

  return (
    <>
      <Paper>
        <Toolbar className='toolbar'>
          <Typography variant="h6" gutterBottom>
            Roles Management
          </Typography>
          <Button startIcon={<AddIcon />} onClick={handleCreateRole}>
            Create Role
          </Button>
        </Toolbar>
      </Paper>
      <div className='page-content'>
        {renderRolesList()}
      </div>
    </>
  );
}
