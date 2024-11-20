<a name="readme-top"></a>

# 🛒 Things Shop - ecommerce

<p align="center">
  <img src="https://github.com/user-attachments/assets/822c2d6f-f9a9-47d7-88dd-e39aeb2df04d" alt="Things shop icon" width="100" />
  <br>
  <em>Minimalist ecommerce built with Nextjs, Tailwind and Zustand. Server components, server actions, integrated with PayPal for payments, and Cloudinary for product image storage.</em>
  <br>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
  •
  <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" />
  •
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  •
  <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" />
  <br>
  <img src="https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white" /> 
  •
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" />
  •
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
</p>

<p align="center">
  <strong><a href="https://thingsshop.vercel.app/" target="_blank">Preview here</a></strong>
</p>

## About Things Shop

Things Shop is a high-performance, minimalist ecommerce application built with [Next.js](https://nextjs.org) 14 and [Tailwind](https://tailwindcss.com/). Server-rendered Next.js App Router pages. With users, products and inventory managements systems powered by [Prisma](https://www.prisma.io/) and integrates PayPal for secure payment processing. Product images are handled by Cloudinary, ensuring fast and efficient image delivery.

See the [demo here](https://thingsshop.vercel.app/).

![438_1x_shots_so](https://github.com/user-attachments/assets/5f491e14-5c6a-41bb-a084-b825b915ed6b)

> [!IMPORTANT]
> This is an e-commerce carried out in the course *Next.js: The React framework for production* by @klerith.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: Zustand
- **Payments**: PayPal Integration
- **Image Hosting**: Cloudinary
- **Language**: TypeScript
- **Authentication**: Custom implementation

## 🚀 Features

- 🛍️ **Ecommerce Essentials**: Add products to a cart, manage inventory, and process payments securely with PayPal.
- 📦 **Dynamic Product Management**: Easily manage products and stock with the Prisma ORM.
- 🌐 **Server Actions**: Optimized with server components for fast rendering.
- 🖼️ **Efficient Image Handling**: Product images stored and delivered via Cloudinary.
- 🔐 **Authentication**: Custom auth implementation for login with [Auth.js](https://authjs.dev/).
- 👥 **Role based route protection**: Allows certain users to get specific pages based on the user's role.
- 📱 **Responsive Design**: Ensure accesibility from all devices.

## 🖼️ Screenshoots
<p align="center">
<img src="https://github.com/user-attachments/assets/6e897894-39f6-459c-ad2d-31d59bebb4b4" width='700' align="center">
</p>
<p align="center">
<img src="https://github.com/user-attachments/assets/d958e1ac-b0e4-4ee2-acb6-5a3832680907" width='700' align="center">
</p>
<p align="center">
<img src="https://github.com/user-attachments/assets/d82c28d4-6ab8-4e57-8427-5f46b9ad23ac" width='700' align="center">
</p>

## 🗃️ Folder structure

```bash
prisma/                            # Prisma ORM Configs
public/
└── images/                        # Seed products images
    └── ...
src/
├── actions/                       # Server actions
├── app/                           # App routing folder
├── components/                    # Components
├── config/                        # Configuration files
├── lib/                           # Prisma utilities
├── models/                        # Interfaces and types
├── seed/                          # Development seed script
├── store/                         # Zustand global state
├── utils/                         # Utility functions
├── auth.ts
└── middleware.ts

```

## Getting Started

### Development:

1. Clone the project:
   
   ```bash
   git clone https://github.com/USpiri/things-shop.git
   ```
   
   Or just [click here](https://github.com/USpiri/things-shop/fork).
   
2. Go to the folder application.
   
   ```bash
   cd things-shop
   ```
   
3. Copy `.env.template` and rename it to `.env`.
4. Update the `.env` file with your environment variables.
5. Install dependencies:

   ```bash
   npm install
   ```
   
6. Set up the database using Docker:
    
    ```bash
   docker compose up -d
    ```

7. Apply Prisma migrations:
    
    ```bash
   npx prisma migrate dev
    ```

8. Seed the database with sample data:
    
    ```bash
   npm run seed
    ```
    > **Note:** After running the seed script, clear your browser's local storage and cookies to avoid data conflicts.
    
9. Start the development server:
    
    ```bash
   npm run dev
    ```

10. Open [http://localhost:3000](http://localhost:3000) in your browser.
11. Clear Local Storage and Cookies.

### Build:

```
npm run build
```

# 🤝 Contribution Guidelines

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

<p align="right"><a href="#readme-top">Back to top ⬆️</a></p>
