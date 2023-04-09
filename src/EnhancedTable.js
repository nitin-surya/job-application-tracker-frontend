import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const columns = [
  { id: "sno", label: "S.No", minWidth: 34 },
  { id: "company", label: "Company", minWidth: 85 },
  { id: "jobTitle", label: "Job Title", minWidth: 85 },
  {
    id: "dateApplied",
    label: "Date Applied",
    minWidth: 85,
    align: "left",
    //format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 85,
    align: "left",
    //format: (value) => value.toLocaleString("en-US"),
  },
  // {
  //   id: "link",
  //   label: "Link",
  //   minWidth: 85,
  //   align: "left",
  //   //format: (value) => value.toFixed(2),
  // },
];

export default function EnhancedTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState(props.data);

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

  useEffect(() => {
    let data = props.data;
    if (props.search.length > 0) {
      data = searchArray(data, props.search);
      setPage(0);
    }
    setRows(data);
  }, [props.data, props.search]);

  function searchArray(arr, searchString) {
    const result = arr.filter((obj) =>
      Object.values(obj).some(
        (val) =>
          typeof val === "string" &&
          val.toLowerCase().includes(searchString.toLowerCase())
      )
    );
    return result;
  }

  return (
    <Paper>
      <TableContainer
        sx={{
          marginTop: "15px",
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    background: "green !important",
                  }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <StyledTableRow
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
                          ) : column.id === "sno" ? (
                            page * rowsPerPage + (index + 1)
                          ) : column.id === "company" ? (
                            <a
                              href={row["link"]}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {value}
                            </a>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </StyledTableRow>
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
