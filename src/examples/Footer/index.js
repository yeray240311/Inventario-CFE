import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function Footer() {
  return (
    <MDBox display="flex" justifyContent="center" py={2}>
      <MDTypography variant="button" fontWeight="regular" color="text">
        © {new Date().getFullYear()} Sistema de Inventario TIC - CFE Zona Campeche
      </MDTypography>
    </MDBox>
  );
}

export default Footer;
