# Stock Alert Backend

This is a Flask-based web application that allows users to set up alerts for certain stocks and receive notifications when the stock price hits a certain threshold. The application fetches the latest stock price data using the `yfinance` Python module and sends notifications via email or SMS.

## Features

* Add a new alert with a ticker symbol, price threshold, frequency, and notification method (email or SMS).
* View a list of current alerts with their corresponding current prices and price changes since opening.
* Delete an alert from the list.
* Non-Persistent Server-side data storage using Python lists.

## Prerequisites

- Python 3.6 or later installed on your system
- Git installed on your system
- A virtual environment installed on your system

## Installation

1. Clone this repository using the command: `git clone git@github.com:Bishadkoju/StockAlert.git`

2. Navigate to the cloned directory using the command: `cd StockAlert/Backend`

3. Create a new virtual environment using the command: `python -m venv venv`

4. Activate the virtual environment using the command:

   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`

5. Install the required dependencies using the command: `pip install -r requirements.txt`

## Running the Application

1. Start the Flask application by running the command: `python app.py`

2. Open your web browser and go to `http://localhost:8000`

3. The home page will display OK.

## API Access

The StockAlert Backend provides a simple API for getting and adding alerts to the system.

### Get Alert Data

To get the data for all alerts, send a GET request to the `/get_data` endpoint. The response will be a JSON object containing the data for all alerts, including their ticker symbol, price threshold, frequency, notification method, current price, and price change.

### Add an Alert

To add a new alert, send a POST request to the `/add_alert` endpoint with the following parameters in the request body:

* `ticker`: The ticker symbol of the stock to monitor.
* `threshold`: The price threshold at which to trigger the alert.
* `threshold_type`: Whether the alert should be triggered when the price goes above (`1`) or below (`-1`) the threshold.
* `frequency`: The frequency at which to check the stock price (in minutes).
* `contact_id`: The ID of the user to notify when the alert is triggered.
* `notification_method`: The method of notification to use (either `email` or `sms`).

### Delete an Alert

To delete an alert, send a GET request to the `/delete_alert/<alert_id>` endpoint, where `alert_id` is the ID of the alert to delete.

## Functions

### `fetch_current_prices()`

This function fetches the latest stock price data from `yfinance` and stores it in the `current_prices` global variable. It also updates the `change_prices` global variable to reflect the change in price since the market opened.

### `send_email(message)`

This function sends an email with the specified message to the email address associated with the user's account.

### `send_sms(message)`

This function sends an SMS with the specified message to the phone number associated with the user's account.

### `/tick`

This endpoint acts as the counter. It should be triggered every 1 minute.It is responsible for fetching the latest data from yfinance API, checking the current stock prices and triggering alerts if necessary. It updates the `current_prices` and `change_prices` global variables and checks each alert to see if it should be triggered. If an alert is triggered, it sends a notification using the specified method.

### `/get_data`

This endpoint returns a JSON object containing the data for all alerts, including their ticker symbol, price threshold, frequency, notification method, current price, and price change.

### `/home`

This endpoint returns the home page of the Flask Stock Alert System web application.

### `/add_alert`

This endpoint is responsible for adding a new alert to the system. It takes the necessary parameters from the request body and adds the alert to the `alerts` global variable.

### `/delete_alert/<alert_id>`

This endpoint is responsible for deleting an alert from the system. It takes the alert ID as a parameter and removes the corresponding alert from the `alerts` global variable.
