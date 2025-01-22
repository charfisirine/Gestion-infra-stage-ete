import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import "./serveurApplication.css";
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
  deleteServeurApplication,
  getServeurApplicationsList,
  postServeurApplicationForm,
  updateServeurApplication,
} from "./serveurApplicationSaga";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { getApplicationList } from "../Application/applicationSaga";
import { getServeursList } from "../Serveur/serveurSaga";

const ServeurApplication = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [serveurApplicationToDelete, setServeurApplicationToDelete] =
    useState(null);
  const [serveurApplicationToEdit, setServeurApplicationToEdit] =
    useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setServeurApplicationToEdit(null);
  };

  const dispatch = useDispatch();
  const { serveurApplications } = useSelector(
    (state) => state.serveurApplication
  );
  const { serveurs } = useSelector((state) => state.serveur);
  const { applications } = useSelector((state) => state.application);

  const [formData, setFormData] = useState({
    purpose: "",
    accessLink: "",
    serverId: null,
    applicationId: null,
  });

  useEffect(() => {
    if (!serveurApplications) {
      dispatch(getServeurApplicationsList());
    }
  }, [serveurApplications, dispatch]);

  useEffect(() => {
    if (!serveurs) {
      dispatch(getServeursList());
    }
  }, [serveurs, dispatch]);

  useEffect(() => {
    if (!applications) {
      dispatch(getApplicationList());
    }
  }, [applications, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postServeurApplicationForm({ ...formData }));
    setFormData({
      purpose: "",
      accessLink: "",
      serverId: null,
      applicationId: null,
    });
    handleClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleOpenDeleteModal = (id) => {
    setServeurApplicationToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = () => {
    dispatch(deleteServeurApplication(serveurApplicationToDelete));
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (id) => {
    const serveurApplication = serveurApplications.find(
      (item) => item.id === id
    );
    if (serveurApplication) {
      setServeurApplicationToEdit(serveurApplication);
      setIsEditModalOpen(true);
    }
  };

  const handleEditServeurApplication = () => {
    dispatch(updateServeurApplication(serveurApplicationToEdit));
    setIsEditModalOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "purpose", headerName: "Purpose", width: 150 },
    {
      field: "accessLink",
      headerName: "Lien Acces",
      width: 200,
    },
    {
      field: "serverId",
      headerName: "Serveur ID",
      width: 150,

      renderCell: (params) => (
        <div>
          {serveurs.find((item) => item.id === params.row.serverId).hostName}
        </div>
      ),
    },
    {
      field: "applicationId",
      headerName: "Application ID",
      width: 150,
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
          />

          <EditIcon
            color="primary"
            style={{ cursor: "pointer" }}
            onClick={() => handleEdit(params.row.id)}
          />

          {/* modal pour  ajouter un serveur application */}
          <Modal open={open}>
            <Box className="modal-box-ServeurApp">
              <Card>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 1,
                  }}
                >
                  <h2>Add New Serveur Application</h2>
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
                      label="Purpose"
                      id="purpose"
                      value={formData.purpose}
                      onChange={handleChange}
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="Lien Acces"
                      id="accessLink"
                      value={formData.accessLink}
                      onChange={handleChange}
                      sx={{ m: 1, width: "35ch" }}
                    />

                    <FormControl fullWidth sx={{ m: 1, width: "35ch" }}>
                      <InputLabel id="add-server-select-label">
                        Serveur
                      </InputLabel>
                      <Select
                        labelId="add-server-select-label"
                        id="serverId"
                        value={formData.serverId}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            serverId: event.target.value,
                          })
                        }
                        renderValue={(selected) => {
                          if (selected)
                            return serveurs.find(
                              (elt) => elt.id === formData.serverId
                            ).hostName;
                        }}
                      >
                        {serveurs?.map((server) => (
                          <MenuItem key={server.id} value={server.id}>
                            {server.hostName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ m: 1, width: "35ch" }}>
                      <InputLabel id="add-application-select-label">
                        Application
                      </InputLabel>
                      <Select
                        labelId="add-application-select-label"
                        id="applicationId"
                        value={formData.applicationId}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            applicationId: event.target.value,
                          })
                        }
                        renderValue={(selected) => {
                          if (selected)
                            return applications.find(
                              (elt) => elt.id === formData.applicationId
                            ).name;
                        }}
                      >
                        {applications?.map((application) => (
                          <MenuItem key={application.id} value={application.id}>
                            {application.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Button
                      className="confirmer-button"
                      variant="contained"
                      color="success"
                      type="submit"
                    >
                      Add
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

          {/* modal pour editier le serveur application */}

          <Modal open={isEditModalOpen} onClose={handleCloseEditModal}>
            <Box className="modal-box-ServeurApp">
              <Card>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 1,
                  }}
                >
                  <h2>Edit Serveur Application</h2>
                  <IconButton
                    onClick={handleCloseEditModal}
                    size="large"
                    color="inherit"
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                </Box>
                <CardContent>
                  <form onSubmit={handleEditServeurApplication}>
                    <TextField
                      label="Purpose"
                      id="purpose"
                      value={serveurApplicationToEdit?.purpose}
                      onChange={(event) =>
                        setServeurApplicationToEdit({
                          ...serveurApplicationToEdit,
                          purpose: event.target.value,
                        })
                      }
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="Lien Acces"
                      id="accessLink"
                      value={serveurApplicationToEdit?.accessLink}
                      onChange={(event) =>
                        setServeurApplicationToEdit({
                          ...serveurApplicationToEdit,
                          accessLink: event.target.value,
                        })
                      }
                      sx={{ m: 1, width: "35ch" }}
                    />

                    <FormControl fullWidth sx={{ m: 1, width: "35ch" }}>
                      <InputLabel id="edit-server-select-label">
                        Server
                      </InputLabel>
                      <Select
                        labelId="edit-server-select-label"
                        id="serverId"
                        value={serveurApplicationToEdit?.serverId}
                        renderValue={(selected) => {
                          if (selected)
                            return serveurs.find(
                              (elt) =>
                                elt.id === serveurApplicationToEdit?.serverId
                            ).hostName;
                        }}
                        label="Server"
                        placeholder="Server "
                        // backend tit3amar min hna
                        onChange={(event) =>
                          setServeurApplicationToEdit({
                            ...serveurApplicationToEdit,
                            serverId: event.target.value,
                          })
                        }
                      >
                        {serveurs?.map((serveur) => (
                          <MenuItem
                            key={serveur.id}
                            // fil background tselecti id
                            value={serveur.id}
                          >
                            {/* t'affichilli hna  */}
                            <em>{serveur.hostName}</em>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>


                    <FormControl fullWidth sx={{ m: 1, width: "35ch" }}>
                      <InputLabel id="edit-application-select-label">
                        Application
                      </InputLabel>
                      <Select
                        labelId="edit-application-select-label"
                        id="applicationId"
                        value={serveurApplicationToEdit?.applicationId}
                        renderValue={(selected) => {
                          if (selected)
                            return applications.find(
                              (elt) =>
                                elt.id === serveurApplicationToEdit?.applicationId
                            ).name;
                        }}
                        label="application"
                        placeholder="application "
                        // backend tit3amar min hna
                        onChange={(event) =>
                          setServeurApplicationToEdit({
                            ...serveurApplicationToEdit,
                            applicationId: event.target.value,
                          })
                        }
                      >
                        {applications?.map((application) => (
                          <MenuItem
                            key={application.id}
                            // fil background tselecti id
                            value={application.id}
                          >
                            {/* t'affichilli hna  */}
                            <em>{application.name}</em>
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
                      onClick={handleCloseEditModal}
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

          {/* modal pour supprimer serveur APPLication */}
          <Modal open={isDeleteModalOpen}>
            <Box className="modal-box-ServeurApp">
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
                    Are you sure you want to delete this serveur application?
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
        </div>
      ),
    },
  ];

  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap" }}
      className="custom-Serveur-box"
    >
      <Card variant="outlined" className="custom-Serveur-card">
        <Box
          sx={{
            padding: "2CH",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 className="h2-style">List of Serveur Applications</h2>
            <Button
              variant="contained"
              onClick={handleOpen}
              className="add-button"
            >
              Add Serveur Application
            </Button>
          </Box>

          <div className="custom-ServeurApp-data-grid">
            <DataGrid
              rows={serveurApplications || []}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              autoHeight
            />
          </div>
        </Box>
      </Card>
    </Box>
  );
};

export default ServeurApplication;
