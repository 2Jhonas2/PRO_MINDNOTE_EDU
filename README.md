# 🧠 MindNote.EDU

**MindNote.EDU** es una aplicación de agendamiento inteligente e inclusiva que permite a cualquier persona organizar sus tareas, recibir notificaciones, mantener un historial de actividades y personalizar su experiencia con funciones de accesibilidad.

## 🚀 Tecnologías utilizadas

**Frontend**
- React + Vite
- CSS3

**Backend**
- Node.js + NestJS
- Prisma ORM
- MySQL
- dotenv

**DevOps y control de versiones**
- Git + GitHub
- GitHub Actions (CI/CD)
- Linters (Stylelint, Webhint)

---

## 📂 Estructura del proyecto

```
PRO_MINDNOTE.EDU/
│
├── .github/workflows/           # Automatizaciones y CI/CD
│   └── linters.yml
│
├── backend/                     # Lógica y API del servidor
│   ├── .env                     # Variables de entorno del backend
│   ├── prisma/                  # Esquema y migraciones de Prisma
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── generated/               # Cliente generado por Prisma
│   │   └── prisma/
│   ├── src/                     # Código fuente del backend (NestJS)
│   │   ├── login/               # Módulo de autenticación
│   │   │   ├── login.service.ts
│   │   │   └── ...
│   │   ├── usuario/             # Módulo de usuarios
│   │   ├── tarea/               # Módulo de tareas
│   │   ├── notificacion/        # Módulo de notificaciones
│   │   └── ...
│   ├── main.ts                  # Punto de entrada de NestJS
│   ├── package.json             # Dependencias y scripts del backend
│   └── README.md                # Documentación del backend
│
├── frontend/                    # Aplicación cliente
│   ├── public/                  # Archivos estáticos
│   │   └── index.html
│   ├── src/                     # Código fuente del frontend
│   │   ├── assets/              # Recursos estáticos
│   │   │   ├── css/
│   │   │   └── imgs/
│   │   ├── styles/              # Estilos CSS por página
│   │   │   ├── Register.css
│   │   │   └── Login.css
│   │   ├── pages/               # Vistas principales
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx    # (por crear)
│   │   ├── app.jsx              # Componente raíz
│   │   ├── main.jsx             # Punto de arranque de React
│   │   └── ...
│   ├── package.json             # Dependencias y scripts del frontend
│   └── vite.config.js           # Configuración de Vite
│
├── node_modules/                # Dependencias instaladas (autogenerado)
│
├── .env                         # Variables de entorno globales
├── .gitignore                   # Archivos/carpetas ignorados por Git
├── .hintrc                      # Configuración de Webhint
├── stylelint.rc.json            # Configuración de Stylelint
├── Git_Workflow.md              # Guía de flujo de trabajo con Git
├── Guia_EstandaresCod.md        # Guía de estándares de codificación
├── package.json                 # Dependencias y scripts generales
├── package-lock.json            # Versiones exactas de dependencias
└── README.md                    # Documentación principal
```

---

## ⚙️ Instalación y uso

1. **Clona el repositorio**
   ```
   git clone https://github.com/tu-usuario/PRO_MINDNOTE_EDU.git
   ```

2. **Instala dependencias**
   - Backend:
     ```
     cd backend
     npm install
     npx prisma generate
     npx prisma migrate deploy
     npm install bcrypt
     npm install --save-dev @types/bcrypt
     npm i @nestjs/jwt jsonwebtoken
     npm i -D @types/jsonwebtoken
     npm i jwt-decode



     ```
   - Frontend:
     ```
     cd frontend
     npm install
     npm i jwt-decode
     ```

3. **Configura las variables de entorno**
   - Edita el archivo `.env` en `backend/` con los datos de tu base de datos MySQL.

4. **Ejecuta el backend**
   ```
   npm run start:dev
   ```

5. **Ejecuta el frontend**
   ```
   npm run dev
   ```

---

## 📌 Convenciones y guías

- Código limpio y estandarizado → Ver `Guia_EstandaresCod.md`
- Flujo de trabajo con Git → Ver `Git_Workflow.md`
- Validaciones automáticas → Linters y herramientas configuradas (Stylelint, Webhint)

---

## 👩‍💻 Desarrollado por

Laura Buritica

---

## 📄 Licencia

Este proyecto está bajo