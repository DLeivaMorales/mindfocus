# Releases de MindFocus

## 📱 Cómo instalar la APK en tu celular

### Método 1: Desde GitHub Releases (Recomendado)

1. Ve a la página de [Releases](https://github.com/DLeivaMorales/mindfocus/releases)
2. Descarga el archivo `.apk` de la última versión
3. En tu celular Android, habilita "Instalar apps desconocidas" (Configuración > Seguridad)
4. Abre el archivo APK descargado
5. Sigue las instrucciones de instalación

### Método 2: Desde este directorio

Si el APK está en este directorio `releases/`:

1. Descarga el archivo `.apk`
2. Transfiérelo a tu celular via:
   - Cable USB
   - Email
   - Google Drive / Dropbox
   - WhatsApp (a ti mismo)
3. Instala siguiendo los pasos anteriores

---

## 📋 Versiones Disponibles

### v0.0.1 (Primera versión)
- **Fecha**: Diciembre 2024
- **Características**:
  - ✅ Funcionalidad offline (Service Worker)
  - ✅ Navegación por pestañas
  - ✅ Componentes Angular Standalone
  - ✅ Capacitor 7 integrado
- **Descarga**: [mindfocus-v0.0.1.apk](./mindfocus-v0.0.1.apk)
- **Tamaño**: ~4.2 MB

---

## 🛠️ Para Desarrolladores

### Compilar tu propio APK

```bash
cd /c/Users/Diego\ Leiva/source/repos/mindfocus

# Compilar para producción
ionic build --prod

# Sincronizar con Android
ionic cap sync android

# Abrir en Android Studio
ionic cap open android

# En Android Studio:
# Build > Build Bundle(s) / APK(s) > Build APK(s)
```

El APK compilado estará en:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### Crear un Release firmado (para Play Store)

```bash
# Generar keystore (primera vez)
keytool -genkey -v -keystore mindfocus-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias mindfocus

# Compilar release en Android Studio:
# Build > Generate Signed Bundle / APK
```

---

## ⚠️ Notas Importantes

1. **Versión Debug vs Release**:
   - `app-debug.apk` = Para desarrollo y testing
   - `app-release.apk` = Para producción (firmado)

2. **Permisos**:
   - Habilitar "Orígenes desconocidos" solo temporalmente
   - Solo instala APKs de fuentes confiables

3. **Actualizaciones**:
   - Las actualizaciones NO son automáticas
   - Debes descargar e instalar manualmente cada nueva versión

---

## 🔒 Seguridad

- ✅ APK compilado desde código fuente verificable
- ✅ Sin ofuscación (modo debug)
- ✅ Código abierto en este repositorio

---

## 📞 Soporte

¿Problemas con la instalación? 
- Abre un [Issue](https://github.com/DLeivaMorales/mindfocus/issues)
- Contacta al desarrollador

---

Generado con [Claude Code](https://claude.com/claude-code)