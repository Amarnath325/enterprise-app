# Enterprise App Setup Manual

## Project Overview
This is a Laravel 12 + React application with decoupled architecture.

**Tech Stack:**
- Backend: Laravel 12.0 (PHP 8.2+)
- Frontend: React 19.2.0 + Vite
- Database: MySQL 8.0+ or SQLite
- Development Tools: Composer, Node.js 18+, Git
git 
---

## System Requirements

### Minimum Requirements:
- **PHP**: 8.2 or higher
- **Node.js**: 18+ (LTS recommended)
- **Composer**: Latest version
- **Git**: Latest version
- **Database**: MySQL 8.0+ or SQLite
- **RAM**: 4GB minimum
- **Storage**: 2GB free space

### Recommended:
- **PHP**: 8.3
- **Node.js**: 20 LTS
- **MySQL**: 8.0
- **RAM**: 8GB
- **VS Code** with extensions

---

## Installation Guide

### Step 1: Install Dependencies

#### Windows (using Chocolatey):
```bash
# Install PHP
choco install php

# Install Node.js (download from nodejs.org)
# Install Composer (download from getcomposer.org)
# Install Git (download from git-scm.com)
```

#### Linux/Ubuntu:
```bash
# Update system
sudo apt update

# Install PHP 8.2+
sudo apt install php8.2 php8.2-cli php8.2-common php8.2-mysql php8.2-zip php8.2-gd php8.2-mbstring php8.2-curl php8.2-xml php8.2-bcmath

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Install Git
sudo apt install git
```

#### macOS:
```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install PHP
brew install php

# Install Node.js
brew install node

# Install Composer
brew install composer

# Install Git
brew install git
```

### Step 2: Verify Installations
```bash
# Check versions
php --version          # Should be 8.2+
node --version         # Should be 18+
npm --version          # Should be 9+
composer --version     # Should be 2.x
git --version          # Should be 2.x
```

---

## Project Setup

### Step 1: Clone Repository
```bash
git clone https://github.com/Amarnath325/enterprise-app.git
cd enterprise-app
```

### Step 2: Install Laravel Dependencies
```bash
composer install
```

### Step 3: Environment Configuration
```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### Step 4: Database Setup

#### Option A: MySQL
```bash
# Create database
mysql -u root -p
CREATE DATABASE enterprise_app;
EXIT;

# Update .env file
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=enterprise_app
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

#### Option B: SQLite (Simpler)
```bash
# Create SQLite database
touch database/database.sqlite

# Update .env file
DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/database/database.sqlite
```

### Step 5: Run Migrations
```bash
php artisan migrate
```

### Step 6: Install React Dependencies
```bash
cd frontend
npm install
cd ..
```

---

## Development Commands

### Start Development Servers
```bash
# Start all servers (Laravel + React + Queue)
composer run dev
```

### Individual Commands
```bash
# Laravel server only
php artisan serve

# React/Vite dev server only
cd frontend && npm run dev

# Queue worker
php artisan queue:listen
```

### Build Commands
```bash
# Build React for production
cd frontend && npm run build

# Laravel cache clear
php artisan config:clear
php artisan cache:clear
php artisan route:clear
```

---

## Project Structure

```
enterprise-app/
├── app/                    # Laravel application code
├── bootstrap/              # Laravel bootstrap
├── config/                 # Configuration files
├── database/               # Migrations, seeders
├── frontend/               # React application
│   ├── src/               # React source code
│   ├── public/            # Static assets
│   └── package.json       # React dependencies
├── public/                 # Laravel public assets
├── resources/             # Laravel views, assets
├── routes/                # Route definitions
├── storage/               # File storage
├── tests/                 # Test files
├── vendor/                # Composer dependencies
├── composer.json          # Laravel dependencies
├── package.json           # Root package.json
└── vite.config.js         # Vite configuration
```

---

## Key Dependencies

### Laravel Dependencies (composer.json)
- **laravel/framework**: ^12.0
- **laravel/tinker**: ^2.10.1
- **fakerphp/faker**: ^1.23 (dev)
- **laravel/pail**: ^1.2.2 (dev)
- **laravel/pint**: ^1.24 (dev)
- **laravel/sail**: ^1.41 (dev)
- **mockery/mockery**: ^1.6 (dev)
- **nunomaduro/collision**: ^8.6 (dev)
- **phpunit/phpunit**: ^11.5.3 (dev)

### React Dependencies (frontend/package.json)
- **react**: ^19.2.0
- **react-dom**: ^19.2.0
- **@vitejs/plugin-react**: ^5.1.1 (dev)
- **@eslint/js**: ^9.39.1 (dev)
- **@types/react**: ^19.2.7 (dev)
- **@types/react-dom**: ^19.2.3 (dev)
- **eslint**: ^9.39.1 (dev)
- **vite**: ^7.3.1 (dev)

---

## URLs and Ports

- **Laravel API/Server**: http://127.0.0.1:8000
- **React Development**: http://localhost:5173
- **Database**: localhost:3306 (MySQL) or SQLite file

---

## Common Issues & Solutions

### Issue 1: "pcntl extension required"
**Solution**: Remove `pail` from composer.json dev script (Windows compatibility)

### Issue 2: "npm not recognized"
**Solution**: Install Node.js properly and restart terminal

### Issue 3: "composer not found"
**Solution**: Add composer to PATH or use full path

### Issue 4: Database connection failed
**Solution**: Check .env database credentials and ensure database exists

### Issue 5: Port already in use
**Solution**: Change port in .env or kill process using port

---

## Development Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Edit code in appropriate files
   - Test changes locally

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "Add: feature description"
   ```

4. **Push to GitHub**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Go to GitHub repository
   - Create PR from your branch to main
   - Wait for approval and merge

---

## Git Branch Strategy

- **main**: Production code (protected)
- **development**: Development branch
- **feature/***: Feature branches
- **hotfix/***: Bug fixes

**Branch Protection Rules:**
- Require pull request before merging
- Require approvals
- Require status checks
- No force pushes allowed

---

## Testing

### Run Tests
```bash
# Laravel tests
php artisan test

# Frontend linting
cd frontend && npm run lint
```

---

## Deployment

### Production Build
```bash
# Build React assets
cd frontend && npm run build

# Laravel production optimizations
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Environment Variables
Set production values in .env:
```
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com
```

---

## Support & Resources

- **Laravel Docs**: https://laravel.com/docs
- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev
- **Composer**: https://getcomposer.org
- **Node.js**: https://nodejs.org

---

## Quick Start Checklist

- [ ] Install PHP 8.2+
- [ ] Install Node.js 18+
- [ ] Install Composer
- [ ] Install Git
- [ ] Clone repository
- [ ] Run `composer install`
- [ ] Copy `.env.example` to `.env`
- [ ] Run `php artisan key:generate`
- [ ] Setup database
- [ ] Run `php artisan migrate`
- [ ] Run `cd frontend && npm install`
- [ ] Run `composer run dev`
- [ ] Open http://127.0.0.1:8000

---

*Generated on: March 10, 2026*
*Version: 1.0*
*Project: Enterprise App (Laravel + React)*