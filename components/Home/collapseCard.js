import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { Box } from "@mui/material";
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon
        style={{ color: "white", fontWeight: 800 }}
        sx={{ fontSize: "0.9rem" }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div >
      <Box className={styles.body}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            className={styles.insideSidebar}
            style={{ color: "white", fontWeight: 800 }}
          >
            <Typography style={{ fontWeight: 700, fontSize: 15 }}>
              Species
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={styles.dropDown}>
            <Link href="/">
              <Typography>
                1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse
              </Typography>
            </Link>
            <Link href="/">
              <Typography>
                2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse
              </Typography>
            </Link>
            <Link href="/">
              <Typography>
                3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse
              </Typography>
            </Link>
            <Link href="/">
              <Typography>
                4. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse
              </Typography>
            </Link>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            aria-controls="panel2d-content"
            id="panel2d-header"
            className={styles.insideSidebar}
            style={{ color: "white", fontWeight: 800 }}
          >
            <Typography style={{ fontWeight: 700, fontSize: 15 }}>
              Genera
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={styles.dropDown}>
            <Link href="/">
              <Typography>
                1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse
              </Typography>
            </Link>
            <Link href="/">
              <Typography>
                2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse
              </Typography>
            </Link>
            <Link href="/">
              <Typography>
                3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse
              </Typography>
            </Link>
            <Link href="/">
              <Typography>
                4. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse
              </Typography>
            </Link>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            aria-controls="panel3d-content"
            id="panel3d-header"
            className={styles.insideSidebar}
            style={{ color: "white", fontWeight: 800 }}
          >
            <Typography style={{ fontWeight: 700, fontSize: 15 }}>
              Higher Taxa
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={styles.dropDown}>
            <Link href="/">
              <Typography>
                1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse
              </Typography>
            </Link>
            <Link href="/">
              <Typography>
                2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse
              </Typography>
            </Link>
            <Link href="/">
              <Typography>
                3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse
              </Typography>
            </Link>
            <Link href="/">
              <Typography>
                4. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse
              </Typography>
            </Link>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            aria-controls="panel3d-content"
            id="panel3d-header"
            className={styles.insideSidebar}
            style={{ color: "white", fontWeight: 800 }}
          >
            <Typography style={{ fontWeight: 700, fontSize: 15 }}>
              Bibliography
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={styles.dropDown}>
            <Link href="/">
              <Typography>
                1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse
              </Typography>
            </Link>
            <Link href="/">
              <Typography>
                2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse
              </Typography>
            </Link>
            <Link href="/">
              <Typography>
                3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse
              </Typography>
            </Link>
            <Link href="/">
              <Typography>
                4. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse
              </Typography>
            </Link>
          </AccordionDetails>
        </Accordion>
      </Box>
    </div>
  );
}
