import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

const datos = [
  {
    rpe: "9XA01",
    nombre: "Persona Uno",
    puesto: "Jefe de oficina",
    area: "Tecnologías de Información",
  },
  { rpe: "9XA02", nombre: "Persona Dos", puesto: "Analista", area: "Administración" },
  { rpe: "9XA03", nombre: "Persona Tres", puesto: "Técnico", area: "Medición" },
  { rpe: "9XA04", nombre: "Persona Cuatro", puesto: "Auxiliar", area: "Planeación" },
];

function Personal() {
  const columns = [
    { Header: "rpe", accessor: "rpe", align: "left" },
    { Header: "nombre", accessor: "nombre", align: "left" },
    { Header: "puesto", accessor: "puesto", align: "left" },
    { Header: "área", accessor: "area", align: "left" },
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
              >
                <MDTypography variant="h6" color="white">
                  Personal
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows: datos }}
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

export default Personal;
