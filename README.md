👟 MiniPassos — Children's Shoe Store

A web application for a children's shoe store, developed with Java + Spring Boot on the backend and HTML, CSS, and JavaScript on the frontend.

The project allows customers to browse products, search and filter shoes, manage their shopping cart, and place orders through WhatsApp. It also includes an administrative panel for product management.

🚀 Features

🛍️ Store

Browse available products
Search products by name and description
Filter products by style
View product information:
Name
Price
Description
Image
Style
Variations
Shopping cart
Order confirmation through WhatsApp
Responsive interface for mobile devices

⚙️ Admin Panel
Add new products
Edit existing products
Delete products
View available products
Manage:
Name
Price
Image
Description
Style

🛠️ Technologies
Backend
Java 17
Spring Boot 3.2.4
Spring Web
Spring Data JPA
Hibernate
PostgreSQL
H2 Database
Maven

Frontend
HTML5
CSS3
JavaScript
Google Fonts — Poppins

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
