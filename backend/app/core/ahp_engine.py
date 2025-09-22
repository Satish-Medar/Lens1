import pandas as pd
import random


def run_ahp_analysis(df):
    """
    Perform Analytic Hierarchy Process (AHP) analysis to find the best locations 
    for groundwater recharge structures.
    
    Args:
        df (pandas.DataFrame): Clean groundwater data containing columns like 
                              station_id, latitude, and longitude
    
    Returns:
        list: Top 3 stations as list of dictionaries with station_id, latitude, 
              longitude, ahp_score, and justification
    """
    
    # Define AHP criteria and their weights
    criteria_weights = {
        'slope': 0.5,           # Most important factor
        'soil_type': 0.3,       # Moderate importance
        'runoff_potential': 0.2  # Least important factor
    }
    
    # Create a copy of the DataFrame to avoid modifying the original
    analysis_df = df.copy()
    
    # Generate random scores for each criteria for every station
    # Scores range from 1 (poor) to 10 (excellent)
    analysis_df['slope_score'] = [random.randint(1, 10) for _ in range(len(analysis_df))]
    analysis_df['soil_type_score'] = [random.randint(1, 10) for _ in range(len(analysis_df))]
    analysis_df['runoff_potential_score'] = [random.randint(1, 10) for _ in range(len(analysis_df))]
    
    # Calculate the final weighted AHP score for each station
    # Formula: (slope_score * 0.5) + (soil_type_score * 0.3) + (runoff_potential_score * 0.2)
    analysis_df['ahp_score'] = (
        analysis_df['slope_score'] * criteria_weights['slope'] + 
        analysis_df['soil_type_score'] * criteria_weights['soil_type'] + 
        analysis_df['runoff_potential_score'] * criteria_weights['runoff_potential']
    )
    
    # Sort stations in descending order based on their final AHP score
    analysis_df = analysis_df.sort_values('ahp_score', ascending=False)
    
    # Select the top 3 stations
    top_stations = analysis_df.head(3)
    
    # Prepare the result list with required information
    result = []
    for _, station in top_stations.iterrows():
        # Create justification string explaining the scores
        justification = (
            f"High potential due to favorable slope (score: {station['slope_score']}) "
            f"and soil type (score: {station['soil_type_score']}) "
            f"with runoff potential score of {station['runoff_potential_score']}."
        )
        
        # Create dictionary for each top station
        station_dict = {
            'station_id': station['station_id'],
            'latitude': station['latitude'],
            'longitude': station['longitude'],
            'ahp_score': round(station['ahp_score'], 2),  # Round to 2 decimal places
            'justification': justification
        }
        
        result.append(station_dict)
    
    return result