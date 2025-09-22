# Main application file to initialize the FastAPI app
from fastapi import FastAPI
from .api.v1.endpoints import health
from .api.v1.endpoints import recommendations  # <-- ADD THIS LINE
from fastapi.middleware.cors import CORSMiddleware

# Initialize the FastAPI application
app = FastAPI(title="AquaLense API", version="1.0.0")

# Configure CORS to allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include the API routers
app.include_router(health.router, prefix="/api/v1", tags=["Health"])
app.include_router(recommendations.router, prefix="/api/v1", tags=["Analysis"])  # <-- ADD THIS LINE

@app.get("/")
def read_root():
    return {"message": "Welcome to the AquaLense API"}