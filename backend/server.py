from fastapi import FastAPI 
import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()


url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

app = FastAPI()

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