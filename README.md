# MejoraDA
### Platform for centralising communications with DA-ETSISI (UPM).  

MejoraDA is a web platform designed to collect, organize, and manage student and proffesor's suggestions, feedback, and improvement ideas for the student representatives of ETSI-SI (UPM).    

The goal of the project is to create a simple channel that enables the representatives to track down and take action about what the school really needs.  

  
  
## ✨ Features

- Submit suggestions, complaints, and ideas through a web UI.

- Clean, responsive frontend built with Vue + Vite + TypeScript.

- Organized feedback storage and retrieval.


## 🛠️ Tech Stack
### Frontend
- Vue (v 3.5 or higher)

- Vite (v 7.2.4 or higher)

- TypeScript (v 5.9.3)


### Backend

- Express (v 5.20 or higher)

- Typescript (v 5.9.3 or higher)


## 🚀 Getting Started
### Installation
```bash
git clone https://github.com/marcosrica/MejoraDA.git
cd MejoraDA
```
  
### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

#### Please note that the backend is expecting to connect to a MySQL server with tables initialized by these commands:
```SQL
CREATE TABLE ideas (
    `request_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `department` TEXT NOT NULL,
    `subject` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `solved` BOOLEAN NOT NULL DEFAULT FALSE
    `date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE suggestions (
    `request_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `department` TEXT NOT NULL,
    `subject` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `solved` BOOLEAN NOT NULL DEFAULT FALSE
    `date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE complaints (
    `request_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `department` TEXT NOT NULL,
    `subject` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `solved` BOOLEAN NOT NULL DEFAULT FALSE
    `date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
