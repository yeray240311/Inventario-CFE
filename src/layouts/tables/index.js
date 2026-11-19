import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

const responsables = ["Persona Uno", "Persona Dos", "Persona Tres", "Persona Cuatro"];
const estados = ["En uso", "En mantenimiento", "En almacén", "Dado de baja"];
const colores = {
  "En uso": "success",
  "En mantenimiento": "warning",
  "En almacén": "info",
  "Dado de baja": "error",
};

const inicial = [
  {
    marca: "HP",
    modelo: "ProDesk 400 G7",
    serie: "MXL0000001",
    ubicacion: "Oficina TIC",
    estado: "En uso",
    responsable: "Persona Uno",
  },
  {
    marca: "Dell",
    modelo: "Latitude 5420",
    serie: "DL0000002",
    ubicacion: "Administración",
    estado: "En uso",
    responsable: "Persona Dos",
  },
  {
    marca: "Lenovo",
    modelo: "ThinkPad L14",
    serie: "LN0000003",
    ubicacion: "Medición",
    estado: "En mantenimiento",
    responsable: "Persona Tres",
  },
  {
    marca: "Cisco",
    modelo: "Catalyst 2960",
    serie: "CS0000004",
    ubicacion: "Site de red",
    estado: "En uso",
    responsable: "Persona Cuatro",
  },
];

const vacio = {
  marca: "",
  modelo: "",
  serie: "",
  ubicacion: "",
  estado: "En uso",
  responsable: responsables[0],
};

function Activos() {
  const [activos, setActivos] = useState(inicial);
  const [abierto, setAbierto] = useState(false);
  const [form, setForm] = useState(vacio);
  const [error, setError] = useState("");

  const cambiar = (campo) => (e) => setForm({ ...form, [campo]: e.target.value });

  const cerrar = () => {
    setAbierto(false);
    setForm(vacio);
    setError("");
  };

  const guardar = () => {
    if (!form.marca || !form.modelo || !form.serie || !form.ubicacion) {
      setError("Llena marca, modelo, número de serie y ubicación");
      return;
    }
    if (activos.some((a) => a.serie.toLowerCase() === form.serie.trim().toLowerCase())) {
      setError("Ya existe un activo con ese número de serie");
      return;
    }
    setActivos([...activos, { ...form, serie: form.serie.trim() }]);
    cerrar();
  };

  const columns = [
    { Header: "marca", accessor: "marca", align: "left" },
    { Header: "modelo", accessor: "modelo", align: "left" },
    { Header: "no. serie", accessor: "serie", align: "left" },
    { Header: "ubicación", accessor: "ubicacion", align: "left" },
    { Header: "estado", accessor: "estadoTag", align: "center" },
    { Header: "responsable", accessor: "responsable", align: "left" },
  ];

  const rows = activos.map((a) => ({
    ...a,
    estadoTag: (
      <MDBadge badgeContent={a.estado} color={colores[a.estado]} variant="gradient" size="sm" />
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Inventario de activos
                </MDTypography>
                <MDButton
                  variant="contained"
                  color="white"
                  size="small"
                  onClick={() => setAbierto(true)}
                >
                  Agregar activo
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <Dialog open={abierto} onClose={cerrar} fullWidth maxWidth="xs">
        <DialogTitle>Agregar activo</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Marca"
            value={form.marca}
            onChange={cambiar("marca")}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Modelo"
            value={form.modelo}
            onChange={cambiar("modelo")}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Número de serie"
            value={form.serie}
            onChange={cambiar("serie")}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Ubicación"
            value={form.ubicacion}
            onChange={cambiar("ubicacion")}
          />
          <TextField
            select
            fullWidth
            margin="dense"
            label="Estado"
            value={form.estado}
            onChange={cambiar("estado")}
            SelectProps={{ native: true }}
          >
            {estados.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            margin="dense"
            label="Responsable"
            value={form.responsable}
            onChange={cambiar("responsable")}
            SelectProps={{ native: true }}
          >
            {responsables.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </TextField>
          {error && (
            <MDTypography variant="caption" color="error">
              {error}
            </MDTypography>
          )}
        </DialogContent>
        <DialogActions>
          <MDButton color="secondary" onClick={cerrar}>
            Cancelar
          </MDButton>
          <MDButton color="info" onClick={guardar}>
            Guardar
          </MDButton>
        </DialogActions>
      </Dialog>
      <Footer />
    </DashboardLayout>
  );
}

export default Activos;
