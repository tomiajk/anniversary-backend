export default async function getQrCodeBuffer(code: string) {
  try {
    const res = await fetch(
      `https://api.qrserver.com/v1/create-qr-code/?data=https://anniversary01.vercel.app/admin/${code}`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch QR code: ${res.statusText}`);
    }

    // Get response as ArrayBuffer
    const arrayBuffer = await res.arrayBuffer();

    // Convert ArrayBuffer to Buffer (Node.js)
    const buffer = Buffer.from(arrayBuffer);

    // Now you have the QR code image as a Buffer
    return buffer;
  } catch (error) {
    console.error("Error fetching QR code:", error);
    throw error;
  }
}
