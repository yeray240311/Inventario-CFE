import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

const datos = [
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

function Refacciones() {
  const columns = [
    { Header: "refacción", accessor: "nombre", align: "left" },
    { Header: "categoría", accessor: "categoria", align: "left" },
    { Header: "cantidad", accessor: "cantidad", align: "center" },
    { Header: "mínimo", accessor: "minimo", align: "center" },
    { Header: "ubicación", accessor: "ubicacion", align: "left" },
    { Header: "estado", accessor: "estado", align: "center" },
  ];

  const rows = datos.map((d) => ({
    ...d,
    estado:
      d.cantidad <= d.minimo ? (
        <MDBadge badgeContent="Stock bajo" color="error" variant="gradient" size="sm" />
      ) : (
        <MDBadge badgeContent="Normal" color="success" variant="gradient" size="sm" />
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
              >
                <MDTypography variant="h6" color="white">
                  Inventario de refacciones
                </MDTypography>
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
      <Footer />
    </DashboardLayout>
  );
}

export default Refacciones;
