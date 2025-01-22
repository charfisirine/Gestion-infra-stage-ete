import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import "../../Components/Reseau/reseau.css";
import Typography from "@mui/material/Typography";
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
  deleteSousReseau,
  getSousReseauxList,
  postSousReseauForm,
  updateSousReseau,
} from "./sousReseauSaga"; // Assurez-vous que ces actions sont définies dans votre saga
import { getReseauxList } from "../Reseau/reseauSaga";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SousReseau = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [sousReseauToDelete, setSousReseauToDelete] = useState(null);
  const [sousReseauToEdit, setSousReseauToEdit] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSousReseauToEdit(null);
  };

  const dispatch = useDispatch();
  const { sousReseaux } = useSelector((state) => state.sousReseau);
  const { reseaux } = useSelector((state) => state.reseau);
  const [formData, setFormData] = useState({
    cidrNotation: "",
    subnetMask: "",
    ipRange: "",
    gateway: "",
    networkId: null,
  });

  useEffect(() => {
    if (!sousReseaux) {
      // sousReseaux === null ou false
      dispatch(getSousReseauxList());
    }
  }, [sousReseaux, dispatch]);
  useEffect(() => {
    if (!reseaux) {
      // reseaux === null ou false
      dispatch(getReseauxList());
    }
  }, [reseaux, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postSousReseauForm({ ...formData }));
    //ba3d mab3thht lil saga n7ib nraja3hom fer8in
    setFormData({
      cidrNotation: "",
      subnetMask: "",
      ipRange: "",
      gateway: "",
      networkId: null,
    });
    handleClose();
  };

  const handleEditSite = () => {
    dispatch(updateSousReseau(sousReseauToEdit)); // Call update action
    setIsEditModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleOpenDeleteModal = (id) => {
    setSousReseauToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = () => {
    dispatch(deleteSousReseau(sousReseauToDelete));
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (id) => {
    const sousReseau = sousReseaux.find((sousReseau) => sousReseau.id === id);
    if (sousReseau) {
      setSousReseauToEdit(sousReseau);
      setIsEditModalOpen(true);
    }
  };

  const handleEditSousReseau = () => {
    dispatch(updateSousReseau(sousReseauToEdit));
    setIsEditModalOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "cidrNotation", headerName: "CIDR Notation", width: 150 },
    { field: "subnetMask", headerName: "Subnet Mask", width: 150 },
    { field: "ipRange", headerName: "IP Range", width: 150 },
    { field: "gateway", headerName: "Gateway", width: 150 },
    {
      field: "network",
      headerName: "Network Name",
      width: 150,
      renderCell: (params) => (
        <div>
          {reseaux.find((item) => item.id === params.row.networkId).name}
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
          <Modal open={isDeleteModalOpen}>
            <Box className="modal-box-reseau">
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
                    Are you sure you want to delete this Sous Reseau?
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

          <EditIcon
            color="primary"
            style={{ cursor: "pointer" }}
            onClick={() => handleEdit(params.row.id)}
          />
          <Modal open={isEditModalOpen} onClose={handleCloseEditModal}>
            <Box className="modal-box-reseau">
              <Card>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 1,
                  }}
                >
                  <h2>Edit Sous Reseau</h2>
                  <IconButton
                    onClick={handleCloseEditModal}
                    size="large"
                    color="inherit"
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                </Box>
                <CardContent>
                  <form onSubmit={handleEditSite}>
                    <TextField
                      label="CIDR Notation"
                      id="cidrNotation"
                      value={sousReseauToEdit?.cidrNotation}
                      onChange={(event) =>
                        setSousReseauToEdit({
                          ...sousReseauToEdit,
                          cidrNotation: event.target.value,
                        })
                      }
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="Subnet Mask"
                      id="subnetMask"
                      value={sousReseauToEdit?.subnetMask}
                      onChange={(event) =>
                        setSousReseauToEdit({
                          ...sousReseauToEdit,
                          subnetMask: event.target.value,
                        })
                      }
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="IP Range"
                      id="ipRange"
                      value={sousReseauToEdit?.ipRange}
                      onChange={(event) =>
                        setSousReseauToEdit({
                          ...sousReseauToEdit,
                          ipRange: event.target.value,
                        })
                      }
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="Gateway"
                      id="gateway"
                      value={sousReseauToEdit?.gateway}
                      onChange={(event) =>
                        setSousReseauToEdit({
                          ...sousReseauToEdit,
                          gateway: event.target.value,
                        })
                      }
                      sx={{ m: 1, width: "35ch" }}
                    />

                    <FormControl fullWidth sx={{ m: 1, width: "35ch" }}>
                      <InputLabel id="edit-networkId-select">
                        Network Name
                      </InputLabel>
                      <Select
                        labelId="edit-networkId-select"
                        id="networkId"
                        value={sousReseauToEdit?.networkId}
                        renderValue={(selected) => {
                          if (selected)
                            return reseaux.find(
                              (elt) => elt.id === sousReseauToEdit?.networkId
                            ).name;
                        }}
                        label="Network"
                        placeholder="Network Name"
                        onChange={(event) =>
                          setSousReseauToEdit({
                            ...sousReseauToEdit,
                            networkId: event.target.value.id,
                          })
                        }
                      >
                        {reseaux?.map((network) => (
                          <MenuItem key={network.id} value={network}>
                            <em>{network.name}</em>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Button
                      onClick={handleEditSousReseau}
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
        </div>
      ),
    },
  ];

  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap" }}
      className="custom-Category-box"
    >
      <Card variant="outlined" className="custom-Category-card">
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
              paddingLeft: "2CH",
            }}
          >
            <h2 className="h2-style">Sous Réseaux</h2>
            <Button
              variant="contained"
              className="add-button"
              onClick={handleOpen}
            >
              Add New Sous Réseau
            </Button>

            <Modal open={open} onClose={handleClose}>
              <Box className="modal-box-reseau">
                <Card>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 1,
                    }}
                  >
                    <h2>Add New Sous Réseau</h2>
                    <IconButton
                      onClick={() => setOpen(false)}
                      size="large"
                      color="inherit"
                    >
                      <CloseOutlinedIcon />
                    </IconButton>
                  </Box>
                  <CardContent>
                    <form onSubmit={handleSubmit}>
                      <TextField
                        label="CIDR Notation"
                        id="cidrNotation"
                        value={formData.cidrNotation}
                        onChange={handleChange}
                        sx={{ m: 1, width: "35ch" }}
                      />
                      <TextField
                        label="Subnet Mask"
                        id="subnetMask"
                        value={formData.subnetMask}
                        onChange={handleChange}
                        sx={{ m: 1, width: "35ch" }}
                      />
                      <TextField
                        label="IP Range"
                        id="ipRange"
                        value={formData.ipRange}
                        onChange={handleChange}
                        sx={{ m: 1, width: "35ch" }}
                      />
                      <TextField
                        label="Gateway"
                        id="gateway"
                        value={formData.gateway}
                        onChange={handleChange}
                        sx={{ m: 1, width: "35ch" }}
                      />

                      <FormControl fullWidth sx={{ m: 1, width: "35ch" }}>
                        <InputLabel id="add-network-select-label">
                          Network Name
                        </InputLabel>
                        <Select
                          labelId="add-network-select-label"
                          id="networkId"
                          value={formData.networkId}
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              networkId: event.target.value,
                            })
                          }
                          renderValue={(selected) => {
                            if (selected)
                              return reseaux.find(
                                (elt) => elt.id === formData.networkId
                              ).name;
                          }}
                        >
                          {reseaux?.map((network) => (
                            <MenuItem key={network.id} value={network.id}>
                              {network.name}
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
          </Box>
          <div className="div-reseau">
            <DataGrid
              rows={sousReseaux || []}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        </Box>
      </Card>
    </Box>
  );
};

export default SousReseau;
