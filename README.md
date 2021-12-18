# Devout - A Full-stack E-commerce application:

## Summary: 
Pre-built tools such as SnipCart and Shopify minimize the amount of work and time involved in building modern e-commerce applications. In order to fully appreciate the processes behind an ecommerce store, I decided to build one from the ground up. Although building everything from the ground up was the goal. I still had to use third-party services such as Stripe, in order to reduce the complexity of the project.

## Technology used:
- Node Js
- React
- SendGrid 
- Stripe
- Docker 
- Bootstrap


## Setup

### API
#### Clone the repo: 
```
git checkout api
```

#### Requirements:
- Node JS: 12.19.0 and up
- Docker(optional)
- Sendgrid, Cloudinary, Stripe account

#### To get started you will need to sign up for the following accounts: 

1. SendGrid: 
 - Create a send grid account and set up your email templates
 - Get your api key

2. Stripe:
 - Get your api-key
 - Get your publishing key

3. Cloudinary: 
 - Get your api key

#### Setup your Postgres docker file
```
version: "3.1"
 
services:
  db:
    image: postgres
    restart: always
    ports:
      - 5432:5432
    environment:
      POSTGRES_USER: <<Your User >>
      POSTGRES_PASSWORD: << Your password >>
    volumes:
      - ./scripts:/docker-entrypoint-initdb.d
 ```



 
#### Initialize your container
```
docker-compose up 
```

#### Create your env file:
```
(Replace with your own)
PGDATABASE=
PGPORT=
PGHOST=
PGUSER=
PGPASSWORD=

#Token secret
JWT_EXPIRY=
JWT_SECRET=

#stripe
STRIPE_KEY=

#Client
CLIENT_URL=http://localhost:3000

#Cloudinary
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET_KEY=

#Sendgrid 
SENDGRID_API_KEY=
SENDER_EMAIL=
```
#### Run:
```
npm install 
npm run dev
```
### Client

#### Run
```
git checkout web
```

#### Create .env file
```
REACT_APP_LOCAL_API= <<The API address >>
REACT_APP_STRIPE_API_KEY=<<Stripe Client Key>>
```

#### Run
``` 
npm install
npm start
```

## Features: 

- Backend Portal 
- Client Portal 
- Client Account System 
- Stripe Payments


