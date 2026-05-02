# MejoraDA
### Platform for centralising communications with DA-ETSISI (UPM).  

Made by [@marcosrica](https://github.com/marcosrica) with ❤️ for [@DA-ETSISI](https://github.com/DA-ETSISI). 

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

> [!WARNING]
> Before running the database creation tool, you must have set up a new empty database and the proper configuration in the keys.ts document on the backend. For more info on keys.ts, refer to keys.ts.example

```bash
cd backend
npm install
npm run create-db #Creates the database and seeds it with the types of forms, basic departments and an admin user
npm run dev
```
