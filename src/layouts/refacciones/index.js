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

const inicial = [
  {
    nombre: "Memoria RAM DDR4 8GB",
    categoria: "Memorias RAM",
    cantidad: 12,
    minimo: 5,
    ubicacion: "Almacén TIC",
  },
  {
    nombre: "Memoria RAM DDR4 16GB",
    categoria: "Memorias RAM",
    cantidad: 3,
    minimo: 4,
    ubicacion: "Almacén TIC",
  },
  {
    nombre: "Batería CR2032",
    categoria: "Baterías",
    cantidad: 40,
    minimo: 10,
    ubicacion: "Gaveta 1",
  },
  {
    nombre: "Batería UPS 12V 7Ah",
    categoria: "Baterías",
    cantidad: 2,
    minimo: 4,
    ubicacion: "Almacén TIC",
  },
  {
    nombre: "Disco SSD 480GB",
    categoria: "Almacenamiento",
    cantidad: 6,
    minimo: 3,
    ubicacion: "Gaveta 2",
  },
  {
    nombre: "Cable de red UTP Cat6",
    categoria: "Redes",
    cantidad: 25,
    minimo: 10,
    ubicacion: "Gaveta 3",
  },
];

const vacio = { indice: 0, tipo: "ENTRADA", cantidad: "", motivo: "" };

function Refacciones() {
  const [items, setItems] = useState(inicial);
  const [movimientos, setMovimientos] = useState([]);
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
    const cant = Number(form.cantidad);
    const idx = Number(form.indice);
    const item = items[idx];
    if (!cant || cant <= 0) {
      setError("Escribe una cantidad mayor a 0");
      return;
    }
    if (form.tipo === "SALIDA" && cant > item.cantidad) {
      setError("No hay suficiente en existencia");
      return;
    }
    const nueva = form.tipo === "ENTRADA" ? item.cantidad + cant : item.cantidad - cant;
    setItems(items.map((it, i) => (i === idx ? { ...it, cantidad: nueva } : it)));
    setMovimientos([
      {
        fecha: new Date().toLocaleString("es-MX"),
        nombre: item.nombre,
        tipo: form.tipo,
        cantidad: cant,
        motivo: form.motivo,
      },
      ...movimientos,
    ]);
    cerrar();
  };

  const columns = [
    { Header: "refacción", accessor: "nombre", align: "left" },
    { Header: "categoría", accessor: "categoria", align: "left" },
    { Header: "cantidad", accessor: "cantidad", align: "center" },
    { Header: "mínimo", accessor: "minimo", align: "center" },
    { Header: "ubicación", accessor: "ubicacion", align: "left" },
    { Header: "estado", accessor: "estado", align: "center" },
  ];

  const rows = items.map((d) => ({
    ...d,
    estado:
      d.cantidad <= d.minimo ? (
        <MDBadge badgeContent="Stock bajo" color="error" variant="gradient" size="sm" />
      ) : (
        <MDBadge badgeContent="Normal" color="success" variant="gradient" size="sm" />
      ),
  }));

  const colMov = [
    { Header: "fecha", accessor: "fecha", align: "left" },
    { Header: "refacción", accessor: "nombre", align: "left" },
    { Header: "tipo", accessor: "tipo", align: "center" },
    { Header: "cantidad", accessor: "cantidad", align: "center" },
    { Header: "motivo", accessor: "motivo", align: "left" },
  ];

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
                  Inventario de refacciones
                </MDTypography>
                <MDButton
                  variant="contained"
                  color="white"
                  size="small"
                  onClick={() => setAbierto(true)}
                >
                  Registrar movimiento
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
          {movimientos.length > 0 && (
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="dark"
                  borderRadius="lg"
                >
                  <MDTypography variant="h6" color="white">
                    Últimos movimientos
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns: colMov, rows: movimientos }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
          )}
        </Grid>
      </MDBox>

      <Dialog open={abierto} onClose={cerrar} fullWidth maxWidth="xs">
        <DialogTitle>Registrar movimiento</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            margin="dense"
            label="Refacción"
            value={form.indice}
            onChange={cambiar("indice")}
            SelectProps={{ native: true }}
          >
            {items.map((it, i) => (
              <option key={it.nombre} value={i}>
                {it.nombre}
              </option>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            margin="dense"
            label="Tipo"
            value={form.tipo}
            onChange={cambiar("tipo")}
            SelectProps={{ native: true }}
          >
            <option value="ENTRADA">Entrada</option>
            <option value="SALIDA">Salida</option>
          </TextField>
          <TextField
            fullWidth
            margin="dense"
            label="Cantidad"
            type="number"
            value={form.cantidad}
            onChange={cambiar("cantidad")}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Motivo"
            value={form.motivo}
            onChange={cambiar("motivo")}
          />
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

export default Refacciones;
