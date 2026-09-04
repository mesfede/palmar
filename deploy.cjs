const ftp = require("basic-ftp");
const path = require("path");
const { execSync } = require("child_process");

async function deploy() {
  console.log("🚀 Iniciando despliegue a Hostinger...");

  // 1. Build the project
  console.log("📦 Compilando archivos de producción (npm run build)...");
  try {
    execSync("npm run build", { stdio: "inherit" });
    console.log("✅ Compilación completada con éxito.");
  } catch (error) {
    console.error("❌ Falló la compilación:", error.message);
    process.exit(1);
  }

  // 2. Validate environment variables
  const host = process.env.FTP_HOST;
  const user = process.env.FTP_USER;
  const password = process.env.FTP_PASSWORD;
  const port = parseInt(process.env.FTP_PORT || "21", 10);
  const remotePath = process.env.FTP_REMOTE_PATH || "/domains/unke.com.ar/public_html/palmar";

  if (!host || !user || !password) {
    console.error("❌ Faltan credenciales FTP. Por favor, asegúrate de configurar FTP_HOST, FTP_USER y FTP_PASSWORD en la configuración de variables de entorno.");
    console.log("\nVariables configuradas actualmente:");
    console.log(`- FTP_HOST: ${host ? "✅ Configurado" : "❌ Falta"}`);
    console.log(`- FTP_USER: ${user ? "✅ Configurado" : "❌ Falta"}`);
    console.log(`- FTP_PASSWORD: ${password ? "✅ Configurado" : "❌ Falta"}`);
    console.log(`- FTP_PORT: ${port}`);
    console.log(`- FTP_REMOTE_PATH: ${remotePath}`);
    process.exit(1);
  }

  // 3. Connect and upload
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    console.log(`🔌 Conectando al servidor FTP: ${host}:${port}...`);
    await client.access({
      host,
      user,
      password,
      port,
      secure: false // Hostinger soporta conexiones explícitas y tradicionales. Si tienes problemas de TLS, se puede alternar.
    });

    console.log(`📂 Asegurando que exista el directorio remoto: ${remotePath}...`);
    await client.ensureDir(remotePath);

    // Limpiamos los archivos viejos de Vite para que no queden remanentes hash viejos
    console.log("🧹 Limpiando directorio de destino en Hostinger...");
    try {
      await client.clearWorkingDir();
    } catch (err) {
      console.log("⚠️ No se pudo limpiar o el directorio ya estaba vacío, continuando con la subida...", err.message);
    }

    console.log("📤 Subiendo el contenido de local 'dist/' de manera recursiva...");
    const localDistPath = path.join(__dirname, "dist");
    await client.uploadFromDir(localDistPath);

    console.log("\n🎉 ¡DESPLIEGUE COMPLETADO CON TOTAL ÉXITO!");
    console.log(`🌍 Tu aplicación ya está activa en Hostinger bajo la carpeta ${remotePath}!`);
  } catch (err) {
    console.error("❌ Error de subida FTP:", err);
    process.exit(1);
  } finally {
    client.close();
  }
}

deploy();
