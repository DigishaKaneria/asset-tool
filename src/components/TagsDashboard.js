import React, { useEffect, useState } from 'react';
import yaml from 'js-yaml';
import { Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TagsDashboard = () => {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchYaml = (fileName) => {
      return fetch(`/${fileName}`)
        .then(response => response.text())
        .then(text => yaml.load(text))
        .catch(error => console.error(`Error loading ${fileName}:`, error));
    };

    // Fetch both YAML files and merge tags
    Promise.all([fetchYaml('config1.yaml'), fetchYaml('config2.yaml')])
      .then((results) => {
        const combinedTags = [...(results[0].tags || []), ...(results[1].tags || [])];
        setTags(combinedTags);
      });
  }, []);

  const handleTagClick = (tag) => {
    // Navigate to tag details page with the tag name
    navigate(`/tags/${tag.name}`);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
      <Card sx={{ minWidth: 275, maxWidth: '80%', padding: '20px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Tags
          </Typography>
          <Grid container spacing={2}>
            {tags.map((tag, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    textTransform: 'none',
                    borderRadius: '10px',
                    padding: '10px',
                    fontSize: '1rem',
                    fontWeight: 500,
                  }}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag.name}
                </Button>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TagsDashboard;
