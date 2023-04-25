from flask import Flask, request, redirect, jsonify
import yfinance as yf
from nanoid import generate
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, supports_credentials=True)

ticker_list = [  "AAPL",  "MSFT",  "AMZN",  "GOOGL",  "INTC",  "CSCO",  "PFE",    "DIS",  "NKE", "TSLA"]
ticker_string = " ".join(ticker_list)
global current_prices
current_prices={}
change_prices={}
global alerts
alerts = []

def send_email(message):
    print("Email")
    print(message)

def send_sms(message):
    print("SMS")
    print(message)



@app.route('/tick')
def fetch_current_prices():
    tickers = yf.Tickers(ticker_string)
    global current_prices
    global alerts
    global change_prices
    for ticker in ticker_list:
        info = tickers.tickers[ticker].info
        current_prices[ticker] = info['currentPrice']
        change_prices[ticker] = info['currentPrice'] - info['open']
    print(current_prices)
    for alert in alerts:
        alert['counter']+=1
        print(alert['counter'])
        print(alert['frequency'])
        if(alert['counter'] >= int(alert['frequency'])):
            print("Handle")
            stock = alert['ticker']
            threshold = float(alert['threshold'])
            threshold_type = alert['threshold_type']
            notification_method = alert['notification_method']
            current_price = float(current_prices[stock])
            message = ""
            if(threshold_type == '1' and threshold<current_price):
                message = f'{stock} price has exceeded ${threshold}'
            if(threshold_type == '-1' and threshold > current_price):
                message = f'{stock} price has fallen below ${threshold}'
            
            if(message !=""):
                if(notification_method == 'email'):
                    send_email(message)
                elif(notification_method) == 'sms':
                    send_sms(message)
                else:
                    Exception("invalid notification method")
            alert['counter'] = 0

    return ("tock")

@app.route('/get_data')
def get_data():
    global current_prices
    global alerts
    global change_prices
    data = {"alerts": alerts, "current_prices": current_prices, "change_prices": change_prices}
    
    return jsonify(data)

@app.route('/')
def home():
    global current_prices
    print(current_prices)
    return("OK")

@app.route('/add_alert', methods=['POST'])
def add_alert():
    ticker = request.form['ticker']
    threshold = float(request.form['threshold'])
    threshold_type =request.form['threshold_type']
    frequency = request.form['frequency']
    contact_id = request.form['contact_id']
    notification_method = request.form['notification_method']
    global alerts

    alert_data = {
        'id': generate(size=10),
        'ticker': ticker,
        'threshold': threshold,
        "threshold_type": threshold_type,
        'frequency': frequency,
        "contact_id": contact_id,
        'notification_method': notification_method,
        'counter': 0
    }
    print(alert_data)
    alerts.append(alert_data)
    return get_data()

@app.route('/delete_alert/<string:id>')
def delete_alert(id):
    global alerts
    alerts = [x for x in alerts if x['id']!=id]
    return get_data()

if __name__ == '__main__':
    fetch_current_prices()
    app.run(host='0.0.0.0', port=8000, debug=True)
