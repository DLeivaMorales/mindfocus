# MindFocus

Aplicación móvil multiplataforma desarrollada con Ionic Framework y Angular, diseñada para proporcionar una experiencia de usuario moderna y eficiente.

## Descripción del Proyecto

MindFocus es una aplicación híbrida construida sobre la última versión de Angular (v20) e Ionic (v8), utilizando Capacitor para el acceso a funcionalidades nativas. La aplicación sigue una arquitectura basada en pestañas (tabs) que permite una navegación intuitiva entre diferentes secciones.

## Tecnologías Principales

### Framework y Core
- **Angular 20.0.0**: Framework JavaScript moderno con arquitectura standalone components
- **Ionic 8.0.0**: Framework UI para aplicaciones híbridas multiplataforma
- **Capacitor 7.4.4**: Runtime nativo para aplicaciones web
- **TypeScript 5.9.0**: Superset tipado de JavaScript

### Capacitor Plugins
- `@capacitor/app`: Manejo del ciclo de vida de la aplicación
- `@capacitor/haptics`: Feedback háptico
- `@capacitor/keyboard`: Control del teclado nativo
- `@capacitor/status-bar`: Personalización de la barra de estado

### Herramientas de Desarrollo
- **Angular CLI**: Herramientas de línea de comandos
- **ESLint**: Linter para calidad de código
- **Karma + Jasmine**: Framework de testing
- **TypeScript**: Compilador y verificación de tipos

## Estructura del Proyecto

```
mindfocus/
├── src/
│   ├── app/
│   │   ├── tabs/              # Componente principal de navegación por pestañas
│   │   ├── tab1/              # Primera pestaña (Triangle icon)
│   │   ├── tab2/              # Segunda pestaña (Ellipse icon)
│   │   ├── tab3/              # Tercera pestaña (Square icon)
│   │   ├── explore-container/ # Componente reutilizable de contenido
│   │   ├── app.component.ts   # Componente raíz
│   │   └── app.routes.ts      # Configuración de rutas
│   ├── assets/                # Recursos estáticos
│   ├── theme/                 # Estilos globales y variables
│   └── index.html             # Punto de entrada HTML
├── angular.json               # Configuración de Angular
├── capacitor.config.ts        # Configuración de Capacitor
├── ionic.config.json          # Configuración de Ionic
├── tsconfig.json              # Configuración de TypeScript
└── package.json               # Dependencias y scripts
```

## Arquitectura de la Aplicación

### Patrón de Componentes Standalone
La aplicación utiliza el patrón moderno de **standalone components** de Angular, eliminando la necesidad de NgModules tradicionales y simplificando la arquitectura:

```typescript
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
```

### Sistema de Navegación por Pestañas
- **Tab 1**: Interfaz con icono de triángulo
- **Tab 2**: Interfaz con icono de elipse
- **Tab 3**: Interfaz con icono de cuadrado

Cada pestaña incluye:
- Header translúcido con collapse mode
- Contenido full-screen
- Componente explore-container reutilizable

### Capacitor Configuration
```typescript
appId: 'io.ionic.starter'
appName: 'mindfocus'
webDir: 'www'
```

## Requisitos Previos

- **Node.js**: v18 o superior
- **npm**: v9 o superior
- **Ionic CLI**: `npm install -g @ionic/cli`
- **Angular CLI**: `npm install -g @angular/cli`

## Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/DLeivaMorales/mindfocus.git
cd mindfocus
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Verificar instalación**
```bash
npm run lint    # Verificar calidad de código
npm run build   # Compilar proyecto
npm test        # Ejecutar tests
```

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm start` | Inicia servidor de desarrollo en http://localhost:8100 |
| `npm run build` | Compila la aplicación para producción |
| `npm test` | Ejecuta los tests unitarios con Karma |
| `npm run lint` | Verifica la calidad del código con ESLint |
| `npm run watch` | Compila en modo watch para desarrollo |

## Desarrollo

### Servidor de Desarrollo
```bash
npm start
```
La aplicación se abrirá automáticamente en `http://localhost:8100` con recarga en caliente (hot reload).

### Compilación
```bash
npm run build
```
Los archivos compilados se generarán en el directorio `www/` con un tamaño aproximado de **572.51 kB**.

### Testing
```bash
npm test
```
Ejecuta **6 tests unitarios** que verifican:
- Componente principal (AppComponent)
- Componente de pestañas (TabsPage)
- Tres páginas de pestañas (Tab1Page, Tab2Page, Tab3Page)
- Componente explore-container

## Despliegue en Plataformas Nativas

### iOS
```bash
ionic capacitor add ios
ionic capacitor sync ios
ionic capacitor open ios
```

### Android
```bash
ionic capacitor add android
ionic capacitor sync android
ionic capacitor open android
```

## Calidad del Código

El proyecto mantiene altos estándares de calidad:

- ✅ **Linting**: Configuración de ESLint con reglas de Angular
- ✅ **TypeScript Strict**: Verificación estricta de tipos
- ✅ **Tests Unitarios**: Cobertura con Jasmine + Karma
- ✅ **Componentes Standalone**: Arquitectura moderna de Angular

### Estado de Verificación

| Verificación | Estado | Resultado |
|--------------|--------|-----------|
| Linter | ✅ Pasado | Todos los archivos sin errores |
| Build | ✅ Exitoso | 572.51 kB (148.72 kB comprimido) |
| Tests | ✅ Pasado | 6/6 tests exitosos |

## Configuración de Desarrollo

### Editor Recomendado
- **Visual Studio Code** con extensiones:
  - Angular Language Service
  - ESLint
  - Ionic
  - EditorConfig

### Configuración de ESLint
El proyecto incluye configuración de ESLint con:
- Reglas de Angular (@angular-eslint)
- Reglas de TypeScript (@typescript-eslint)
- Plugins de importación y documentación JSDoc

## Roadmap y Próximos Pasos

Este es un proyecto base que puede expandirse según las necesidades:

1. **Funcionalidades Pendientes**
   - Implementar contenido específico en cada pestaña
   - Agregar autenticación de usuarios
   - Integrar servicios backend
   - Implementar almacenamiento local

2. **Mejoras Técnicas**
   - Configurar CI/CD
   - Agregar tests E2E con Cypress o Playwright
   - Implementar Progressive Web App (PWA)
   - Optimizar bundle size

3. **Plataformas Nativas**
   - Configurar builds para iOS
   - Configurar builds para Android
   - Publicar en App Store / Google Play

## Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Este proyecto está en desarrollo inicial. La licencia será definida próximamente.

## Autor

**Diego Leiva Morales**
- GitHub: [@DLeivaMorales](https://github.com/DLeivaMorales)

## Recursos Adicionales

- [Documentación de Ionic](https://ionicframework.com/docs)
- [Documentación de Angular](https://angular.io/docs)
- [Documentación de Capacitor](https://capacitorjs.com/docs)
- [Ionic CLI](https://ionicframework.com/docs/cli)


