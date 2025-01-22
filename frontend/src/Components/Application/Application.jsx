import React, { useEffect, useState } from "react";
import "./application.css";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteApplication,
  getApplicationList,
  postApplicationForm,
  updateApplication,
} from "./applicationSaga";

import { getappcategoriesList } from "../CategoryApplication/categoryApplicationSaga";
import { FormControl, InputLabel, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const Application = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState(null);
  const [applicationToEdit, setApplicationToEdit] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setApplicationToEdit(null);
  };

  const dispatch = useDispatch();
  const { applications } = useSelector((state) => state.application);
  const { appcategories } = useSelector((state) => state.appcategorie);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryApp: {},
  });
  console.log({ applications });

  useEffect(() => {
    if (!applications) {
      dispatch(getApplicationList());
    }
    if (!appcategories) {
      dispatch(getappcategoriesList());
    }
  }, [applications, appcategories, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postApplicationForm({ ...formData }));
    setFormData({ name: "", description: "", categoryApp: {} });
    handleClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleOpenDeleteModal = (id) => {
    setApplicationToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = () => {
    dispatch(deleteApplication(applicationToDelete));
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (id) => {
    const application = applications.find((app) => app.id === id);

    if (application) {
      setApplicationToEdit(application);
      setIsEditModalOpen(true);
    }
  };

  const handleEditApplication = () => {
    dispatch(updateApplication(applicationToEdit));
    setIsEditModalOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Application Name", width: 150 },
    {
      field: "description",
      headerName: "Application Description",
      width: 600,
    },
    {
      field: "categoryApp",
      headerName: "Category Name",
      width: 150,
      renderCell: (params) => <div>{params.row.categoryApp?.name}</div>,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <div>
          <DeleteIcon
            color="warning"
            style={{ cursor: "pointer", marginRight: 8 }}
            onClick={() => handleOpenDeleteModal(params.row.id)}
            data-testid="DeleteIcon"
          />
          <Modal
            open={isDeleteModalOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="modal-box-application">
              <Card>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 1,
                  }}
                >
                  <IconButton
                    onClick={handleCloseDeleteModal}
                    size="large"
                    aria-label="close modal"
                    color="inherit"
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                </Box>

                <CardContent>
                  <Typography>
                    Are you sure you want to delete this application!
                  </Typography>

                  <Button
                    onClick={handleDeleteConfirmed}
                    type="submit"
                    className="confirmer-button"
                    variant="contained"
                    color="success"
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={handleCloseDeleteModal}
                    className="confirmer-button"
                    variant="contained"
                    color="error"
                    sx={{ ml: 2 }}
                  >
                    No
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Modal>

          <EditIcon
            color="primary"
            style={{ cursor: "pointer" }}
            onClick={() => handleEdit(params.row.id)}
            data-testid="EditIcon"
          />
          <Modal open={isEditModalOpen} onClose={handleCloseEditModal}>
            <Box className="modal-box-application">
              <Card>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 1,
                  }}
                >
                  <h2>Edit Application</h2>
                  <IconButton
                    onClick={handleCloseEditModal}
                    size="large"
                    color="inherit"
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                </Box>

                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      label="Application Name"
                      id="name"
                      value={applicationToEdit?.name}
                      onChange={(event) => {
                        setApplicationToEdit({
                          ...applicationToEdit,
                          name: event.target.value,
                        });
                      }}
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="Application Description"
                      id="description"
                      value={applicationToEdit?.description}
                      onChange={(event) => {
                        setApplicationToEdit({
                          ...applicationToEdit,
                          description: event.target.value,
                        });
                      }}
                      multiline
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <FormControl fullWidth sx={{ m: 1, width: "35ch" }}>
                      <InputLabel id="edit-catFegory-app-select-label">
                        Category App
                      </InputLabel>
                      <Select
                        labelId="edit-category-app-select-label"
                        label="Category App"
                        placeholder="Category App"
                        id="categoryApp"
                        value={applicationToEdit?.categoryApp?.id}
                        renderValue={(selected) => {
                          if (selected)
                            return appcategories.find(
                              (elt) =>
                                elt.id === applicationToEdit.categoryApp.id
                            ).name;
                        }}
                        onChange={(event) => {
                          setApplicationToEdit({
                            ...applicationToEdit,
                            categoryApp: appcategories.find(
                              (elt) => elt.id === event.target.value
                            ),
                          });
                        }}
                      >
                        {appcategories?.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button
                      onClick={handleCloseEditModal}
                      className="confirmer-button"
                      variant="contained"
                      color="error"
                      sx={{ ml: 2 }}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="confirmer-button"
                      variant="contained"
                      color="success"
                      onClick={handleEditApplication}
                    >
                      Confirm
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Box>
          </Modal>
        </div>
      ),
    },
  ];

  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap" }}
      className="custom-application-box"
    >
      <Card variant="outlined" className="custom-application-card">
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 className="h2-style">List of Applications</h2>
            <Button
              variant="contained"
              onClick={handleOpen}
              className="add-button"
            >
              Add Application
            </Button>
          </Box>
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="modal-box-application">
              <Card>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 1,
                  }}
                >
                  <h2>Add Application</h2>
                  <IconButton
                    onClick={handleClose}
                    size="large"
                    color="inherit"
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                </Box>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      label="Application Name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="Application Description"
                      id="description"
                      value={formData.description}
                      onChange={handleChange}
                      multiline
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <FormControl fullWidth sx={{ m: 1, width: "35ch" }}>
                      <InputLabel id="add-catFegory-app-select-label">
                        Category App
                      </InputLabel>
                      <Select
                        labelId="add-category-app-select-label"
                        label="Category App"
                        placeholder="Category App"
                        id="categoryApp"
                        value={formData.categoryApp?.id}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            categoryApp: appcategories.find(
                              (elt) => elt.id === event.target.value
                            ),
                          })
                        }
                      >
                        {appcategories?.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button
                      onClick={handleClose}
                      className="confirmer-button"
                      variant="contained"
                      color="error"
                      sx={{ ml: 2 }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="confirmer-button"
                      variant="contained"
                      color="success"
                    >
                      Add Application
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Box>
          </Modal>
          <Box
            sx={{
              height: 500,
              width: "100%",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            <DataGrid
              rows={applications || []}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default Application;
