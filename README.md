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

#### Please note that the backend is expecting to connect to a MySQL or MariaDB server with tables initialized by these commands:
```SQL
CREATE TABLE types (
	id_type INTEGER AUTO_INCREMENT UNIQUE,
	name VARCHAR(500),
	PRIMARY KEY (id_type)
);

CREATE TABLE departments ( 
	id_department INTEGER AUTO_INCREMENT UNIQUE, 
	department_name VARCHAR(500) NOT NULL, 
	show_department BOOLEAN NOT NULL,
	PRIMARY KEY (id_department)
);

CREATE TABLE forms (
	id_form INTEGER AUTO_INCREMENT UNIQUE,
	id_type INTEGER NOT NULL,
	id_department INTEGER NOT NULL,
	subject VARCHAR(500) NOT NULL,
	description TEXT,
	resolved BOOLEAN NOT NULL,
	PRIMARY KEY (id_form),
	FOREIGN KEY (id_type) REFERENCES types(id_type) ON DELETE CASCADE,
	FOREIGN KEY (id_department) REFERENCES departments(id_department) ON DELETE CASCADE
);
```
