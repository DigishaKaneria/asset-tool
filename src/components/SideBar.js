import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build';
import LinkIcon from '@mui/icons-material/Link';
import DescriptionIcon from '@mui/icons-material/Description';
import TaskIcon from '@mui/icons-material/Task';
import { Link } from 'react-router-dom';
import './SideBar.css';

const SideBar = () => {
  return (
    <div className="sidebar">
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Overview" style={{'color':'white'}}/>
        </ListItem>
        <ListItem button component={Link} to="/cicd">
          <ListItemIcon>
            <BuildIcon />
          </ListItemIcon>
          <ListItemText primary="CI/CD" style={{'color':'white'}}/>
        </ListItem>
        <ListItem button component={Link} to="/api">
          <ListItemIcon>
            <CodeIcon />
          </ListItemIcon>
          <ListItemText primary="API" style={{'color':'white'}} />
        </ListItem>
        <ListItem button component={Link} to="/dependencies">
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          <ListItemText primary="Dependencies" style={{'color':'white'}}/>
        </ListItem>
        <ListItem button component={Link} to="/docs">
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Docs" style={{'color':'white'}}/>
        </ListItem>
        <ListItem button component={Link} to="/todos">
          <ListItemIcon>
            <TaskIcon />
          </ListItemIcon>
          <ListItemText primary="Todos" style={{'color':'white'}}/>
        </ListItem>
      </List>
      <Divider />
    </div>
  );
};

export default SideBar;
