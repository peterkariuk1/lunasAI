from fastapi import FastAPI 
import os
from dotenv import load_dotenv
from supabase import create_client, Client
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
load_dotenv()


origins = [
    "http://localhost:5173",        
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            
    allow_credentials=True,
    allow_methods=["*"],             
    allow_headers=["*"],              
)

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

@app.get('/')
def root():
    return{"Server status" : "Running successfully"}

response = (
    supabase.table("patient_records")
    .select("*")
    .execute()
)

@app.get("/patient")
def get_patient():
    return(response)
print(response)

class signUpRequest(BaseModel):
    email: str
    password: str
    
@app.post('/sign_up')
def signup_user(data: signUpRequest):
    try:
        result = supabase.auth.sign_up(
         {
        "email": data.email,
        "password": data.password,
         }
        )
        if result.session:
            return {
                "success": True,
                "access_token": result.session.access_token,
                "refresh_token": result.session.refresh_token,
                "user": result.user
            }
        return  {"success":True, "message": "Sign up complete. Please check your email to confirm"}
    except Exception as e:
        return{"success": False, "error": str(e)}