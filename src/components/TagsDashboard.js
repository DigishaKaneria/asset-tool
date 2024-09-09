import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
// import "./TagsDashboard.css";
import NavBar from "./NavBar";

const TagsDashboard = () => {
  const [configsData, setConfigsData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/configs")
      .then((response) => response.json())
      .then((data) => setConfigsData(data))
      .catch((error) => console.error("Error fetching config data:", error));
  }, []);

  if (!configsData) {
    return <div>Loading...</div>;
  }

  const columns = [
    'Component Name',
    'Description',
    'Tags',
    'Links',
    'Spec Details'
]

console.log('configsData', configsData)

  return (
    <div className="table-container">
      <NavBar />
      <Typography variant="h4" component="h1" gutterBottom>
        Catalog
      </Typography>

<TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small">
                <TableHead>
                    <TableRow>
                        {/* <TableCell key={'num'} sx={{ borderColor: "#460074" }}>
                            <Typography variant="overline" align="center" color="primary">
                                #
                            </Typography>
                        </TableCell> */}
                        {columns.map((column, index) => {
                            return (
                                <TableCell key={index} sx={{ borderColor: "#460074" }}>
                                    <Typography variant="overline" align="center" color="primary">
                                        {column}
                                    </Typography>
                                </TableCell>
                            );
                        })}
                        {/* <TableCell key={'status'} sx={{ borderColor: "#460074" }}>
                            <Typography variant="overline" align="center" color="primary">
                                ID
                            </Typography>
                        </TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                {configsData.map((config, configIndex) => {
              const { metadata, spec } = config;
              const { tags, links } = metadata;

              return (
                <TableRow key={configIndex}>
                   {/* <TableCell key={'status'} sx={{ borderColor: "#460074" }}>
                            <Typography variant="overline" align="center" color="primary">
                                ID
                            </Typography>
                        </TableCell> */}
                  <TableCell component="th" scope="row">
                    <Link to={`/component/${metadata.name}`} className="component-link" style={{color: '#460074'}}>
                      {metadata.name}
                    </Link>
                  </TableCell>
                  
                  <TableCell>{metadata.description}</TableCell>
                  <TableCell>
                    {tags.map((tag, index) => (
                      // <Button
                      //   key={index}
                      //   variant="contained"
                      //   color="primary"
                      //   style={{ margin: "5px" }}
                      // >
                      //   {tag}
                      // </Button>
                      <span style={{border: '1px solid #460074', borderRadius: '20px', padding: '5px 16px', marginRight: '3px', color: '#460074'}}>{tag}</span>
                    ))}
                  </TableCell>
                  <TableCell>
                    {links.map((link, index) => (
                      <div key={index}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" style={{color: '#460074'}}>
                          {link.title} (Icon: {link.icon})
                        </a>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    <strong>Type:</strong> {spec.type}
                    <br />
                    <strong>Lifecycle:</strong> {spec.lifecycle}
                    <br />
                    <strong>Owner:</strong> {spec.owner}
                    <br />
                    <strong>System:</strong> {spec.system}
                    <br />
                    <strong>Depends On:</strong> {spec.dependsOn.join(", ")}
                    <br />
                    <strong>API Consumed By:</strong> {spec.apiConsumedBy.join(", ")}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
            </Table>
        </TableContainer>
    </div>
  );
};

export default TagsDashboard;
