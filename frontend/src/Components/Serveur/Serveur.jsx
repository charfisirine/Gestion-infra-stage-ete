import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import "./serveur.css";
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
  deleteServeur,
  getServeursList,
  postServeurForm,
  updateServeur,
} from "./serveurSaga";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { getSousReseauxList } from "../SousReseau/sousReseauSaga";
import { getCategoryServeursList } from "../CategoryServeur/categoryServeurSaga";
import { getClustersList } from "../Cluster/clusterSaga";

const Serveur = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [serveurToDelete, setServeurToDelete] = useState(null);
  const [serveurToEdit, setServeurToEdit] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setServeurToEdit(null);
  };

  const dispatch = useDispatch();
  const { serveurs } = useSelector((state) => state.serveur);
  const { clusters } = useSelector((state) => state.cluster);
  const { categoryServeurs } = useSelector((state) => state.categoryServeur);
  const { sousReseaux } = useSelector((state) => state.sousReseau);

  const [formData, setFormData] = useState({
    hostName: "",
    addressIp: "",
    status: "",
    specification: "",
    serverCategoryId: null,
    clusterId: null,
    subnetId: null,
  });

  useEffect(() => {
    if (!serveurs) {
      dispatch(getServeursList());
    }
  }, [serveurs, dispatch]);

  useEffect(() => {
    if (!sousReseaux) {
      dispatch(getSousReseauxList());
    }
  }, [sousReseaux, dispatch]);

  useEffect(() => {
    if (!categoryServeurs) {
      dispatch(getCategoryServeursList());
    }
  }, [categoryServeurs, dispatch]);

  useEffect(() => {
    if (!clusters) {
      dispatch(getClustersList());
    }
  }, [clusters, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postServeurForm({ ...formData }));
    setFormData({
      hostName: "",
      addressIp: "",
      status: "",
      specification: "",
      serverCategoryId: null,
      clusterId: null,
      subnetId: null,
    });
    handleClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleOpenDeleteModal = (id) => {
    setServeurToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = () => {
    dispatch(deleteServeur(serveurToDelete));
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (id) => {
    const serveur = serveurs.find((serveur) => serveur.id === id);
    if (serveur) {
      setServeurToEdit(serveur);
      setIsEditModalOpen(true);
    }
  };

  const handleEditServeur = () => {
    dispatch(updateServeur(serveurToEdit));
    setIsEditModalOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "hostName", headerName: "Host Name", width: 150 },
    { field: "addressIp", headerName: "Address IP", width: 150 },
    { field: "status", headerName: "Status", width: 100 },
    { field: "specification", headerName: "Specification", width: 200 },
    {
      field: "serverCategoryId",
      headerName: "Category Server ID",
      width: 150,
      renderCell: (params) => (
        <div>
          {
            categoryServeurs.find(
              (item) => item.id === params.row.serverCategoryId
            ).name
          }
        </div>
      ),
    },
    {
      field: "clusterId",
      headerName: "Cluster ID",
      width: 150,
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
      field: "subnetId",
      headerName: "Subnet ID",
      width: 150,
      renderCell: (params) => (
        <div>
          {
            sousReseaux.find((item) => item.id === params.row.subnetId)
              .cidrNotation
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
        </div>
      ),
    },
  ];
  console.log({ serveurToEdit });

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
            <h2 className="h2-style">List of Servers</h2>
            <Button
              variant="contained"
              onClick={handleOpen}
              className="add-button"
            >
              Add Server
            </Button>
          </Box>

          {/* affichage du tableau */}
          <DataGrid
            rows={serveurs}
            columns={columns}
            autoHeight
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Box>
      </Card>

      {/* modal pour ajouter serveur */}
      <Modal open={open}>
        <Box className="modal-box-Serveur">
          <Card>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 1,
              }}
            >
              <h2>Add Server</h2>
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
                  label="Host Name"
                  id="hostName"
                  value={formData.hostName}
                  onChange={handleChange}
                  sx={{ m: 1, width: "35ch" }}
                />
                <TextField
                  label="Address IP"
                  id="addressIp"
                  value={formData.addressIp}
                  onChange={handleChange}
                  sx={{ m: 1, width: "35ch" }}
                />
                <TextField
                  label="Status"
                  id="status"
                  value={formData.status}
                  onChange={handleChange}
                  sx={{ m: 1, width: "35ch" }}
                />
                <TextField
                  label="Specification"
                  id="specification"
                  value={formData.specification}
                  onChange={handleChange}
                  sx={{ m: 1, width: "35ch" }}
                />

                <FormControl fullWidth sx={{ m: 1, width: "35ch" }}>
                  <InputLabel id="add-category-server-select-label">
                    Category Server Name
                  </InputLabel>
                  <Select
                    labelId="add-category-server-select-label"
                    id="serverCategoryId"
                    value={formData.serverCategoryId}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        serverCategoryId: event.target.value,
                      })
                    }
                    renderValue={(selected) => {
                      if (selected)
                        return categoryServeurs.find(
                          (elt) => elt.id === formData.serverCategoryId
                        ).name;
                    }}
                  >
                    {categoryServeurs?.map((serverCategory) => (
                      <MenuItem
                        key={serverCategory.id}
                        value={serverCategory.id}
                      >
                        {serverCategory.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ m: 1, width: "35ch" }}>
                  <InputLabel id="add-cluster-select-label">
                    Cluster Name
                  </InputLabel>
                  <Select
                    labelId="add-cluster-select-label"
                    id="clusterId"
                    value={formData.clusterId}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        clusterId: event.target.value,
                      })
                    }
                    renderValue={(selected) => {
                      if (selected)
                        return clusters.find(
                          (elt) => elt.id === formData.clusterId
                        ).designation;
                    }}
                  >
                    {clusters?.map((cluster) => (
                      <MenuItem key={cluster.id} value={cluster.id}>
                        {cluster.designation}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ m: 1, width: "35ch" }}>
                  <InputLabel id="add-cluster-select-label">
                    Subnet's CIDR Notation
                  </InputLabel>
                  <Select
                    labelId="add-Subnet-select-label"
                    id="subnetId"
                    value={formData.subnetId}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        subnetId: event.target.value,
                      })
                    }
                    renderValue={(selected) => {
                      if (selected)
                        return sousReseaux.find(
                          (elt) => elt.id === formData.subnetId
                        ).cidrNotation;
                    }}
                  >
                    {sousReseaux?.map((subnet) => (
                      <MenuItem key={subnet.id} value={subnet.id}>
                        {subnet.cidrNotation}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button type="submit" variant="contained" sx={{ m: 1 }}>
                  Add Server
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Modal>

      {/*  Modal por editer le serveur */}
      <Modal open={isEditModalOpen}>
        <Box className="modal-box-Serveur">
          <Card>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 1,
              }}
            >
              <h2>Edit Server</h2>
              <IconButton
                onClick={handleCloseEditModal}
                size="large"
                aria-label="close modal"
                color="inherit"
              >
                <CloseOutlinedIcon />
              </IconButton>
            </Box>
            <CardContent>
              <form onSubmit={handleEditServeur}>
                <TextField
                  label="Host Name"
                  id="hostName"
                  value={serveurToEdit?.hostName || ""}
                  onChange={(event) =>
                    setServeurToEdit({
                      ...serveurToEdit,
                      hostName: event.target.value,
                    })
                  }
                  sx={{ m: 1, width: "35ch" }}
                />
                <TextField
                  label="Address IP"
                  id="addressIp"
                  value={serveurToEdit?.addressIp || ""}
                  onChange={(event) =>
                    setServeurToEdit({
                      ...serveurToEdit,
                      addressIp: event.target.value,
                    })
                  }
                  sx={{ m: 1, width: "35ch" }}
                />
                <TextField
                  label="Status"
                  id="status"
                  value={serveurToEdit?.status || ""}
                  onChange={(event) =>
                    setServeurToEdit({
                      ...serveurToEdit,
                      status: event.target.value,
                    })
                  }
                  sx={{ m: 1, width: "35ch" }}
                />
                <TextField
                  label="Specification"
                  id="specification"
                  value={serveurToEdit?.specification || ""}
                  onChange={(event) =>
                    setServeurToEdit({
                      ...serveurToEdit,
                      specification: event.target.value,
                    })
                  }
                  sx={{ m: 1, width: "35ch" }}
                />
                <FormControl fullWidth sx={{ m: 1, width: "35ch" }}>
                  <InputLabel id="edit-category-server-select-label">
                    Server Category
                  </InputLabel>
                  <Select
                    labelId="edit-category-server-select-label"
                    id="serverCategoryId"
                    value={serveurToEdit?.serverCategoryId}
                    renderValue={(selected) => {
                      if (selected)
                        return categoryServeurs.find(
                          (elt) => elt.id === serveurToEdit?.serverCategoryId
                        ).name;
                    }}
                    label="Server Category"
                    placeholder="Server Category "
                    // backend tit3amar min hna
                    onChange={(event) =>
                      setServeurToEdit({
                        ...serveurToEdit,
                        serverCategoryId: event.target.value,
                      })
                    }
                  >
                    {categoryServeurs?.map((categoryServeur) => (
                      <MenuItem
                        key={categoryServeur.id}
                        // fil background tselecti id
                        value={categoryServeur.id}
                      >
                        {/* t'affichilli hna  */}
                        <em>{categoryServeur.name}</em>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ m: 1, width: "35ch" }}>
                  <InputLabel id="edit-cluster-select-label">
                    Cluster Name
                  </InputLabel>
                  <Select
                    labelId="edit-cluster-select-label"
                    id="clusterId"
                    value={serveurToEdit?.clusterId}
                    renderValue={(selected) => {
                      if (selected)
                        return clusters.find(
                          (elt) => elt.id === serveurToEdit?.clusterId
                        ).designation;
                    }}
                    label="Cluster Name"
                    placeholder="Cluster Name"
                    onChange={(event) =>
                      setServeurToEdit({
                        ...serveurToEdit,
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

                <FormControl fullWidth sx={{ m: 1, width: "35ch" }}>
                  <InputLabel id="edit-Subnet-cidr-Notation-select-label">
                    Subnet's CIDR Notation
                  </InputLabel>
                  <Select
                    labelId="edit-Subnet-cidr-Notation-select-label"
                    id="subnetId"
                    value={serveurToEdit?.subnetId}
                    renderValue={(selected) => {
                      if (selected)
                        return sousReseaux.find(
                          (elt) => elt.id === serveurToEdit?.subnetId
                        ).cidrNotation;
                    }}
                    label=" Subnet's CIDR Notation"
                    placeholder=" Subnet's CIDR Notation "
                    onChange={(event) =>
                      setServeurToEdit({
                        ...serveurToEdit,
                        subnetId: event.target.value,
                      })
                    }
                  >
                    {sousReseaux?.map((subnet) => (
                      <MenuItem key={subnet.id} value={subnet.id}>
                        <em>{subnet.cidrNotation}</em>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  className="confirmer-button"
                  variant="contained"
                  color="success"
                  onClick={handleEditServeur}
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

      {/*  Modal  pour supprimer le serveur */}
      <Modal open={isDeleteModalOpen}>
        <Box className="modal-box-Serveur">
          <Card>
            <CardContent>
              <Typography>
                Are you sure you want to delete this Reseau?
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
    </Box>
  );
};

export default Serveur;
