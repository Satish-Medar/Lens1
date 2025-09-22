# Health check endpoint
from fastapi import APIRouter

# Create a new API router for health endpoints
router = APIRouter()


@router.get("/health")
def health_check():
    """
    Simple health check endpoint to verify the API is running.
    
    Returns:
        dict: Status message indicating the API is healthy
    """
    return {"status": "healthy", "message": "AquaLense API is running successfully"}