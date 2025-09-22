# AquaLense Project - Full Stack Groundwater Analysis Application

## Overview
A full-stack groundwater analysis application with React frontend and FastAPI backend for data preprocessing and AHP (Analytic Hierarchy Process) recommendations for optimal groundwater recharge structure locations.

## Files Created
- `data_preprocessor.py` - Main data cleaning script
- `data/` - Directory for input and output CSV files
- `backend/app/main.py` - FastAPI application entry point
- `backend/app/core/ahp_engine.py` - AHP analysis engine for location recommendations
- `backend/app/api/v1/endpoints/recommendations.py` - API endpoints for data and recommendations
- `backend/app/api/v1/endpoints/health.py` - Health check endpoint

## Usage
1. Place your messy CSV file at `data/messy_anantpur_data.csv`
2. Run the script: `python data_preprocessor.py`
3. The cleaned data will be saved to `data/clean_anantpur_data.csv`

## Data Cleaning Operations
- Auto-detects water level column (looks for 'water_level', 'depth', 'level', 'mbgl', etc.)
- Shows available columns and which column is being used for cleaning
- Removes rows with missing or blank water level values
- Converts non-numeric values to numeric (handling text/mixed data)
- Removes rows with negative water level values (like -9999)
- Preserves all other data columns and rows

## Dependencies
- Python 3.11
- pandas library
- FastAPI framework
- Uvicorn ASGI server

## API Endpoints
- `GET /` - Welcome message
- `GET /api/v1/health` - Health check
- `GET /api/v1/district-data` - Retrieve clean groundwater data as JSON
- `GET /api/v1/recommendations` - Get top 3 AHP-ranked locations for groundwater recharge structures
- `GET /docs` - Interactive API documentation (Swagger UI)

## Project Architecture
- **Frontend**: React with Vite (runs on port 5000)
- **Backend**: FastAPI with uvicorn (runs on port 8000) 
- **Data Processing**: Python pandas for CSV cleaning
- **Analysis Engine**: AHP (Analytic Hierarchy Process) for location recommendations

## Running the Application
The application is configured with two workflows:
1. **Frontend**: `cd frontend && npm run dev` (React app on port 5000)
2. **Backend**: `cd backend && uvicorn app.main:app --host localhost --port 8000 --reload` (FastAPI on port 8000)

## Deployment Configuration
- **Target**: Autoscale deployment
- **Build**: `cd frontend && npm run build`
- **Run**: Both backend (port 8000) and frontend (port 5000) services

## Recent Changes
- 2025-09-22: Created initial data preprocessing script with pandas-based CSV cleaning functionality
- 2025-09-22: Fixed application startup issues - added sample input data file and configured workflow. Application now runs successfully and processes data correctly.
- 2025-09-22: Created FastAPI backend with AHP analysis engine and REST API endpoints. Includes /district-data and /recommendations endpoints for groundwater analysis.
- 2025-09-22: **Project Import Completed**: Successfully imported and configured full-stack application in Replit environment with both React frontend and FastAPI backend running properly.