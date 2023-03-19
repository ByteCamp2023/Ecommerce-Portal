# E-Commerce-Farming
A E-Commerce website for farmers

The following text describes various features available on a platform. These features include a chatbot, seller profile, product management (addition and deletion), profile editing, and personal/company address addition/editing. Additionally, there is a farmer profile that allows for grain addition/deletion, profile editing, and address addition/editing. Farmers can also sell seeds/pesticides or rent machines, and can buy loans and credit cards. Consumers have the ability to edit their profiles, add/edit their addresses, purchase materials directly from farmers, and use the PayPal gateway for payments. Other features available to consumers include a cart page where they can adjust quantities and remove products.

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = your jwt secret
PAYPAL_CLIENT_ID = your paypal client id
```
Create a .env file inside frontend and add the following

```
REACT_APP_GOOGLE_KEY = "add google map api key"
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```



