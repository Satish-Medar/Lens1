# Recommendations API endpoints for groundwater analysis
from fastapi import APIRouter
import pandas as pd
from app.core.ahp_engine import run_ahp_analysis

# Create a new API router for recommendations endpoints
router = APIRouter()

# Define the path to the clean data file (relative to backend directory)
DATA_FILE_PATH = "../data/clean_anantpur_data.csv"


@router.get("/district-data")
def get_district_data():
    """
    Endpoint to retrieve clean groundwater data from CSV file.
    
    Returns:
        dict: JSON object containing the groundwater data
    """
    # Read the CSV file into a pandas DataFrame
    df = pd.read_csv(DATA_FILE_PATH)
    
    # Convert DataFrame to JSON format and return
    return df.to_dict(orient="records")


@router.get("/recommendations")
def get_recommendations():
    """
    Endpoint to get AHP analysis recommendations for best groundwater recharge locations.
    
    Returns:
        dict: JSON object containing top 3 recommended stations with AHP scores and justifications
    """
    # Read the clean groundwater data from CSV file
    df = pd.read_csv(DATA_FILE_PATH)
    
    # Pass the DataFrame to the AHP analysis function
    recommendations = run_ahp_analysis(df)
    
    # Return the analysis results
    return {"recommendations": recommendations}