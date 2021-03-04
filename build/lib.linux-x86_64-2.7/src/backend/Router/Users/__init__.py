from firebase_admin import credentials
from firebase_admin import initialize_app

cred = credentials.Certificate("./facetory_creds.json")
fb_ctx = initialize_app(cred)