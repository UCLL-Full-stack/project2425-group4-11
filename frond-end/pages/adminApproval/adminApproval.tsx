import Navbar from "@/components/navbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import AdminService from "@/services/AdminService";
import { Artist, ConcertHall, User } from "@/types";
import ShowTimeService from "@/services/ShowTimeService";

const AdminApprovalPage: React.FC = () => {
  const { t } = useTranslation();

  const [isClient, setIsClient] = useState(false);
  const [pendingUsers, setPendingUsers] = useState<Artist[]>([]);
  const [concertHallUsers, setConcertHallUsers] = useState<ConcertHall[]>([]);

  const [userRole, setUserRole] = useState<string | null>(null);

  const getArtists = async () => {
    if (userRole) {
      try {
        const artistResponse = await ShowTimeService.getAllArtists(userRole);
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
          console.error(t('adminApproval.error.mismatch'), artistsFound);
        }
      } catch (error) {
        console.error(t('adminApproval.error.fetchFail'), error);
        setPendingUsers([]);
      }
    }
  };

  const getConcertHalls = async () => {
    if (userRole) {
      try {
        const concertHallResponse = await ShowTimeService.getAllConcertHalls(userRole);
        if (!concertHallResponse.ok) {
          console.error(
            `Failed to fetch artists: ${concertHallResponse.status} ${concertHallResponse.statusText}`
          );
          setConcertHallUsers([]);
          return;
        }
        const concertHallsFound = await concertHallResponse.json();
        if (Array.isArray(concertHallsFound)) {
          setConcertHallUsers(concertHallsFound);
        } else {
          setConcertHallUsers([]);
          console.error(t('adminApproval.error.mismatch'), concertHallsFound)
        }
      } catch (error) {
        console.error(t('adminApproval.error.fetchFail'), error);
        setConcertHallUsers([]);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("loggedInUser");
      const parsedUser = user ? JSON.parse(user) : null;
      setUserRole(parsedUser?.role || null);
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
    getArtists();
    getConcertHalls();
  }, [userRole]);

const approveUser = async (id: string) => {
  try {
    const response = await AdminService.updateArtistStatus(id, "Verified");
    if (response.ok) {
      setPendingUsers(pendingUsers.map((user) =>
        user.id?.toString() === id ? { ...user, isVerified: "Verified" } : user
      ));
      alert(t("adminApproval.approveSuccess"));
    } else {
      console.error(`Failed to approve user with id ${id}`);
    }
  } catch (error) {
    console.error("Error approving user:", error);
  }
};

const denyUser = async (id: string) => {
  try {
    const response = await AdminService.updateArtistStatus(id, "Not Verified");
    if (response.ok) {
      setPendingUsers(pendingUsers.map((user) =>
        user.id?.toString() === id ? { ...user, isVerified: "Not Verified" } : user
      ));
      alert(t("adminApproval.denySuccess"));
    } else {
      console.error(`Failed to deny user with id ${id}`);
    }
  } catch (error) {
    console.error("Error denying user:", error);
  }
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
          padding: "40px",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#ffffff",
          minHeight: "100vh",
          color: "#000000",
          boxSizing: "border-box",
        }}
      >
        <h1 style={{ color: "#000000", textAlign: "center", marginBottom: "40px" }}>{t("adminApproval.title")}</h1>

        {/* Artists Table */}
        <h2 style={{ color: "#000000",textAlign: "center", marginBottom: "20px" }}>{t("adminApproval.approvalArtist")}</h2>
        <div style={{ padding: "0 80px", marginBottom: "40px" }}>
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
                    {
                      user.isVerified === "Verified" ? (
                        <span style={{ color: "green" }}>{t("adminApproval.verified")}</span>
                      ) : user.isVerified === "Pending" ? (
                        <div style={{ display: "flex", gap: "10px" }}>
                          <button
                            style={approveButtonStyle}
                            onClick={() => user.id ? approveUser(user.id.toString()) : null}
                          >
                            {t("adminApproval.approveButton")}
                          </button>
                          <button
                            style={{
                              ...approveButtonStyle,
                              backgroundColor: "red",
                              color: "white",
                              borderColor: "darkred",
                            }}
                            onClick={() => user.id ? denyUser(user.id.toString()) : null}
                          >
                            {t("adminApproval.denyButton")}
                          </button>
                        </div>
                      ) : (
                        <span style={{ color: "red" }}>{t("adminApproval.permissionDenied")}</span>
                      )
                    }
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
        </div>

        {/* Concert Halls Table */}
        <h2 style={{ color: "#000000", textAlign: "center", marginBottom: "20px" }}>{t("adminApproval.approvalConcertHall")}</h2>
        <div style={{ padding: "0 80px" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>{t("adminApproval.table.id")}</th>
                <th style={tableHeaderStyle}>{t("adminApproval.table.name")}</th>
                <th style={tableHeaderStyle}>{t("adminApproval.table.location")}</th>
                <th style={tableHeaderStyle}>{t("adminApproval.table.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {concertHalls.length > 0 ? (
                concertHalls.map((user) => (
                  <tr key={user.id}>
                    <td style={tableCellStyle}>{user.id}</td>
                    <td style={tableCellStyle}>{user.name}</td>
                    <td style={tableCellStyle}>{user.location}</td>
                    <td style={tableCellStyle}>
                    {
                      user.isVerified === "Verified" ? (
                        <span style={{ color: "green" }}>{t("adminApproval.verified")}</span>
                      ) : user.isVerified === "Pending" ? (
                        <div style={{ display: "flex", gap: "10px" }}>
                          <button
                            style={approveButtonStyle}
                            onClick={() => user.id ? approveUser(user.id.toString()) : null}
                          >
                            {t("adminApproval.approveButton")}
                          </button>
                          <button
                            style={{
                              ...approveButtonStyle,
                              backgroundColor: "red",
                              color: "white",
                              borderColor: "darkred",
                            }}
                            onClick={() => user.id ? denyUser(user.id.toString()) : null}
                          >
                            {t("adminApproval.denyButton")}
                          </button>
                        </div>
                      ) : (
                        <span style={{ color: "red" }}>{t("adminApproval.permissionDenied")}</span>
                      )
                    }
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
  maxWidth: "800px",
  margin: "0 auto",
  borderCollapse: "collapse",
  marginBottom: "30px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const tableHeaderStyle: React.CSSProperties = {
  border: "1px solid #dddddd",
  padding: "12px",
  backgroundColor: "#f2f2f2",
  color: "#333333",
  fontWeight: "bold",
  textAlign: "left",
};

const tableCellStyle: React.CSSProperties = {
  border: "1px solid #dddddd",
  padding: "12px",
  textAlign: "left",
  color: "#333333",
};

const approveButtonStyle: React.CSSProperties = {
  padding: "8px 16px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

export default AdminApprovalPage;