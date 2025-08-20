import crypto from "crypto";

export default function createUniqueCode() {
  const unique = crypto.randomUUID().slice(0, 7);
  return `INV-${unique}-${String(Date.now()).slice(-5)}`;
}
