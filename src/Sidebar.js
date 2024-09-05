import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Drawer variant="permanent">
      <List>
        <ListItem button component={Link} to="/tags">
          <ListItemText primary="Tags Dashboard" />
        </ListItem>
        {/* Add more items here as needed */}
      </List>
    </Drawer>
  );
};

export default Sidebar;
