# MindFocus - Aplicación de Técnica Pomodoro

MindFocus es una aplicación multiplataforma desarrollada con Ionic y Angular que implementa la técnica Pomodoro para mejorar la productividad y concentración.

## 🚀 Características

- ⏱️ **Temporizador Pomodoro**: Configura tu tiempo de enfoque y descanso
- 📊 **Estadísticas Visuales**: Gráfico de barras con el tiempo dedicado por día de la semana
- 📜 **Historial de Sesiones**: Registro completo de todas tus sesiones de enfoque y descanso
- 🔔 **Notificaciones**: Alertas al completar cada sesión
- 📱 **Diseño Responsivo**: Funciona en navegadores web, iOS y Android
- 🎨 **Interfaz Moderna**: Diseño limpio con gradientes y animaciones suaves
- 💾 **Persistencia Local**: Datos guardados localmente en tu dispositivo

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- npm (v9 o superior)
- Ionic CLI: `npm install -g @ionic/cli`

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd mindfocus
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm start
# o
ionic serve
```

La aplicación se abrirá en `http://localhost:8100`

## 📱 Ejecutar en Dispositivos

### iOS
```bash
ionic capacitor add ios
ionic capacitor run ios
```

### Android
```bash
ionic capacitor add android
ionic capacitor run android
```

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── models/              # Modelos de datos (Session, Stats, Config)
│   ├── services/            # Servicios (Timer, Storage, Statistics)
│   ├── tab1/                # Pantalla de Configuración
│   ├── tab2/                # Pantalla de Estadísticas
│   ├── tab3/                # Pantalla de Historial
│   ├── timer/               # Pantalla del Temporizador Activo
│   ├── notification/        # Pantalla de Notificación
│   └── tabs/                # Componente principal de navegación
├── theme/                   # Configuración de colores y tema
└── global.scss             # Estilos globales
```

## 🎯 Flujo de Navegación

1. **Configuración** → Personaliza tiempos de enfoque y descanso
2. **Temporizador Activo** → Sesión en progreso con animación circular
3. **Notificación** → Al completar la sesión
4. **Estadísticas** → Visualiza tu progreso semanal
5. **Historial** → Revisa todas tus sesiones pasadas

## 🎨 Personalización

### Colores del Tema

Los colores principales están definidos en `src/theme/variables.scss`:

- **Primary (Púrpura)**: `#667eea` - Color principal de la app
- **Secondary (Rosa)**: `#f093fb` - Para descansos
- **Success (Verde)**: `#4ade80` - Para sesiones completadas

### Configuración de Tiempos

Los usuarios pueden configurar:
- Tiempo de enfoque: 5-60 minutos
- Tiempo de descanso: 1-30 minutos
- Presets rápidos: 25/5 (Clásico) y 50/10 (Extendido)

## 🧪 Testing

```bash
npm test
```

## 📦 Build para Producción

```bash
# Web
npm run build

# iOS
ionic capacitor build ios

# Android
ionic capacitor build android
```

## 🔧 Tecnologías Utilizadas

- **Ionic 8**: Framework para aplicaciones híbridas
- **Angular 20**: Framework de desarrollo
- **Capacitor 7**: Runtime nativo para iOS/Android
- **TypeScript**: Lenguaje de programación
- **RxJS**: Programación reactiva
- **LocalStorage**: Persistencia de datos

## 📖 Servicios Principales

### TimerService
Gestiona el estado del temporizador, controla inicio, pausa, detener y completar sesiones.

### StorageService
Maneja la persistencia de datos en localStorage (configuración y sesiones).

### StatisticsService
Calcula estadísticas diarias, semanales y rachas de sesiones completadas.

## 🎯 Características Implementadas

- ✅ Configuración personalizable de tiempos
- ✅ Temporizador con animación circular SVG
- ✅ Sistema de notificaciones al completar sesiones
- ✅ Estadísticas con gráfico de barras interactivo
- ✅ Historial completo con filtros (Hoy, Semana, Todo)
- ✅ Racha de días consecutivos
- ✅ Persistencia local de datos
- ✅ Diseño responsivo y moderno
- ✅ Navegación fluida entre pantallas

## 📝 Próximas Mejoras

- [ ] Sonidos personalizados para notificaciones
- [ ] Modo oscuro completo
- [ ] Sincronización en la nube
- [ ] Estadísticas mensuales y anuales
- [ ] Objetivos diarios personalizables
- [ ] Exportar datos en CSV
- [ ] Integración con widgets del sistema
- [ ] Push notifications nativas

## 👨‍💻 Autor

Desarrollado con Ionic y Angular para la gestión del tiempo y productividad.

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia MIT.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Soporte

Si tienes alguna pregunta o problema, por favor abre un issue en el repositorio.

---

**¡Disfruta mejorando tu productividad con MindFocus! 🎯⏱️**
