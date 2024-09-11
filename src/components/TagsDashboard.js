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
  Typography,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";

const TagsDashboard = () => {
  const [configsData, setConfigsData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/configs")
      .then((response) => response.json())
      .then((data) => setConfigsData(data))
      .catch((error) => console.error("Error fetching config data:", error));
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!configsData) {
    return <div>Loading...</div>;
  }

  const columns = [
    "Component Name",
    "Description",
    "Tags",
    "Links",
    "Spec Details",
  ];

  console.log("configsData", configsData);

  return (
        <div className="table-container" style={{'marginLeft':'250px','oveflowY':'hidden'}}>
          <Typography variant="h4" component="h1" gutterBottom>
            Catalog
          </Typography>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                stickyHeader
                aria-label="sticky table"
              >
                <TableHead>
                  <TableRow>
                    {columns.map((column, index) => {
                      return (
                        <TableCell key={index} sx={{ borderColor: "#460074" }}>
                          <Typography
                            variant="overline"
                            align="center"
                            color="primary"
                          >
                            {column}
                          </Typography>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {configsData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((config, configIndex) => {
                      const { metadata, spec } = config;
                      const { tags, links } = metadata;

                      return (
                        <TableRow key={configIndex}>
                          <TableCell component="th" scope="row">
                            <Link
                              to={`/component/${metadata.name}`}
                              className="component-link"
                              style={{ color: "#460074" }}
                            >
                              {metadata.name}
                            </Link>
                          </TableCell>

                          <TableCell>{metadata.description}</TableCell>
                          <TableCell>
                            {tags.map((tag, index) => (
                              <span
                                style={{
                                  border: "1px solid #460074",
                                  borderRadius: "20px",
                                  padding: "5px 16px",
                                  marginRight: "3px",
                                  color: "#460074",
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </TableCell>
                          <TableCell>
                            {links.map((link, index) => (
                              <div key={index}>
                                <a
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ color: "#460074" }}
                                >
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
                            <strong>Depends On:</strong>{" "}
                            {spec.dependsOn.join(", ")}
                            <br />
                            <strong>API Consumed By:</strong>{" "}
                            {spec.apiConsumedBy.join(", ")}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={configsData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
  );
};

export default TagsDashboard;
