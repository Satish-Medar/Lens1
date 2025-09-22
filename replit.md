# Data Preprocessor Project

## Overview
A standalone Python script for cleaning water level data from CSV files. The script removes invalid data entries and saves cleaned results.

## Files Created
- `data_preprocessor.py` - Main data cleaning script
- `data/` - Directory for input and output CSV files

## Usage
1. Place your messy CSV file at `data/messy_anantpur_data.csv`
2. Run the script: `python data_preprocessor.py`
3. The cleaned data will be saved to `data/clean_anantpur_data.csv`

## Data Cleaning Operations
- Removes rows with missing or blank `water_level_mbgl` values
- Removes rows with negative `water_level_mbgl` values (like -9999)
- Preserves all other data columns and rows

## Dependencies
- Python 3.11
- pandas library

## Recent Changes
- 2025-09-22: Created initial data preprocessing script with pandas-based CSV cleaning functionality