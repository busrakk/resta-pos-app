const mongoose = require("mongoose");
const os = require("os"); // IP adresini otomatik alma

const PrinterSchema = mongoose.Schema(
  {
    yazici_adi: { type: String, required: true },
    ip_adresi: {
      type: String,
      default: getLocalIpAddress(), // IP adresini otomatik olarak almak için fonksiyonu çağırın
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Printer = mongoose.model("printers", PrinterSchema);
module.exports = Printer;

function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    const interface = interfaces[interfaceName];
    for (const network of interface) {
      // Sadece IPv4 adreslerini alıyoruz
      if (network.family === "IPv4" && !network.internal) {
        return network.address;
      }
    }
  }
  return "127.0.0.1"; // Eğer IP adresi bulunamazsa varsayılan olarak 127.0.0.1 kullanabilirsiniz
}
