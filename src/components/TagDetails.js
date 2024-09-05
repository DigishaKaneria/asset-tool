import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import yaml from 'js-yaml';
import { Card, CardContent, Typography, Box } from '@mui/material';
import ReactFlow, { MiniMap, Controls, Background } from 'react-flow-renderer';

const TagDetails = () => {
  const { tagName } = useParams(); // Get the tag name from the URL
  const [tagDetails, setTagDetails] = useState(null);
  const [relatedTags, setRelatedTags] = useState([]);

  useEffect(() => {
    const fetchYaml = (fileName) => {
      return fetch(`/${fileName}`)
        .then(response => response.text())
        .then(text => yaml.load(text))
        .catch(error => console.error(`Error loading ${fileName}:`, error));
    };

    // Fetch both YAML files and find the tag by name
    Promise.all([fetchYaml('config1.yaml'), fetchYaml('config2.yaml')])
      .then((results) => {
        const combinedTags = [...(results[0].tags || []), ...(results[1].tags || [])];
        const selectedTag = combinedTags.find(tag => tag.name === tagName);
        setTagDetails(selectedTag);

        // For simplicity, simulate related tags by just picking random tags from the list
        const simulatedRelatedTags = combinedTags.filter(tag => tag.name !== tagName).slice(0, 3);
        setRelatedTags(simulatedRelatedTags);
      });
  }, [tagName]);

  if (!tagDetails) {
    return <Typography>Loading...</Typography>;
  }

  // Generate nodes and edges for react-flow
  const nodes = [
    {
      id: 'tag-node',
      data: { label: tagDetails.name },
      position: { x: 250, y: 0 },
      style: {
        background: '#D6EAF8',
        color: '#333',
        border: '1px solid #1ABC9C',
        borderRadius: '10px',
        padding: '10px',
        fontSize: '1rem',
      },
    },
    ...relatedTags.map((relatedTag, index) => ({
      id: `related-node-${index}`,
      data: { label: relatedTag.name },
      position: { x: 100 * index, y: 150 },
      style: {
        background: '#FAD7A0',
        color: '#333',
        border: '1px solid #D68910',
        borderRadius: '10px',
        padding: '10px',
        fontSize: '0.875rem',
      },
    })),
  ];

  const edges = relatedTags.map((_, index) => ({
    id: `edge-${index}`,
    source: 'tag-node',
    target: `related-node-${index}`,
    animated: true,
    style: { stroke: '#333', strokeWidth: 2 },
    label: 'related',
  }));

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
      <Card sx={{ minWidth: 275, maxWidth: '80%', padding: '20px' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {tagDetails.name}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Category: {tagDetails.category}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Description: {tagDetails.description}
          </Typography>

          {/* React-Flow component for displaying relationships */}
          <Box sx={{ height: '300px', mt: 4 }}>
            <ReactFlow elements={[...nodes, ...edges]} fitView>
              <MiniMap
                nodeColor={(node) => {
                  switch (node.id) {
                    case 'tag-node':
                      return '#1ABC9C';
                    default:
                      return '#D68910';
                  }
                }}
              />
              <Controls />
              <Background color="#aaa" gap={16} />
            </ReactFlow>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TagDetails;
