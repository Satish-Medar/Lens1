# AquaLense API Project

## Overview
A FastAPI-based backend application for groundwater analysis with data preprocessing and AHP (Analytic Hierarchy Process) recommendations for optimal groundwater recharge structure locations.

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

## Recent Changes
- 2025-09-22: Created initial data preprocessing script with pandas-based CSV cleaning functionality
- 2025-09-22: Fixed application startup issues - added sample input data file and configured workflow. Application now runs successfully and processes data correctly.
- 2025-09-22: Created FastAPI backend with AHP analysis engine and REST API endpoints. Includes /district-data and /recommendations endpoints for groundwater analysis.