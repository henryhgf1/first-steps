👟 MiniPassos — Children's Shoe Store

A web application for a children's shoe store, developed with Java + Spring Boot on the backend and HTML, CSS, and JavaScript on the frontend.

The project allows customers to browse products, search and filter shoes, manage their shopping cart, and place orders through WhatsApp. It also includes an administrative panel for product management.

---

🚀 Features

🛍️ Store

- Browse available products
- Search products by name and description
- Filter products by style
- View product information:
  - Name
  - Price
  - Description
  - Image
  - Style
  - Variations
- Shopping cart
- Order confirmation through WhatsApp
- Responsive interface for mobile devices

⚙️ Admin Panel

- Add new products
- Edit existing products
- Delete products
- View available products
- Manage:
  - Name
  - Price
  - Image
  - Description
  - Style

---

🛠️ Technologies

Backend

- Java 17
- Spring Boot 3.2.4
- Spring Web
- Spring Data JPA
- Hibernate
- PostgreSQL
- H2 Database
- Maven

Frontend

- HTML5
- CSS3
- JavaScript
- Google Fonts — Poppins

---

📂 Project Structure

first-steps/
│
├── calcados/
│   └── calcados/
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/
│       │   │   │   └── com/loja/calcados/
│       │   │   │       ├── controller/
│       │   │   │       ├── model/
│       │   │   │       └── repository/
│       │   │   │
│       │   │   └── resources/
│       │   │       └── application.properties
│       │   │
│       │   └── test/
│       │
│       ├── pom.xml
│       └── Dockerfile
│
└── frontend/
    ├── index.html
    ├── admin.html
    │
    └── src/
        ├── assets/
        │   └── img/
        ├── css/
        │   └── style.css
        └── js/
            ├── app.js
            └── admin.js

---

🔌 REST API

The application provides a REST API for product management.

Get all products

GET /api/produtos

Returns all registered products.

Create a product

POST /api/produtos

Example request:

{
  "nome": "Children's Sports Sneakers",
  "preco": 149.90,
  "imagemUrl": "src/assets/img/tenis-esportivo-feminino.webp",
  "descricao": "Comfortable sneakers for sports activities.",
  "categoriaFaixaEtaria": "Children",
  "estilo": "sports"
}

Update a product

PUT /api/produtos/{id}

Updates the information of an existing product.

Delete a product

DELETE /api/produtos/{id}

Deletes a product by its ID.

Filter products by style

GET /api/produtos?estilo=esportivo

Available styles include:

casual
sports
social
streetwear

---

⚙️ Setup

Prerequisites

Make sure you have the following installed:

- Java 17+
- Maven
- PostgreSQL
- Git

Check your Java version:

java -version

---

▶️ Running the Backend

Navigate to the Spring Boot project:

cd calcados/calcados

Run the application using the Maven Wrapper.

Windows

./mvnw.cmd spring-boot:run

Linux / macOS

./mvnw spring-boot:run

The backend will start on the configured Spring Boot port.

---

🌐 Running the Frontend

Open:

frontend/index.html

You can run the frontend directly in your browser or use an extension such as Live Server in VS Code.

«Make sure the backend is running so the frontend can communicate with the REST API.»

---

🗄️ Database

The project uses Spring Data JPA for data persistence.

The main entity is:

Product

It contains information such as:

id
name
description
price
imageUrl
ageCategory
style
variations

The project also includes a "ProductVariation" entity to support different variations of each product.

---

🖥️ Application Pages

Store

The main page includes:

- Store banner
- Product search
- Product categories
- Product showcase
- Shopping cart

Admin Panel

The administration panel allows users to manage the store's products through CRUD operations:

CREATE → Add a product
READ   → View products
UPDATE → Edit a product
DELETE → Remove a product

---

📌 Project Status

🚧 In Development

This project was developed for learning and practicing:

- Java
- Spring Boot
- REST APIs
- Spring Data JPA
- Database integration
- Frontend development
- Backend and frontend integration
- CRUD operations

---

👨‍💻 Author

Henry Gabriel Ferreira

Developed for educational purposes and software development practice.
