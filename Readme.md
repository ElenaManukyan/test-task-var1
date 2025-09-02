# Test Task – Web Application (ExtJS)
---

## Technologies  
![ExtJS](https://img.shields.io/badge/ExtJS-6.0.0-blue?style=flat&logo=extjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=flat&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)

---
## Description
This is a test task for a web application developed using ExtJS. The application includes a login screen, a main window with tabs, a products list, and product cards with editable details. The functionality follows the specifications provided in the task description.

## Demo
<img width="1920" height="769" alt="image" src="https://github.com/user-attachments/assets/70a7b920-2d8d-4dba-ba5d-908f73ac8db1" />
  
---

## Features

### 1. Login
- Displays a login form with fields `Username` and `Password` and a `Login` button.
- Correct credentials: `admin` / `padmin`.
- Displays an error message on invalid login.
- Redirects to the main window upon successful login.

### 2. Main Window
- Contains `Products` button, `Logout` button, and a tab panel.
- Clicking `Logout` returns to the login screen and clears input fields.
- Clicking `Products` opens a new tab for the products list.

### 3. Products Tab
- Two filters:
  - By product ID (exact match)
  - By product description (partial match)
- Filters work on `Enter` key press.
- Products table contains columns:
  - **ID** (integer)  
  - **Name** (string)  
  - **Description** (string)  
  - **Price** (float)  
  - **Quantity** (integer)  
- Quantity cells with zero are highlighted in red.
- Data is stored in a local `Store` object.

### 4. Product Card
- Clicking a product name opens a product card.
- Editable fields: `Price` and `Quantity`
  - Price: non-negative float
  - Quantity: non-negative integer
- `Cancel` button closes the card without saving.
- `Save` button shows a confirmation if data was changed, then saves updates.
  
## How to Run
1. Install Global Tools:
```bash
npm install -g sencha-cmd
npm install -g @sencha/ext-gen
```
- ```sencha-cmd```- is required for building Ext JS projects.
- ```@sencha/ext-gen```- is an Ext JS project generator.
2. Clone the repository:  
```bash
git clone https://github.com/ElenaManukyan/test-task-var1.git
cd test-task-var1
```
3. Install dependencies:
```bash
npm install
```
4. Run:
```bash
npm start
```

## Notes
- The UI may differ slightly from the examples provided in the task; layout and colors were adjusted for clarity.
- Validation is implemented for numeric inputs in product cards.
- ExtJS components used:
  - ```Ext.form.Panel``` for product card
  - ```Ext.grid.Panel``` for product list
  - Tab panels for multi-tab interface
