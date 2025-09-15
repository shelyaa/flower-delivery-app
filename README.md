# Flower Delivery App 🌸

**Live Demo:** [https://flower-delivery-app-shrl.vercel.app/](https://flower-delivery-app-shrl.vercel.app/)

## Levels of Implementation

### Base Level
-  All requirements were fully implemented.


### Middle Level
- All requirements were fully implemented.

### Advanced Level
 - **Flower Shops Page:**  
 Add pagination to make browsing the list of flowers more convenient and optimized for
large catalogs.

- **Shopping Cart Page:**  
 Add Google Maps: users can choose their delivery address using a pin on the map or just enter an
address, and it will be shown on the map.


### Additional Features
- Users can find their orders using their email and phone number, or order ID.
- Responsive design for mobile and tablet devices.

## Technologies
- React, TypeScript
- Redux Toolkit
- Express, PostgreSQL 
- Google Maps API
- TailwindCSS

## API Endpoints

### /flowers

- `GET /flowers` – Get a list of all flowers 
- `PATCH /flowers/{id}/favorite` – Mark or unmark a flower as a favorite 

### /shops

- `GET /shops` – Get a list of all flower shops 

### /orders

- `GET /orders` – Get a list of all orders
- `GET /orders/search` – Search orders with filters 
- `GET /orders/{id}` – Get details of a specific order by ID 
- `POST /orders` – Create a new order 

