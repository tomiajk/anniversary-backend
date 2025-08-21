export default async function (code: string) {
  try {
    const res = await fetch(
      `https://api.qrserver.com/v1/create-qr-code/?data=https://anniversary01.vercel.app.com/admin/${code}`
    );
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    return url;
  } catch (error) {
    throw new Error(error);
  }
}
