import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Paper, Button } from "@mui/material";
import ReactFlow, { Background } from 'react-flow-renderer';
import "./ComponentDetail.css";

const ComponentDetail = () => {
  const { name } = useParams();
  const [componentData, setComponentData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/configs")
      .then((response) => response.json())
      .then((data) => {
        const component = data.find((item) => item.metadata.name === name);
        setComponentData(component);
      })
      .catch((error) => console.error("Error fetching component data:", error));
  }, [name]);

  if (!componentData) {
    return <div>Loading...</div>;
  }

  console.log('test')

  const { metadata, spec } = componentData;

  const nodes = [
    {
      id: '1',
      data: { label: metadata.name },
      position: { x: 150, y: 50 },
      type: 'input',
    },
    ...spec.dependsOn.map((dep, index) => ({
      id: `dep-${index}`,
      data: { label: dep },
      position: { x: 150, y: 150 + index * 100 },
    })),
    ...spec.apiConsumedBy.map((api, index) => ({
      id: `api-${index}`,
      data: { label: api },
      position: { x: 150, y: 300 + index * 100 },
    })),
  ];

  const edges = [
    ...spec.dependsOn.map((dep, index) => ({
      id: `e1-${index}`,
      source: '1',
      target: `dep-${index}`,
      animated: true,
    })),
    ...spec.apiConsumedBy.map((api, index) => ({
      id: `e2-${index}`,
      source: `api-${index}`,
      target: '1',
      animated: true,
    })),
  ];

  return (
    <> <div className="component-detail-container">
    <div className="component-info">
      <Typography variant="h4" component="h1" gutterBottom>
        {metadata.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Description:</strong> {metadata.description}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Type:</strong> {spec.type}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Lifecycle:</strong> {spec.lifecycle}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Owner:</strong> {spec.owner}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>System:</strong> {spec.system}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Tags:
      </Typography>
      {metadata.tags.map((tag, index) => (
        <span style={{border: '1px solid #460074', borderRadius: '20px', padding: '5px 16px', marginRight: '3px', color: '#460074'}}>{tag}</span>
      ))}

      <Typography variant="h6" gutterBottom>
        Links:
      </Typography>
      {metadata.links.map((link, index) => (
        <div key={index}>
          <a href={link.url} target="_blank" rel="noopener noreferrer" style={{color: '#460074'}}>
            {link.title} (Icon: {link.icon})
          </a>
        </div>
      ))}
    </div>

    <div className="relations-container">
      <Paper elevation={3} className="relations-paper">
        <Typography variant="h5" component="h2" gutterBottom>
          Relations
        </Typography>
        <div className="graph-container">
          <ReactFlow nodes={nodes} edges={edges} fitView>
            <Background />
          </ReactFlow>
        </div>
      </Paper>
    </div>
  </div></>
   
  );
};

export default ComponentDetail;
