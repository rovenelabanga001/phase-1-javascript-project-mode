# Personal Expenditure Tracker SPA

This is a **Personal Expenditure Tracker** Single Page Application (SPA) built using vanilla JavaScript. The application allows users to track their income and expenses, edit transactions, delete transactions, and view a summary of their transactions. It is designed to store data using a JSON server, and all interactions with the transaction data are managed via API requests.

## Features

- **Add New Transactions**: Users can add a new transaction specifying the type (income or expense), amount, category, date, and description.
- **Edit Transactions**: Users can click on a transaction to update its details.
- **Delete Transactions**: Users can remove any transaction they no longer need.
- **Transaction Summary**: Automatically calculates total income, expenses, and the current balance.
- **Search Functionality**: Users can search for transactions by type or category.
- **Date Display**: The current date is displayed on the page.

## Technologies Used

- **HTML**: For the structure of the application.
- **CSS**: For styling the application.
- **JavaScript**: The core logic of the SPA, including DOM manipulation, event handling, and API calls.
- **JSON Server**: A local JSON server to store and retrieve transaction data.
- **Font Awesome**: For icons used in the application.

## Getting Started

### Prerequisites

Before starting, make sure you have the following:

- A modern web browser (Chrome, Firefox, Edge, etc.).
- A basic understanding of JavaScript and APIs.

### Setup

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/personal-expenditure-tracker.git
    cd personal-expenditure-tracker
    ```

2. **Install Dependencies**:
    No additional libraries or dependencies are required, as this is a pure vanilla JavaScript project. The backend already contains the necessary node modules.

3. **Run the JSON Server**:
    ```bash
    npm install
    npm run server
    ```

4. **Configure the base URL**:
    - The `baseURL` is set to interact with the JSON server API:

    ```javascript
    const baseURL = "https://phase-1-javascript-project-mode.onrender.com/transactions";
    ```

5. **Run the Application**:
    - Open the `index.html` file in your browser to view and interact with the expenditure tracker.
## Live Site

Check out the live version of the project [here](https://rovenelabanga001.github.io/phase-1-javascript-project-mode/).

## Author

- **Rovenel Abanga**  
  GitHub: [rovenelabanga001](https://github.com/rovenelabanga001)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


## Project Structure

```bash
├── backend/
│   ├── db.json                  # Database file containing transactions
│   ├── node_modules/            # Node.js dependencies
│   ├── package-lock.json        # Lock file for package versions
│   ├── package.json             # List of Node.js dependencies
│   └── server.js                # Node.js server file
├── css/
│   └── style.css                # Styling for the application
├── js/
│   └── index.js                 # Main JavaScript file with logic
├── index.html                   # Main HTML file
├── .gitignore                   # Files to be ignored by Git
└── README.md                    # This README file 
