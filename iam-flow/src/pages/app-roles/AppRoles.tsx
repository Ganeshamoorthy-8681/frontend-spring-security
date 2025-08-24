import { useState } from 'react';
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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SecurityIcon from '@mui/icons-material/Security';
import SearchIcon from '@mui/icons-material/Search';
import { TablePagination } from '../../components';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

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
const mockPermissions: Permission[] = [
  { id: 'users.read', name: 'Read Users', description: 'View user information', category: 'Users' },
  { id: 'users.write', name: 'Write Users', description: 'Create and edit users', category: 'Users' },
  { id: 'users.delete', name: 'Delete Users', description: 'Delete user accounts', category: 'Users' },
  { id: 'roles.read', name: 'Read Roles', description: 'View role information', category: 'Roles' },
  { id: 'roles.write', name: 'Write Roles', description: 'Create and edit roles', category: 'Roles' },
  { id: 'roles.delete', name: 'Delete Roles', description: 'Delete roles', category: 'Roles' },
  { id: 'account.read', name: 'Read Account', description: 'View account information', category: 'Account' },
  { id: 'account.write', name: 'Write Account', description: 'Edit account settings', category: 'Account' },
  { id: 'admin.full', name: 'Full Admin Access', description: 'Complete system administration', category: 'Admin' }
];

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

type ViewMode = 'list' | 'summary' | 'edit' | 'create';

export default function AppRoles() {
  const [roles] = useState(mockRoles);
  const [permissions] = useState(mockPermissions);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Partial<Role>>({
    name: '',
    description: '',
    permissions: []
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

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

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPermissionsByCategory = () => {
    const grouped = permissions.reduce((acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = [];
      }
      acc[permission.category].push(permission);
      return acc;
    }, {} as Record<string, Permission[]>);
    return grouped;
  };

  const handleCreateRole = () => {
    setLoading(true);
    setFormData({ name: '', description: '', permissions: [] });
    setSelectedRole(null);
    setTimeout(() => {
      setViewMode('create');
      setLoading(false);
    }, 300);
  };

  const handleViewRole = (role: Role) => {
    setLoading(true);
    setSelectedRole(role);
    setTimeout(() => {
      setViewMode('summary');
      setLoading(false);
    }, 500);
  };

  const handleEditRole = (role: Role) => {
    setLoading(true);
    setSelectedRole(role);
    setFormData(role);
    setTimeout(() => {
      setViewMode('edit');
      setLoading(false);
    }, 500);
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedRole(null);
    setFormData({ name: '', description: '', permissions: [] });
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    const currentPermissions = formData.permissions || [];
    const newPermissions = checked
      ? [...currentPermissions, permissionId]
      : currentPermissions.filter(id => id !== permissionId);
    
    setFormData(prev => ({ ...prev, permissions: newPermissions }));
  };

  const handleSave = () => {
    setLoading(true);
    // TODO: Implement save logic
    console.log('Save role:', formData);
    setTimeout(() => {
      setLoading(false);
      handleBackToList();
    }, 1000);
  };

  const renderRolesList = () => (
    <Box>
      {/* Search Bar */}
      <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
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
          <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
            {filteredRoles.length} of {roles.length} roles
          </Typography>
        </Stack>
      </Paper>

      <Paper elevation={2}>
        <Toolbar sx={{ pl: 2, pr: 1 }}>
          <Typography variant="h6" component="div" sx={{ flex: '1 1 100%' }}>
            <Badge badgeContent={filteredRoles.length} color="primary" showZero>
              Roles
            </Badge>
          </Typography>
          <Tooltip title="Create new role">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateRole}
              disabled={loading}
            >
              Create Role
            </Button>
          </Tooltip>
        </Toolbar>
        
        <TableContainer>
          {loading ? (
            <Box sx={{ p: 3 }}>
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} variant="rectangular" height={73} sx={{ mb: 1 }} />
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
                  <TableCell>Role Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Permissions</TableCell>
                  <TableCell>Users</TableCell>
                  <TableCell>Last Updated</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRoles.map((role) => (
                  <TableRow key={role.id} hover sx={{ cursor: 'pointer' }}>
                    <TableCell onClick={() => handleViewRole(role)}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SecurityIcon fontSize="small" color="action" />
                        <Typography fontWeight="medium">{role.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell onClick={() => handleViewRole(role)}>
                      <Typography variant="body2" color="text.secondary" sx={{ 
                        maxWidth: '300px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {role.description}
                      </Typography>
                    </TableCell>
                    <TableCell onClick={() => handleViewRole(role)}>
                      <Tooltip title={`${role.permissions.length} permissions assigned`}>
                        <Chip
                          label={`${role.permissions.length} permissions`}
                          size="small"
                          variant="outlined"
                          color="primary"
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell onClick={() => handleViewRole(role)}>
                      <Tooltip title={`${role.userCount} users have this role`}>
                        <Chip
                          label={`${role.userCount} users`}
                          size="small"
                          variant="outlined"
                          color={role.userCount > 0 ? 'success' : 'default'}
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell onClick={() => handleViewRole(role)}>
                      <Typography variant="body2" color="text.secondary">
                        {formatDateTime(role.updatedAt)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="View role details">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewRole(role);
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit role">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditRole(role);
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

  const renderRoleSummary = () => (
    <Box>
      <Toolbar sx={{ pl: 0, pr: 1 }}>
        <Button onClick={handleBackToList}>← Back to Roles</Button>
        <Box sx={{ flex: 1 }} />
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={() => handleEditRole(selectedRole!)}
        >
          Edit Role
        </Button>
      </Toolbar>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {selectedRole?.name}
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mt: 3 }}>
          <Box>
            <Typography variant="h6" gutterBottom>Role Information</Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Role Name</Typography>
                <Typography>{selectedRole?.name}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Description</Typography>
                <Typography>{selectedRole?.description}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Users Assigned</Typography>
                <Chip
                  label={`${selectedRole?.userCount} users`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Created</Typography>
                <Typography>{formatDateTime(selectedRole?.createdAt || '')}</Typography>
              </Box>
            </Stack>
          </Box>
          
          <Box>
            <Typography variant="h6" gutterBottom>Permissions</Typography>
            <Stack spacing={1}>
              {selectedRole?.permissions.map((permissionId) => {
                const permission = permissions.find(p => p.id === permissionId);
                return permission ? (
                  <Box key={permissionId} sx={{ p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                    <Typography variant="body2" fontWeight="medium">
                      {permission.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {permission.description}
                    </Typography>
                  </Box>
                ) : null;
              })}
            </Stack>
          </Box>
        </Box>
      </Paper>
    </Box>
  );

  const renderRoleForm = () => (
    <Box>
      <Toolbar sx={{ pl: 0, pr: 1, mb: 2 }}>
        <Button onClick={handleBackToList} sx={{ mr: 'auto' }}>
          ← Back to Roles
        </Button>
        <Button onClick={handleBackToList} disabled={loading}>
          Cancel
        </Button>
        <Button 
          variant="contained" 
          sx={{ ml: 1 }} 
          onClick={handleSave}
          disabled={loading || !formData.name || !formData.description}
        >
          {loading ? 'Saving...' : (viewMode === 'create' ? 'Create Role' : 'Save Changes')}
        </Button>
      </Toolbar>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <SecurityIcon color="primary" sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h5">
              {viewMode === 'create' ? 'Create New Role' : `Edit Role: ${selectedRole?.name}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {viewMode === 'create' 
                ? 'Define a new role with specific permissions'
                : 'Modify role details and permissions'
              }
            </Typography>
          </Box>
        </Box>
        
        <Stack spacing={4}>
          <Box>
            <Typography variant="h6" gutterBottom>Basic Information</Typography>
            <Stack spacing={3}>
              <TextField
                label="Role Name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                fullWidth
                required
                disabled={loading}
                error={!formData.name && formData.name !== undefined}
                helperText={!formData.name && formData.name !== undefined ? 'Role name is required' : ''}
              />
              
              <TextField
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                fullWidth
                multiline
                rows={3}
                required
                disabled={loading}
                error={!formData.description && formData.description !== undefined}
                helperText={!formData.description && formData.description !== undefined ? 'Description is required' : 'Describe what this role is for and what access it provides'}
              />
            </Stack>
          </Box>
          
          <Divider />
          
          <Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>Permissions</Typography>
              <Typography variant="body2" color="text.secondary">
                Select the permissions that users with this role should have. Permissions are grouped by category for easier management.
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Selected: {formData.permissions?.length || 0} permissions
              </Typography>
            </Box>
            
            {Object.entries(getPermissionsByCategory()).map(([category, categoryPermissions]) => (
              <Paper key={category} elevation={1} sx={{ p: 3, mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ 
                  fontWeight: 'medium',
                  color: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <SecurityIcon fontSize="small" />
                  {category}
                  <Chip 
                    size="small" 
                    label={`${categoryPermissions.filter(p => formData.permissions?.includes(p.id)).length}/${categoryPermissions.length}`}
                    color="primary"
                    variant="outlined"
                  />
                </Typography>
                <FormGroup>
                  {categoryPermissions.map((permission) => (
                    <FormControlLabel
                      key={permission.id}
                      control={
                        <Checkbox
                          checked={formData.permissions?.includes(permission.id) || false}
                          onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                          disabled={loading}
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {permission.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {permission.description}
                          </Typography>
                        </Box>
                      }
                      sx={{ 
                        alignItems: 'flex-start',
                        mb: 1,
                        ml: 0,
                        '& .MuiFormControlLabel-label': {
                          ml: 1
                        }
                      }}
                    />
                  ))}
                </FormGroup>
              </Paper>
            ))}
          </Box>
        </Stack>
      </Paper>
    </Box>
  );

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Roles Management
      </Typography>

      {viewMode === 'list' && renderRolesList()}
      {viewMode === 'summary' && renderRoleSummary()}
      {(viewMode === 'edit' || viewMode === 'create') && renderRoleForm()}
    </Box>
  );
}
