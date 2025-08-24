import { useState } from 'react';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SecurityIcon from '@mui/icons-material/Security';
import { TablePagination } from '../../components';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  status: 'Active' | 'Inactive' | 'Pending';
  roles: string[];
  lastLogin: string;
  createdAt: string;
}

// Mock data - replace with actual API calls
const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@techcorp.com',
    emailVerified: true,
    status: 'Active',
    roles: ['Account Owner', 'Admin'],
    lastLogin: '2024-08-23T10:30:00Z',
    createdAt: '2024-01-15T09:00:00Z'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@techcorp.com',
    emailVerified: true,
    status: 'Active',
    roles: ['User Manager'],
    lastLogin: '2024-08-22T14:15:00Z',
    createdAt: '2024-02-01T11:30:00Z'
  },
  {
    id: '3',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@techcorp.com',
    emailVerified: false,
    status: 'Pending',
    roles: ['User'],
    lastLogin: '',
    createdAt: '2024-08-20T16:45:00Z'
  },
  {
    id: '4',
    firstName: 'Sarah',
    lastName: 'Wilson',
    email: 'sarah.wilson@techcorp.com',
    emailVerified: true,
    status: 'Inactive',
    roles: ['User'],
    lastLogin: '2024-08-10T08:20:00Z',
    createdAt: '2024-03-15T13:10:00Z'
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@techcorp.com',
    emailVerified: true,
    status: 'Active',
    roles: ['User'],
    lastLogin: '2024-08-23T09:15:00Z',
    createdAt: '2024-03-20T10:00:00Z'
  },
  {
    id: '6',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@techcorp.com',
    emailVerified: false,
    status: 'Pending',
    roles: ['User'],
    lastLogin: '',
    createdAt: '2024-08-21T14:30:00Z'
  },
  {
    id: '7',
    firstName: 'Robert',
    lastName: 'Miller',
    email: 'robert.miller@techcorp.com',
    emailVerified: true,
    status: 'Active',
    roles: ['Admin'],
    lastLogin: '2024-08-22T16:45:00Z',
    createdAt: '2024-02-15T09:30:00Z'
  },
  {
    id: '8',
    firstName: 'Lisa',
    lastName: 'Anderson',
    email: 'lisa.anderson@techcorp.com',
    emailVerified: true,
    status: 'Inactive',
    roles: ['User'],
    lastLogin: '2024-08-05T11:20:00Z',
    createdAt: '2024-04-01T13:45:00Z'
  },
  {
    id: '9',
    firstName: 'Thomas',
    lastName: 'Taylor',
    email: 'thomas.taylor@techcorp.com',
    emailVerified: true,
    status: 'Active',
    roles: ['User Manager', 'User'],
    lastLogin: '2024-08-23T08:30:00Z',
    createdAt: '2024-01-30T15:00:00Z'
  },
  {
    id: '10',
    firstName: 'Jennifer',
    lastName: 'White',
    email: 'jennifer.white@techcorp.com',
    emailVerified: false,
    status: 'Pending',
    roles: ['User'],
    lastLogin: '',
    createdAt: '2024-08-22T12:15:00Z'
  },
  {
    id: '11',
    firstName: 'Mark',
    lastName: 'Thompson',
    email: 'mark.thompson@techcorp.com',
    emailVerified: true,
    status: 'Active',
    roles: ['User'],
    lastLogin: '2024-08-22T17:00:00Z',
    createdAt: '2024-05-10T08:45:00Z'
  },
  {
    id: '12',
    firstName: 'Amanda',
    lastName: 'Garcia',
    email: 'amanda.garcia@techcorp.com',
    emailVerified: true,
    status: 'Active',
    roles: ['User'],
    lastLogin: '2024-08-21T13:20:00Z',
    createdAt: '2024-06-01T11:30:00Z'
  },
  {
    id: '13',
    firstName: 'Kevin',
    lastName: 'Martinez',
    email: 'kevin.martinez@techcorp.com',
    emailVerified: false,
    status: 'Inactive',
    roles: ['User'],
    lastLogin: '2024-07-28T10:45:00Z',
    createdAt: '2024-03-05T14:20:00Z'
  },
  {
    id: '14',
    firstName: 'Michelle',
    lastName: 'Rodriguez',
    email: 'michelle.rodriguez@techcorp.com',
    emailVerified: true,
    status: 'Active',
    roles: ['Admin'],
    lastLogin: '2024-08-23T07:15:00Z',
    createdAt: '2024-01-25T16:10:00Z'
  },
  {
    id: '15',
    firstName: 'Christopher',
    lastName: 'Lee',
    email: 'christopher.lee@techcorp.com',
    emailVerified: true,
    status: 'Active',
    roles: ['User'],
    lastLogin: '2024-08-22T19:30:00Z',
    createdAt: '2024-07-15T09:00:00Z'
  }
];

type ViewMode = 'list' | 'summary' | 'edit';

export default function AppUsers() {
  const navigate = useNavigate();
  const [users] = useState(mockUsers);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [emailVerifiedFilter, setEmailVerifiedFilter] = useState<string>('all');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesEmailVerified = emailVerifiedFilter === 'all' || 
      (emailVerifiedFilter === 'verified' && user.emailVerified) ||
      (emailVerifiedFilter === 'unverified' && !user.emailVerified);

    return matchesSearch && matchesStatus && matchesEmailVerified;
  });

  // Paginate filtered users
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing page size
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

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Inactive': return 'error';
      case 'Pending': return 'warning';
      default: return 'default';
    }
  };

  const handleCreateUser = () => {
    setLoading(true);
    // TODO: Navigate to user creation form
    console.log('Create new user');
    setTimeout(() => setLoading(false), 1000); // Simulate API call
  };

  const handleViewUser = (user: User) => {
    navigate(`/app/users/${user.id}`);
  };

  const handleEditUser = (user: User) => {
    navigate(`/app/users/${user.id}/edit`);
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedUser(null);
  };

  const renderUsersList = () => (
    <Box>
      {/* Search and Filters */}
      <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
          <TextField
            placeholder="Search users..."
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
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Email Status</InputLabel>
            <Select
              value={emailVerifiedFilter}
              label="Email Status"
              onChange={(e) => {
                setEmailVerifiedFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="verified">Verified</MenuItem>
              <MenuItem value="unverified">Unverified</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterListIcon color="action" />
            <Typography variant="body2" color="text.secondary">
              {filteredUsers.length} of {users.length} users
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Paper elevation={2}>
        <Toolbar sx={{ pl: 2, pr: 1 }}>
          <Typography variant="h6" component="div" sx={{ flex: '1 1 100%' }}>
            <Badge badgeContent={filteredUsers.length} color="primary" showZero>
              Users
            </Badge>
          </Typography>
          <Tooltip title="Create new user">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateUser}
              disabled={loading}
            >
              Create User
            </Button>
          </Tooltip>
        </Toolbar>
        
        <TableContainer>
          {loading ? (
            <Box sx={{ p: 3 }}>
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} variant="rectangular" height={53} sx={{ mb: 1 }} />
              ))}
            </Box>
          ) : filteredUsers.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Alert severity="info" sx={{ maxWidth: 400, mx: 'auto' }}>
                {searchTerm || statusFilter !== 'all' || emailVerifiedFilter !== 'all'
                  ? 'No users match your search criteria.'
                  : 'No users found. Create your first user to get started.'}
              </Alert>
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Email Verified</TableCell>
                  <TableCell>Roles</TableCell>
                  <TableCell>Last Login</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id} hover sx={{ cursor: 'pointer' }}>
                    <TableCell onClick={() => handleViewUser(user)}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PersonIcon fontSize="small" color="action" />
                        <Typography fontWeight="medium">
                          {user.firstName} {user.lastName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell onClick={() => handleViewUser(user)}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EmailIcon fontSize="small" color="action" />
                        {user.email}
                      </Box>
                    </TableCell>
                    <TableCell onClick={() => handleViewUser(user)}>
                      <Chip
                        label={user.status}
                        color={getStatusColor(user.status)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell onClick={() => handleViewUser(user)}>
                      <Tooltip title={user.emailVerified ? "Email verified" : "Email not verified"}>
                        {user.emailVerified ? (
                          <CheckCircleIcon color="success" fontSize="small" />
                        ) : (
                          <CancelIcon color="error" fontSize="small" />
                        )}
                      </Tooltip>
                    </TableCell>
                    <TableCell onClick={() => handleViewUser(user)}>
                      <Stack direction="row" spacing={0.5} flexWrap="wrap">
                        {user.roles.slice(0, 2).map((role, index) => (
                          <Chip
                            key={index}
                            label={role}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                        {user.roles.length > 2 && (
                          <Tooltip title={user.roles.slice(2).join(', ')}>
                            <Chip
                              label={`+${user.roles.length - 2}`}
                              size="small"
                              variant="outlined"
                              color="primary"
                            />
                          </Tooltip>
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell onClick={() => handleViewUser(user)}>
                      <Typography variant="body2" color="text.secondary">
                        {formatDateTime(user.lastLogin)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="View user details">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewUser(user);
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit user">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditUser(user);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        
        {/* Pagination */}
        {!loading && filteredUsers.length > 0 && (
          <TablePagination
            totalItems={filteredUsers.length}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            label="users"
          />
        )}
      </Paper>
    </Box>
  );

  const renderUserSummary = () => (
    <Box>
      <Toolbar sx={{ pl: 0, pr: 1, mb: 2 }}>
        <Button onClick={handleBackToList} sx={{ mr: 'auto' }}>
          ← Back to Users
        </Button>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={() => setViewMode('edit')}
          disabled={loading}
        >
          Edit User
        </Button>
      </Toolbar>

      {loading ? (
        <Paper elevation={2} sx={{ p: 3 }}>
          <Skeleton variant="text" width="60%" height={40} />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mt: 3 }}>
            <Box>
              <Skeleton variant="text" width="40%" height={32} />
              {[...Array(4)].map((_, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Skeleton variant="text" width="30%" height={20} />
                  <Skeleton variant="text" width="70%" height={24} />
                </Box>
              ))}
            </Box>
            <Box>
              <Skeleton variant="text" width="40%" height={32} />
              {[...Array(4)].map((_, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Skeleton variant="text" width="30%" height={20} />
                  <Skeleton variant="text" width="70%" height={24} />
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>
      ) : (
        <Paper elevation={2} sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <PersonIcon color="primary" sx={{ fontSize: 32 }} />
            <Box>
              <Typography variant="h5">
                {selectedUser?.firstName} {selectedUser?.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedUser?.email}
              </Typography>
            </Box>
            <Box sx={{ ml: 'auto' }}>
              <Chip
                label={selectedUser?.status}
                color={selectedUser?.status ? getStatusColor(selectedUser.status) : 'default'}
                variant="outlined"
              />
            </Box>
          </Box>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PersonIcon />
                Personal Information
              </Typography>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">First Name</Typography>
                  <Typography variant="body1" fontWeight="medium">{selectedUser?.firstName}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Last Name</Typography>
                  <Typography variant="body1" fontWeight="medium">{selectedUser?.lastName}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Email Address</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EmailIcon fontSize="small" color="action" />
                    <Typography>{selectedUser?.email}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Email Verification</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {selectedUser?.emailVerified ? (
                      <CheckCircleIcon color="success" fontSize="small" />
                    ) : (
                      <CancelIcon color="error" fontSize="small" />
                    )}
                    <Chip
                      label={selectedUser?.emailVerified ? "Verified" : "Unverified"}
                      color={selectedUser?.emailVerified ? "success" : "error"}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </Box>
              </Stack>
            </Box>
            
            <Box>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SecurityIcon />
                Account Information
              </Typography>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Account Status</Typography>
                  <Chip
                    label={selectedUser?.status}
                    color={selectedUser?.status ? getStatusColor(selectedUser.status) : 'default'}
                    size="small"
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Assigned Roles</Typography>
                  <Stack direction="row" spacing={0.5} flexWrap="wrap">
                    {selectedUser?.roles.map((role, index) => (
                      <Chip
                        key={index}
                        label={role}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Last Login</Typography>
                  <Typography variant="body2" color={selectedUser?.lastLogin ? 'text.primary' : 'text.secondary'}>
                    {formatDateTime(selectedUser?.lastLogin || '')}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Account Created</Typography>
                  <Typography variant="body2">
                    {formatDateTime(selectedUser?.createdAt || '')}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );

  const renderUserEdit = () => (
    <Box>
      <Toolbar sx={{ pl: 0, pr: 1 }}>
        <Button onClick={handleBackToList}>← Back to Users</Button>
        <Box sx={{ flex: 1 }} />
        <Button onClick={() => setViewMode('summary')}>Cancel</Button>
        <Button variant="contained" sx={{ ml: 1 }}>Save Changes</Button>
      </Toolbar>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Edit User: {selectedUser?.firstName} {selectedUser?.lastName}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          You can edit the user's names, password, and roles. Email address cannot be modified.
        </Typography>

        {/* TODO: Add actual form fields here */}
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            User Edit Form
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Form fields for editing user details will be implemented here
          </Typography>
        </Box>
      </Paper>
    </Box>
  );

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Users Management
      </Typography>

      {viewMode === 'list' && renderUsersList()}
      {viewMode === 'summary' && renderUserSummary()}
      {viewMode === 'edit' && renderUserEdit()}
    </Box>
  );
}
