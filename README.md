# 💳 Cesiente Bank - Aplicación Bancaria Móvil

Una aplicación bancaria móvil completa y profesional construida con tecnologías web modernas. Funciona como una Progressive Web App (PWA) que puede instalarse en dispositivos móviles y funciona offline.

![Cesiente Bank](https://github.com/user-attachments/assets/b26846c3-4559-4959-a22b-68fe5bcba773)

## 🎯 Características Principales

### ✨ Funcionalidades Bancarias
- **Autenticación de Usuarios**: Sistema completo de registro e inicio de sesión
- **Dashboard Interactivo**: Vista general del balance y transacciones recientes
- **Transferencias**: Envía dinero a otros usuarios con descripción opcional
- **Pagos y Servicios**:
  - Servicios públicos (EDENORTE, EDESUR, EDEESTE, CAASD, etc.)
  - Recargas telefónicas (Claro, Altice, Viva, Tricom)
  - Pagos de préstamos
  - Pagos de tarjetas de crédito
- **Depósitos y Retiros**: Gestión de efectivo
- **Historial de Transacciones**: Filtrado por todos/ingresos/gastos
- **Perfil de Usuario**: Información de cuenta y configuración

### 🚀 Características Especiales
- **Progressive Web App (PWA)**: Instálala como app nativa en tu dispositivo
- **Modo Offline**: Funciona sin conexión a internet gracias al Service Worker
- **Animaciones de Loading**: Feedback visual profesional para todas las acciones
- **Notificaciones Toast**: Confirmaciones y alertas amigables
- **Diseño Responsive**: Optimizado para dispositivos móviles
- **Touch-Friendly**: Interfaz diseñada para interacciones táctiles
- **Almacenamiento Local**: Los datos persisten localmente en el navegador

## 📱 Capturas de Pantalla

| Login | Dashboard | Transferencias |
|-------|-----------|----------------|
| ![Login](https://github.com/user-attachments/assets/b26846c3-4559-4959-a22b-68fe5bcba773) | ![Dashboard](https://github.com/user-attachments/assets/6170f142-6d7c-425a-98ed-6da4847425d1) | ![Transfer](https://github.com/user-attachments/assets/380e2672-6852-4fe0-8bda-4aa410d14c31) |

| Pagos | Registro |
|-------|----------|
| ![Payments](https://github.com/user-attachments/assets/75a22717-0269-4bf4-9549-32b954c9d4c9) | ![Register](https://github.com/user-attachments/assets/de777811-cde1-4c0e-96b0-53a3680e054d) |

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Diseño moderno con variables CSS y flexbox/grid
- **JavaScript (Vanilla)**: Lógica de la aplicación sin frameworks
- **Service Worker**: Soporte offline y cacheo de recursos
- **Web Storage API**: Almacenamiento local de datos
- **PWA Manifest**: Configuración para instalación como app nativa

## 🚀 Inicio Rápido

### Opción 1: Servidor Local Simple

```bash
# Con Python 3
python3 -m http.server 8080

# O con Python 2
python -m SimpleHTTPServer 8080

# Con Node.js (npx)
npx http-server -p 8080

# Con PHP
php -S localhost:8080
```

Luego abre tu navegador en `http://localhost:8080`

### Opción 2: Despliegue en GitHub Pages

1. Ve a Settings → Pages
2. Selecciona la rama `main` como fuente
3. La app estará disponible en `https://tu-usuario.github.io/cesiente-cooperativa-app`

### Opción 3: Otros Servicios de Hosting

- **Netlify**: Arrastra la carpeta del proyecto
- **Vercel**: Conecta el repositorio de GitHub
- **Firebase Hosting**: `firebase deploy`

## 📲 Instalar como PWA

### En Android (Chrome/Edge)
1. Abre la aplicación en el navegador
2. Toca el menú (⋮) → "Agregar a pantalla de inicio"
3. Confirma la instalación
4. La app aparecerá como icono en tu pantalla de inicio

### En iOS (Safari)
1. Abre la aplicación en Safari
2. Toca el botón "Compartir" (□↑)
3. Selecciona "Agregar a pantalla de inicio"
4. Confirma para crear el acceso directo

### En Desktop (Chrome/Edge)
1. Abre la aplicación en el navegador
2. Busca el icono de instalación (+) en la barra de direcciones
3. Click en "Instalar" o usa el menú → "Instalar Cesiente Bank"

## 💻 Estructura del Proyecto

```
cesiente-cooperativa-app/
├── index.html          # Página principal con todas las pantallas
├── styles.css          # Estilos CSS responsivos
├── app.js              # Lógica de la aplicación
├── service-worker.js   # Service Worker para PWA y modo offline
├── manifest.json       # Configuración PWA
├── icon-192.png        # Icono de la app (192x192)
├── icon-512.png        # Icono de la app (512x512)
├── .gitignore          # Archivos ignorados por Git
└── README.md           # Este archivo
```

## 🔐 Seguridad

**⚠️ IMPORTANTE**: Esta es una aplicación de demostración. En producción:

- ✅ Implementar autenticación real con backend seguro
- ✅ Usar HTTPS obligatoriamente
- ✅ Encriptar datos sensibles
- ✅ Implementar tokens JWT o similar
- ✅ Validación de entrada en servidor
- ✅ Protección contra CSRF y XSS
- ✅ Rate limiting para prevenir ataques
- ✅ Auditorías de seguridad regulares

## 🧪 Pruebas de Usuario

Para probar la aplicación, puedes:

1. **Crear una nueva cuenta** con el formulario de registro
2. O usar estas credenciales de prueba (si ya existe un usuario):
   - Usuario: `demo`
   - Contraseña: `demo123`

El balance inicial incluye un bono de bienvenida de RD$1,000.00

## 🌟 Funcionalidades Futuras

- [ ] Integración con backend real
- [ ] Notificaciones push
- [ ] Autenticación biométrica
- [ ] Generación de reportes PDF
- [ ] Gráficos de gastos
- [ ] Programación de pagos recurrentes
- [ ] Chat de soporte en vivo
- [ ] Múltiples cuentas por usuario
- [ ] Conversión de divisas
- [ ] Exportar historial a CSV/Excel

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👥 Autores

- **Abraham Reyes Pérez** - Desarrollo inicial

## 🙏 Agradecimientos

- Iconos emoji utilizados para una experiencia visual amigable
- Inspiración de aplicaciones bancarias modernas
- Comunidad de desarrolladores web

## 📞 Soporte

Si encuentras algún problema o tienes sugerencias:

- Abre un [Issue](https://github.com/abrahamreyesperez804-lang/cesiente-cooperativa-app/issues)
- Contacta al equipo de desarrollo

---

**Hecho con ❤️ para la comunidad bancaria cooperativa**
