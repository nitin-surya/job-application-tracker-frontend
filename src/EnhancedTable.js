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
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
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
  { id: "company", label: "Company", minWidth: "16.6%" },
  { id: "jobTitle", label: "Job Title", minWidth: "28.6%" },
  {
    id: "dateApplied",
    label: "Date Added",
    minWidth: "20.6%",
    align: "center",
    //format: (value) => value.toLocaleString("en-US"),
  },

   {
    id: "updatedBy",
    label: "Updated By",
    minWidth: "20.6%",
    align: "center",
    //format: (value) => value.toLocaleString("en-US"),
  },

  // {
  //   id: "status",
  //   label: "Status",
  //   minWidth: "12.6%",
  //   align: "center",
  //   //format: (value) => value.toLocaleString("en-US"),
  // },
  // {
  //   id: "dateLastUpdated",
  //   label: "Date Last Updated",
  //   minWidth: "12.6%",
  //   align: "center",
  // },
  { id: "edit", label: "", minWidth: "8.3", noLabel: true },
  { id: "delete", label: "", minWidth: "8.3%", noLabel: true },

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
  const [sortAsc, setSortAsc] = React.useState(false);
  const [sortDesc, setSortDesc] = React.useState(false);
  const [sortColumn, setSortColumn] = React.useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // add leading zero if needed
    const day = date.getUTCDate().toString().padStart(2, "0"); // add leading zero if needed
    const year = date.getUTCFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
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
    setSortColumn("");
    setSortAsc(false);
    setSortDesc(false);
    setRows(data);
  }, [props.data, props.search]);

  useEffect(() => {
    let data = props.data;
    if (props.search.length > 0) {
      data = searchArray(data, props.search);
      setPage(0);
    }
    setSortColumn("");
    setSortAsc(false);
    setSortDesc(false);
    setRows(data);
  }, [props.data, props.search]);

  const searchArray = (arr, searchString) => {
    const result = arr.filter((obj) =>
      Object.values(obj).some(
        (val) =>
          typeof val === "string" &&
          val.toLowerCase().includes(searchString.toLowerCase())
      )
    );
    return result;
  };
  const headerCellCLicked = (column) => {
    if (sortColumn !== column) {
      setSortColumn(column);
      setSortAsc(true);
      setSortDesc(false);
    } else {
      if (sortAsc) {
        setSortDesc(true);
        setSortAsc(false);
      } else if (sortDesc) {
        setSortColumn("");
        setSortDesc(false);
      }
    }
  };
  const handleSort = (data, property, sortType) => {
    if (property === "dateApplied") {
      data = data.sort((a, b) => {
        const dateA = new Date(a[property]);
        const dateB = new Date(b[property]);
        return sortType === "asc" ? dateA - dateB : dateB - dateA;
      });
    } else {
      data = data.sort((a, b) =>
        a[property].toLowerCase() > b[property].toLowerCase()
          ? sortType === "asc"
            ? 1
            : -1
          : sortType === "asc"
          ? -1
          : 1
      );
    }
    return data;
  };
  useEffect(() => {
    let data = [...rows];
    if (sortColumn) {
      let sort = sortAsc === true ? "asc" : "desc";
      data = handleSort(data, sortColumn, sort);
    } else {
      data = props.data;
    }
    setRows(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortColumn, sortAsc, sortDesc]);

  return (
    <Paper style={{ boxShadow: "0 10px 20px rgba(0,0,0,.2)" }}>
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
                    width: column.minWidth,
                    background: "green !important",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    column.id !== "edit" ? headerCellCLicked(column.id) : {}
                  }
                >
                  {column.label}
                  {column.noLabel !== true && (
                    <>
                      {sortColumn !== column.id ? (
                        <UnfoldMoreIcon
                          style={{ position: "absolute", cursor: "pointer" }}
                          onClick={() => {
                            setSortColumn(column.id);
                            setSortAsc(true);
                          }}
                        />
                      ) : sortColumn === column.id && sortAsc ? (
                        <ArrowDropDownIcon
                          style={{ position: "absolute", cursor: "pointer" }}
                          onClick={() => {
                            setSortAsc(false);
                            setSortDesc(true);
                          }}
                        />
                      ) : (
                        <ArrowDropUpIcon
                          style={{ position: "absolute", cursor: "pointer" }}
                          onClick={() => {
                            setSortDesc(false);
                            setSortColumn("");
                          }}
                        />
                      )}
                    </>
                  )}
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
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : ["dateApplied", "dateLastUpdated"].includes(
                              column.id
                            ) ? (
                            formatDate(value)
                          ) : column.id === "edit" ? (
                            <IconButton
                              // disabled
                              onClick={() => {
                                props.onRowClick(row);
                              }}
                              sx={{ color: "black" }}
                            >
                              <EditIcon />
                            </IconButton>
                          ) : column.id === "delete" ? (
                            <IconButton
                              // disabled
                              onClick={() => {
                                props.onDeleteClick(row);
                              }}
                              sx={{ color: "red" }}
                            >
                              <DeleteOutlineIcon />
                            </IconButton>
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
