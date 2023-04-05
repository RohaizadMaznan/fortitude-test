# Fourtitude Asia PHP App Dev Laravel

This is application will be using NextJS 13 + Laravel 10. The laravel will handle all the backend API's 'api/v1/products'

## Installation & Usage

### To Run Front-end Server

Requirement:

- npm: v6.14.17 and above
- node: v14.21.2 and above

```bash
cd frontend
npm install
npm run dev
```

### To Run Back-end Server

This application using Laravel 10, it should be compatible with previous version.

#### 1st step

Open xampp and start 'Apache' + 'Mysql'

#### 2nd step

```bash
cd backend
mysql -uroot -p -e "CREATE DATABASE fortitude_test_api"
```

then,

```bash
php artisan migrate
php artisan db:seed --class=ProductSeeder
php artisan serve
```
