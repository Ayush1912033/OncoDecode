import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "./assets/logoReport.png";

// ===================== STYLES =====================
const styles = StyleSheet.create({
  page: {
    paddingTop: 100,
    paddingHorizontal: 50,
    paddingBottom: 80,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
  },

  // --- Header ---
  header: {
    position: "absolute",
    top: 20,
    left: 50,
    right: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "#E2E8F0",
    paddingBottom: 15,
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
    alignItems: "flex-start",
  },
  headerCenter: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  headerRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  logo: {
    width: 70,
    height: 70,
    objectFit: "contain",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: "#1E3A8A",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 10,
    color: "#64748B",
    marginTop: 4,
    textAlign: "center",
  },
  headerDate: {
    fontSize: 10,
    color: "#64748B",
    textAlign: "right",
  },

  // --- Report Title ---
  reportTitle: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#0F172A",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  reportSubtitle: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 40,
  },

  // --- Section Titles ---
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: "#1E3A8A",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    paddingBottom: 6,
    backgroundColor: "#F8FAFC",
    padding: 8,
    borderRadius: 4,
  },

  // --- Patient Details ---
  patientDetails: {
    marginTop: 15,
    marginBottom: 30,
    backgroundColor: "#F8FAFC",
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  detailLabel: {
    width: "35%",
    fontSize: 12,
    color: "#64748B",
    fontFamily: "Helvetica-Bold",
  },
  detailValue: {
    width: "65%",
    fontSize: 12,
    color: "#0F172A",
    textAlign: "right",
    fontFamily: "Helvetica-Bold",
  },

  // --- Results Section ---
  resultsSection: {
    backgroundColor: "#F0FDF4",
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#86EFAC",
    marginTop: 15,
  },
  resultItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#DCFCE7",
  },
  resultLabel: {
    width: "40%",
    fontSize: 12,
    color: "#166534",
    fontFamily: "Helvetica-Bold",
  },
  resultValue: {
    width: "60%",
    fontSize: 13,
    color: "#0F172A",
    textAlign: "right",
    fontFamily: "Helvetica-Bold",
    backgroundColor: "#FFFFFF",
    padding: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#D1FAE5",
  },

  // --- Notes ---
  notesSection: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#FEF3C7",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#FCD34D",
  },
  notesTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#92400E",
    marginBottom: 8,
  },
  notesText: {
    fontSize: 10,
    color: "#78350F",
    lineHeight: 1.4,
  },

  // --- Signature ---
  signatureSection: {
    marginTop: 50,
    textAlign: "right",
    paddingRight: 50,
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    width: 180,
    alignSelf: "flex-end",
    marginBottom: 6,
  },
  signatureText: {
    fontSize: 11,
    color: "#374151",
    fontFamily: "Helvetica-Bold",
  },
  signatureTitle: {
    fontSize: 10,
    color: "#6B7280",
    marginBottom: 4,
  },

  // --- Footer ---
  footer: {
    position: "absolute",
    bottom: 30,
    left: 50,
    right: 50,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: 10,
    textAlign: "center",
    fontSize: 9,
    color: "#64748B",
  },
  pageNumber: {
    position: "absolute",
    bottom: 30,
    right: 50,
    fontSize: 9,
    color: "#9CA3AF",
  },
});

// ===================== COMPONENT =====================
const ReportDocument = ({ patient, results }) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image style={styles.logo} src={logo} />
          </View>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>OncoCode</Text>
            <Text style={styles.headerSubtitle}>
              Precision Oncology, Simplified
            </Text>
          </View>

          <View style={styles.headerRight}>
            <Text style={styles.headerDate}>{currentDate}</Text>
          </View>
        </View>

        {/* TITLE */}
        <Text style={styles.reportTitle}>AI Cancer Prediction Report</Text>
        <Text style={styles.reportSubtitle}>
          Comprehensive Analysis & Risk Assessment
        </Text>

        {/* PATIENT DETAILS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient Information</Text>
          <View style={styles.patientDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Patient Name</Text>
              <Text style={styles.detailValue}>
                {patient?.fullName || "N/A"}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Patient ID</Text>
              <Text style={styles.detailValue}>
                {patient?.patientId || "N/A"}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Age</Text>
              <Text style={styles.detailValue}>
                {patient?.age || "N/A"} years
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Gender</Text>
              <Text style={styles.detailValue}>
                {patient?.gender || "N/A"}
              </Text>
            </View>
          </View>
        </View>

        {/* RESULTS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Prediction Results</Text>
          <View style={styles.resultsSection}>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Cancer Type</Text>
              <Text style={styles.resultValue}>
                {results?.CancerType || "N/A"}
              </Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Disease Stage</Text>
              <Text style={styles.resultValue}>
                {results?.Stage || "N/A"}
              </Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Survival Risk</Text>
              <Text style={styles.resultValue}>
                {results?.SurvivalInterpretation || "N/A"}
              </Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Risk Score</Text>
              <Text style={styles.resultValue}>
                {results?.SurvivalRiskScore !== undefined
                  ? `${(results.SurvivalRiskScore * 100).toFixed(1)}%`
                  : "N/A"}
              </Text>
            </View>
          </View>
        </View>

        {/* DISCLAIMER */}
        <View style={styles.notesSection}>
          <Text style={styles.notesTitle}>⚠ Important Medical Disclaimer</Text>
          <Text style={styles.notesText}>
            This AI-generated report is for informational purposes only and
            should not replace professional medical advice, diagnosis, or
            treatment. All predictions are based on machine learning models and
            should be validated by qualified healthcare professionals.
          </Text>
        </View>

        {/* SIGNATURE */}
        <View style={styles.signatureSection}>
          <Text style={styles.signatureTitle}>
            Authorized Healthcare Professional
          </Text>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>
            Digital Signature & Validation
          </Text>
        </View>

        {/* FOOTER */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
        />
        <View style={styles.footer}>
          <Text>
            Confidential Medical Report • OncoCode AI System • Generated{" "}
            {currentDate}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default ReportDocument;
