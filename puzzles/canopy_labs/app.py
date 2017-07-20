# mongodb://ktruong:ktruong@ds157702.mlab.com:57702/canopy_test
import datetime
from flask import request, url_for
from flask.ext.api import FlaskAPI, status, exceptions
from flask_pymongo import PyMongo
import requests


app = FlaskAPI(__name__)
mongo = PyMongo(app, config_prefix='MONGOTIME')
app.config['MONGOTIME_HOST'] = 'mongodb://ktruong:ktruong@ds157702.mlab.com:57702/canopy_test'
app.config['MONGOTIME_PORT'] = 57702
app.config['MONGOTIME_DBNAME'] = 'canopy_test'
google_api_key = 'AIzaSyD9XTc6eSisK4Qgy37RHMOE3MlFLUjwFu0'  # NOTE: save in .env with python-dotenv


@app.route('/<string:postal>', methods=['GET'])
def get_postal_code(postal):
    if request.method == 'GET' and postal:
        # postal_info = mongo.db.MONGOTIME.find_one_or_404(postal)
        # return postal_info

        # Get latitude, longitude
        zippo_request = requests.get('http://api.zippopotam.us/us/{}'.format(postal))
        if zippo_request and int(zippo_request.status_code) <= 300:
            json_data = zippo_request.json()
            zip_code = json_data.get('post code', None)
            latitude = json_data.get('places', {})[0].get('latitude')  # string format that can be negative
            longitude = json_data.get('places', {})[0].get('longitude')
            timestamp = datetime.datetime.now().timestamp()
            # Get timezone
            google_request_string = 'https://maps.googleapis.com/maps/api/timezone/json?location={0},{1}&timestamp={2}&key={3}'.format(latitude, longitude, timestamp, 'AIzaSyD9XTc6eSisK4Qgy37RHMOE3MlFLUjwFu0')
            google_request = requests.get(google_request_string)
            if google_request and google_request.status_code <= 300:
                time_zone_name = google_request.json().get('timeZoneName', None)

            response = {
                'time_zone_name': time_zone_name,
                'latitude': latitude,
                'longitude': longitude,
                'zip_code': zip_code,
            }

            from IPython import embed; embed();

            # mongo.db.save(response)

            return response

        return {'Nope': 'Noped'}


if __name__ == '__main__':
    app.run()
