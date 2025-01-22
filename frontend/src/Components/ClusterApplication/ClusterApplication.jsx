import "./clusterApplication.css";
import React, { useEffect, useState } from "react";
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
  getClusterApplicationList,
  postClusterApplicationForm,
  deleteClusterApplication,
  updateClusterApplication,
} from "./clusterApplicationSaga";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { getApplicationList } from "../Application/applicationSaga";
import { getClustersList } from "../Cluster/clusterSaga";

const ClusterApplication = () => {
  const dispatch = useDispatch();

  // Ensure correct access to the state
  const { clusterApplications } = useSelector(
    (state) => state.clusterApplication
  );
  const { applications } = useSelector((state) => state.application);
  const { clusters } = useSelector((state) => state.cluster);
  const [open, setOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [clusterApplicationToEdit, setClusterApplicationToEdit] =
    useState(null);
  const [formData, setFormData] = useState({ status: "" });
  const [selectedClusterId, setSelectedClusterId] = useState(null);
  const [clusterToDelete, setClusterToDelete] = useState(null);

  useEffect(() => {
    if (!clusterApplications) {
      dispatch(getClusterApplicationList());
    }
  }, [dispatch, clusterApplications]);

  useEffect(() => {
    if (!clusters) {
      dispatch(getClustersList());
    }
  }, [clusters, dispatch]);

  useEffect(() => {
    if (!applications) {
      dispatch(getApplicationList());
    }
  }, [applications, dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({ status: "" });
    setSelectedClusterId(null);
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
    setClusterApplicationToEdit(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedClusterId) {
      dispatch(
        updateClusterApplication({ id: selectedClusterId, ...formData })
      );
    } else {
      dispatch(postClusterApplicationForm(formData));
    }
    handleClose();
  };

  const handleOpenDeleteModal = (id) => {
    setClusterToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = () => {
    dispatch(deleteClusterApplication(clusterToDelete));
    setIsDeleteModalOpen(false);
  };
  const handleEdit = (id) => {
    const clusterApplication = clusterApplications.find(
      (clusterApp) => clusterApp.id === id
    );
    if (clusterApplication) {
      setClusterApplicationToEdit(clusterApplication);
      setIsEditModalOpen(true);
    }
  };

  const handleEditSubmit = () => {
    dispatch(updateClusterApplication(clusterApplicationToEdit));
    setIsEditModalOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "status", headerName: "Status", width: 200 },
    {
      field: "applicationId",
      headerName: "Application Name",
      width: 200,
      renderCell: (params) => (
        <div>
          {
            applications.find((item) => item.id === params.row.applicationId)
              .name
          }
        </div>
      ),
    },
    {
      field: "clusterId",
      headerName: "Cluster Name",
      width: 200,
      renderCell: (params) => (
        <div>
          {
            clusters.find((item) => item.id === params.row.clusterId)
              .designation
          }
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
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
            onClose={() => setIsDeleteModalOpen(false)}
          >
            <Box className="modal-box-Cluster">
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
                    onClick={() => setIsDeleteModalOpen(false)}
                    size="large"
                    aria-label="close modal"
                    color="inherit"
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                </Box>
                <CardContent>
                  <Typography>
                    Are you sure you want to delete this cluster?
                  </Typography>
                  <Button
                    onClick={handleDeleteConfirmed}
                    className="confirmer-button"
                    variant="contained"
                    color="success"
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={() => setIsDeleteModalOpen(false)}
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
        </div>
      ),
    },
  ];

  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap" }}
      className="custom-Cluster-box"
    >
      <Card variant="outlined" className="custom-Cluster-card">
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 className="h2-style">List of Cluster Application</h2>
            <Button
              variant="contained"
              onClick={handleOpen}
              className="add-button"
            >
              Add Cluster Application
            </Button>
          </Box>
          <Modal open={open} onClose={handleClose}>
            <Box className="modal-box-Cluster">
              <Card>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 1,
                  }}
                >
                  <h2>Add Cluster Application</h2>
                  <IconButton
                    onClick={handleClose}
                    size="large"
                    aria-label="close modal"
                    color="inherit"
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                </Box>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      label="Cluster Status"
                      id="status"
                      sx={{ m: 1, width: "35ch" }}
                      value={formData.status}
                      onChange={handleChange}
                    />
                    <FormControl fullWidth sx={{ m: 1, width: "35ch" }}>
                      <InputLabel id="add-cluster-app-select-label">
                        Application Name
                      </InputLabel>
                      <Select
                        labelId="add-cluster-app-select-label"
                        id="applicationId"
                        value={formData.applicationId}
                        renderValue={(selected) => {
                          if (selected)
                            return applications.find(
                              (elt) => elt.id === formData.applicationId
                            ).name;
                        }}
                        label="Application Name"
                        placeholder="Application Name"
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            applicationId: event.target.value,
                          })
                        }
                      >
                        {applications?.map((application) => (
                          <MenuItem key={application.id} value={application.id}>
                            <em>{application.name}</em>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ m: 1, width: "35ch" }}>
                      <InputLabel id="add-cluster-app-cluster-select-label">
                        Cluster Name
                      </InputLabel>
                      <Select
                        labelId="add-cluster-app-cluster-select-label"
                        id="clusterId"
                        value={formData.clusterId}
                        renderValue={(selected) => {
                          if (selected)
                            return clusters.find(
                              (elt) => elt.id === formData.clusterId
                            ).designation;
                        }}
                        label="Cluster Name"
                        placeholder="Cluster Name"
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            clusterId: event.target.value,
                          })
                        }
                      >
                        {clusters?.map((cluster) => (
                          <MenuItem key={cluster.id} value={cluster.id}>
                            <em>{cluster.designation}</em>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button
                      type="submit"
                      className="confirmer-button"
                      variant="contained"
                      color="success"
                    >
                      Confirm
                    </Button>
                    <Button
                      onClick={handleClose}
                      className="confirmer-button"
                      variant="contained"
                      color="error"
                      sx={{ ml: 2 }}
                    >
                      Cancel
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Box>
          </Modal>
          {/* edit modal */}

          <Modal open={isEditModalOpen} onClose={handleCloseEdit}>
            <Box className="modal-box-Cluster">
              <Card>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 1,
                  }}
                >
                  <h2>Edit Cluster Application</h2>
                  <IconButton
                    onClick={handleCloseEdit}
                    size="large"
                    aria-label="close modal"
                    color="inherit"
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                </Box>
                <CardContent>
                  <form onSubmit={handleEditSubmit}>
                    <TextField
                      label="Cluster Status"
                      id="status"
                      sx={{ m: 1, width: "35ch" }}
                      value={clusterApplicationToEdit?.status}
                      onChange={(event) =>
                        setClusterApplicationToEdit({
                          ...clusterApplicationToEdit,
                          status: event.target.value,
                        })
                      }
                    />
                    <FormControl fullWidth sx={{ m: 1, width: "35ch" }}>
                      <InputLabel id="add-cluster-app-select-label">
                        Application Name
                      </InputLabel>
                      <Select
                        labelId="add-cluster-app-select-label"
                        id="applicationId"
                        value={clusterApplicationToEdit?.applicationId}
                        renderValue={(selected) => {
                          if (selected)
                            return applications.find(
                              (elt) => elt.id === clusterApplicationToEdit.applicationId
                            ).name;
                        }}
                        label="Application Name"
                        placeholder="Application Name"
                        onChange={(event) =>
                          setClusterApplicationToEdit({
                            ...clusterApplicationToEdit,
                            applicationId: event.target.value,
                          })
                        }
                      >
                        {applications?.map((application) => (
                          <MenuItem key={application.id} value={application.id}>
                            <em>{application.name}</em>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ m: 1, width: "35ch"}}>
                      <InputLabel id="add-cluster-app-cluster-select-label">
                        Cluster Name
                      </InputLabel>
                      <Select
                        labelId="add-cluster-app-cluster-select-label"
                        id="clusterId"
                        value={clusterApplicationToEdit?.clusterId}
                        renderValue={(selected) => {
                          if (selected)
                            return clusters.find(
                              (elt) => elt.id === clusterApplicationToEdit.clusterId
                            ).designation;
                        }}
                        label="Cluster Name"
                        placeholder="Cluster Name"
                        onChange={(event) =>
                          setClusterApplicationToEdit({
                            ...clusterApplicationToEdit,
                            clusterId: event.target.value,
                          })
                        }
                      >
                        {clusters?.map((cluster) => (
                          <MenuItem key={cluster.id} value={cluster.id}>
                            <em>{cluster.designation}</em>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button
                      type="submit"
                      className="confirmer-button"
                      variant="contained"
                      color="success"
                    >
                      Confirm
                    </Button>
                    <Button
                      onClick={handleCloseEdit}
                      className="confirmer-button"
                      variant="contained"
                      color="error"
                      sx={{ ml: 2 }}
                    >
                      Cancel
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Box>
          </Modal>
        </Box>
        <div className="div-Cluster">
          <DataGrid
            className="datagrid-style"
            rows={clusterApplications}
            columns={columns}
            sx={{
              "& .MuiDataGrid-row:nth-of-type(odd)": {
                backgroundColor: "#efeeff",
              },
              "& .MuiDataGrid-row:nth-of-type(even)": {
                backgroundColor: "#F8F8FF",
              },
              "& .MuiDataGrid-cell:focus": {
                outline: "none",
              },
            }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
          />
        </div>
      </Card>
    </Box>
  );
};

export default ClusterApplication;
