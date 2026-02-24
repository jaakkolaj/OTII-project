import axios from "axios";

const baseUrl = "http://localhost:5001/supabase";

export const getSignedURL = async (id: string) => {
  const response = await axios.get<Blob>(`${baseUrl}/${id}`, {
    responseType: "blob",
  });

  const contentType = response.headers["content-type"] ?? "";

  if (contentType.includes("application/pdf")) {
    const pdfBlob = new Blob([response.data], { type: "application/pdf" });
    return URL.createObjectURL(pdfBlob);
  }

  const text = (await response.data.text()).trim();
  if (text.startsWith("http")) {
    const signedPdfResponse = await axios.get<Blob>(text, {
      responseType: "blob",
    });
    const pdfBlob = new Blob([signedPdfResponse.data], {
      type: "application/pdf",
    });
    return URL.createObjectURL(pdfBlob);
  }
  if (text.startsWith("%PDF-")) {
    const pdfBlob = new Blob([response.data], { type: "application/pdf" });
    return URL.createObjectURL(pdfBlob);
  }

  throw new Error("Unexpected document response format");
};
