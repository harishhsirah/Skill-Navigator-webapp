from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Can restrict to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# MongoDB connection
client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client['skill-navigator']
users_collection = db['Student-DB']

# Helper to convert MongoDB BSON ObjectId to string
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

class User(BaseModel):
    name: str
    email: str
    password: str
    skills: list[str] = []  # Add this line
    interested_domains: list[str] = []  # And this line

@app.get("/login/")
async def login_user(email: str, password: str):
    user = await users_collection.find_one({"email": email, "password": password})
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {"message": "Login successful", "user": {"email": user["email"], "name": user["name"]}}

@app.get("/user/{email}")
async def get_user_details(email: str):
    user = await users_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"name": user["name"], "skills": user.get("skills", [])}


@app.post("/register/")
async def register_user(user: User):
    user_dict = user.dict()
    # Check if user already exists
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    result = await users_collection.insert_one(user_dict)
    return {"id": str(result.inserted_id), "message": "User registered successfully"}





@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse("favicon.ico")