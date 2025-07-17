from fastapi import FastAPI 
import os
from supabase import create_client, Client


url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
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