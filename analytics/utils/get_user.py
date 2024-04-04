import jwt
import os

def get_username_from_jwt(request):
    # Assuming the JWT token is in the Authorization header
    auth_header = request.headers.get('Authorization')
    if auth_header:
        try:
            # Extract the token part from the header
            token = auth_header.split(" ")[1]
            # Decode the JWT token
            decoded = jwt.decode(token, os.getenv('JWT_SECRET_KEY'), algorithms=["HS256"])
            # Extract the username from the token payload
            return decoded.get('username')
        except jwt.ExpiredSignatureError:
            # Handle expired token
            return None
        except jwt.InvalidTokenError:
            # Handle invalid token
            return None
    return None