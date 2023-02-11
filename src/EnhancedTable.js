import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "company", label: "Company", minWidth: 170 },
  { id: "jobTitle", label: "Job Title", minWidth: 100 },
  {
    id: "dateApplied",
    label: "Date Applied",
    minWidth: 170,
    align: "right",
    //format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "right",
    //format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "link",
    label: "Link",
    minWidth: 170,
    align: "right",
    //format: (value) => value.toFixed(2),
  },
];

function createData(company, jobTitle, dateApplied, status) {
  const link = dateApplied + status;
  return { company, jobTitle, dateApplied, status, link };
}

export default function EnhancedTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = props.data;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.jobTitle}
                    onClick={() => {
                      props.onRowClick(row);
                    }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : column.id === "dateApplied" ? (
                            formatDate(value)
                          ) : column.id === "link" ? (
                            <a href={value} target="_blank">
                              {value}
                            </a>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            {rows.length < 1 && "NO DATA"}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
