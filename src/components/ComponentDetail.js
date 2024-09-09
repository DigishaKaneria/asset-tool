import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Paper, Tabs, Tab, Grid2, Box } from "@mui/material";
import ReactFlow, { Background } from "react-flow-renderer";
import "./ComponentDetail.css";
import NavBar from "./NavBar";

const ComponentDetail = () => {
  const { name } = useParams();
  const [componentData, setComponentData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

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

  console.log("test");

  const { metadata, spec } = componentData;

  const nodes = [
    {
      id: "1",
      data: { label: metadata.name },
      position: { x: 400, y: 300 },
      type: "default",
      style: {
        background: "#FFB6C1",
        border: "1px solid #FF69B4",
        borderRadius: "5px",
        padding: "10px",
      },
    },

    ...spec.dependsOn.map((dep, index) => ({
      id: `dep-${index}`,
      data: { label: dep },
      position: { x: 800, y: 300 + index * 100 },
      style: {
        background: "#ADD8E6",
        border: "1px solid #4682B4",
        borderRadius: "5px",
        padding: "10px",
      },
    })),

    ...spec.apiConsumedBy.map((api, index) => ({
      id: `api-${index}`,
      data: { label: api },
      position: { x: 100, y: 300 + index * 100 },
      style: {
        background: "#ADD8E6",
        border: "1px solid #4682B4",
        borderRadius: "5px",
        padding: "10px",
      },
    })),

    {
      id: "owner-node",
      data: { label: spec.owner },
      position: { x: 400, y: 100 },
      style: {
        background: "#ADD8E6",
        border: "1px solid #4682B4",
        borderRadius: "5px",
        padding: "10px",
      },
    },

    {
      id: "system-node",
      data: { label: spec.system },
      position: { x: 400, y: 500 },
      style: {
        background: "#ADD8E6",
        border: "1px solid #4682B4",
        borderRadius: "5px",
        padding: "10px",
      },
    },
  ];

  const edges = [
    ...spec.dependsOn.map((dep, index) => ({
      id: `e1-${index}`,
      source: "1",
      target: `dep-${index}`,
      animated: true,
      label: "dependsOn / dependencyOf",
    })),

    ...spec.apiConsumedBy.map((api, index) => ({
      id: `e2-${index}`,
      source: "1",
      target: `api-${index}`,
      animated: true,
      label: "consumesApi / apiConsumedBy"
    })),
    {
      id: "ownership-edge",
      source: "owner-node",
      target: "1",
      animated: true,
      label: "ownerOf / ownedBy",
    },
    {
      id: "system-edge",
      source: "1",
      target: "system-node",
      animated: true,
      label: "hasPart / partOf",
    },
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
    <NavBar />
    <div className="header">
      <div>
        <span className="component-type">Component — {spec.type}</span>
        <h1 className="component-name">{metadata.name}</h1>
      </div>
      <div className="metadata">
        <span className="owner">
          Owner: <span className="team-a">{spec.owner}</span>
        </span>
        <span
          className="lifecycle"
          style={{ marginLeft: "20px", marginTop: "20px" }}
        >
          Lifecycle: <span className="status">{spec.lifecycle}</span>
        </span>
      </div>
    </div>
    <Box sx={{ width: "100%" }} className="navigationBar">
      <Box sx={{ borderBottom: 1, borderColor: "divider",width: "100%" }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Overview" />
          <Tab label="CI/CD" />
          <Tab label="API" />
          <Tab label="DEPENDENCIES" />
          <Tab label="DOCS" />
          <Tab label="TODOS" />
        </Tabs>
      </Box>
    </Box>

    <div className="component-detail-container" >
      <div className="component-info">
      <Typography variant="h5" component="div" gutterBottom>
          Desription
        </Typography>
        <Typography variant="h6" color="textSecondary">
          {metadata.description}
        </Typography>

        <Grid2 container spacing={12} style={{ marginTop: 10 }}>
          <Grid2 item xs={6}>
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                Owner
              </Typography>
              <Typography variant="body2">{spec.owner}</Typography>
            </Box>
          </Grid2>

          <Grid2 item xs={6}>
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                Type
              </Typography>
              <Typography variant="body2">{spec.type}</Typography>
            </Box>
          </Grid2>

          <Grid2 item xs={6}>
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                Lifecycle
              </Typography>
              <Typography variant="body2">{spec.lifecycle}</Typography>
            </Box>
          </Grid2>

          <Grid2 item xs={6}>
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                System
              </Typography>
              <Typography variant="body2">{spec.system}</Typography>
            </Box>
          </Grid2>

          <Grid2 item xs={12}>
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                Tags
              </Typography>
              <Typography variant="body2">
                {metadata.tags.map((tag, index) => (
                  <span style={{ border: '1px solid #460074', borderRadius: '20px', padding: '5px 16px', marginRight: '3px', color: '#460074' }}>{tag}</span>
                ))}
              </Typography>
            </Box>
          </Grid2>

          <Grid2 item xs={12}>
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                Links
              </Typography>
              <Typography variant="body2">
                {metadata.links.map((link, index) => (
                  <div key={index}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#460074' }}>
                      {link.title} (Icon: {link.icon})
                    </a>
                  </div>
                ))}
              </Typography>
            </Box>
          </Grid2>
        </Grid2>
      </div>

      <div className="relations-container" style={{ width: "80%" }}>
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
    </div>
  </>
  );
};

export default ComponentDetail;
