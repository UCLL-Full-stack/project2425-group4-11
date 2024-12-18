import Navbar from "@/components/navbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import AdminService from "@/services/AdminService";
import { Artist, ConcertHall } from "@/types";

const AdminApprovalPage: React.FC = () => {
  const { t } = useTranslation();

  // Defer rendering until the component mounts (prevents mismatch)
  const [isClient, setIsClient] = useState(false);
  const [pendingUsers, setPendingUsers] = useState<Artist[]>([]);
  const [concertHallUsers, setConcertHallUsers] = useState<ConcertHall[]>([]);

  const getArtists = async () => {
    try {
      const artistResponse = await AdminService.getAllArtists();
      if (!artistResponse.ok) {
        console.error(
          `Failed to fetch artists: ${artistResponse.status} ${artistResponse.statusText}`
        );
        setPendingUsers([]);
        return;
      }
      const artistsFound = await artistResponse.json();
      if (Array.isArray(artistsFound)) {
        setPendingUsers(artistsFound);
      } else {
        setPendingUsers([]);
        console.error("Expected an array of artists but got: ", artistsFound);
      }
    } catch (error) {
      console.error("Failed to fetch artists: ", error);
      setPendingUsers([]);
    }
  };

  useEffect(() => {
    setIsClient(true);
    getArtists();
  }, []);

  const approveUser = (id: string) => {
    setPendingUsers(pendingUsers.filter((user) => user.id?.toString() !== id));
    alert(t("adminApproval.approveSuccess"));
  };

  if (!isClient) {
    return null;
  }

  const artists = pendingUsers.filter((user) => user.role === "artist");
  const concertHalls = concertHallUsers.filter((user) => user.role === "concertHall");

  return (
    <>
      <Navbar />
      <div
        style={{
          padding: "20px",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#ffffff",
          minHeight: "100vh",
          color: "#000000",
          boxSizing: "border-box",
        }}
      >
        <h1 style={{ color: "#000000" }}>{t("adminApproval.title")}</h1>

        {/* Artists Table */}
        <h2 style={{ color: "#000000" }}>{t("adminApproval.approvalArtist")}</h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>{t("adminApproval.table.id")}</th>
              <th style={tableHeaderStyle}>{t("adminApproval.table.artistName")}</th>
              <th style={tableHeaderStyle}>{t("adminApproval.table.email")}</th>
              <th style={tableHeaderStyle}>{t("adminApproval.table.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {artists.length > 0 ? (
              artists.map((user) => (
                <tr key={user.id}>
                  <td style={tableCellStyle}>{user.id}</td>
                  <td style={tableCellStyle}>{user.artistName}</td>
                  <td style={tableCellStyle}>{user.email}</td>
                  <td style={tableCellStyle}>
                    <button style={approveButtonStyle} onClick={() => user.id ? approveUser(user.id.toString()) : null}>
                      {t("adminApproval.button")}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={tableCellStyle}>
                  {t("adminApproval.table.noApprovalsArtist")}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Concert Halls Table */}
        <h2 style={{ color: "#000000" }}>{t("adminApproval.approvalConcertHall")}</h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>{t("adminApproval.table.id")}</th>
              <th style={tableHeaderStyle}>{t("adminApproval.table.name")}</th>
              <th style={tableHeaderStyle}>{t("adminApproval.table.email")}</th>
              <th style={tableHeaderStyle}>{t("adminApproval.table.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {concertHalls.length > 0 ? (
              concertHalls.map((user) => (
                <tr key={user.id}>
                  <td style={tableCellStyle}>{user.id}</td>
                  <td style={tableCellStyle}>{user.name}</td>
                  {/* <td style={tableCellStyle}>{user.email}</td> */}
                  <td style={tableCellStyle}>
                    <button style={approveButtonStyle} onClick={() => user.id ? approveUser(user.id.toString()) : null}>
                      {t("adminApproval.button")}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={tableCellStyle}>
                  {t("adminApproval.table.noApprovalsConcertHall")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { locale } = context;

  return {
      props: {
          ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
  };
};

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  marginBottom: "30px",
};

const tableHeaderStyle: React.CSSProperties = {
  border: "1px solid #000000",
  padding: "10px",
  backgroundColor: "lightgrey",
  color: "#000000",
  fontWeight: "bold",
  textAlign: "left",
};

const tableCellStyle: React.CSSProperties = {
  border: "1px solid #000000",
  padding: "10px",
  textAlign: "left",
  color: "#000000",
};

const approveButtonStyle: React.CSSProperties = {
  padding: "5px 10px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "3px",
  cursor: "pointer",
};

export default AdminApprovalPage;
