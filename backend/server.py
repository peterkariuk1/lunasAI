from fastapi import FastAPI,Request,HTTPException,File, UploadFile
import os
from dotenv import load_dotenv
from supabase import create_client, Client
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google.cloud import vision
from fastapi.responses import JSONResponse
import shutil

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./lunasserviceaccount.json"



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


def detect_text_from_image(image_path):
    """Detects text in the image file."""
    client = vision.ImageAnnotatorClient()

    with open(image_path, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content)
    response = client.text_detection(image=image)
    texts = response.text_annotations

    if texts:
        return texts[0].description
    else:
        return "No text detected."
    


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
    username: str
    password: str
    
@app.post('/sign_up')
def signup_user(data: signUpRequest):
    try:
        result = supabase.auth.sign_up(
         {
        "email": data.email,
        "password": data.password,
        "options": {"data": {"username":  data.username}},
         }
        )
        if result.session:
            return {
                "success": True,
                "access_token": result.session.access_token,
                "refresh_token": result.session.refresh_token,
                "user": result.user
            }
        return  {
            "success":True,
            "message": "Sign up complete. Please check your email to confirm",
        }
    except Exception as e:
        return{"success": False, "error": str(e)}
    
    
   
    
class loginRequest(BaseModel):
    email:str 
    password:str 
    
@app.post("/login")
def login_user(data: loginRequest):
    try:
        result = supabase.auth.sign_in_with_password(
            {
                "email": data.email,
                "password": data.password
            }
        )
        return{"success": True, "message": "Login successful"}
    except Exception as e:
        return{"success": False, "error": str(e)}

@app.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    temp_path = f"./temp_{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text_result = detect_text_from_image(temp_path)
    print(temp_path)
    os.remove(temp_path)
    print(text_result)

    return JSONResponse(content={"detected_text": text_result})  

        
   
        
            