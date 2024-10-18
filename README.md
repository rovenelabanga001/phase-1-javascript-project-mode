# Personal Expenditure Tracker SPA

This is a **Personal Expenditure Tracker** Single Page Application (SPA) built using vanilla JavaScript. The application allows users to track their income and expenses, edit transactions, delete transactions, and view a summary of their transactions. It is designed to store data using [JSONBin.io](https://jsonbin.io), and all interactions with the transaction data are managed via API requests.

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
- **JSONBin.io**: A RESTful JSON storage platform used to store and retrieve transaction data.
- **Font Awesome**: For icons used in the application.

## Getting Started

### Prerequisites

Before starting, make sure you have the following:

- A modern web browser (Chrome, Firefox, Edge, etc.).
- A free account on [JSONBin.io](https://jsonbin.io) to create a bin for storing your transactions.
- A basic understanding of JavaScript and APIs.

### Setup

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/personal-expenditure-tracker.git
    cd personal-expenditure-tracker
    ```

2. **Install Dependencies**:
   No additional libraries or dependencies are required, as this is a pure vanilla JavaScript project.

3. **Configure the `.env` file**:
    - Create a `.env` file in the root of your project and store your JSONBin.io **master key** in it.

    Example `.env` file:
    ```bash
    MASTER_KEY=$2a$10$MHsSpY2gHAq11VZl9Nddm.WlG/dDKeM18xXslTF.E1I7vvkoPAb.y
    ```

4. **Configure Your JSONBin URL**:
    - Replace the `baseURL` in the code with your **private JSONBin URL**.

    Example:
    ```javascript
    const baseURL = "https://api.jsonbin.io/v3/b/your-bin-id"; // Your private bin URL
    ```

5. **Run the Application**:
    - Open the `index.html` file in your browser to view and interact with the expenditure tracker.

## Project Structure

```bash
├── css/
│   └── style.css        # Styling for the application
├── js/
│   └── script.js        # Main JavaScript file with logic
├── index.html           # Main HTML file
├── .env                 # Environment file (not pushed to GitHub)
└── README.md            # This README file
