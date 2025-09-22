import pandas as pd

# Read the CSV file
df = pd.read_csv('data/messy_anantpur_data.csv')

# Remove rows where water_level_mbgl is missing or blank
df = df.dropna(subset=['water_level_mbgl'])

# Remove rows where water_level_mbgl is negative (physically impossible values like -9999)
df = df[df['water_level_mbgl'] >= 0]

# Save the cleaned data
df.to_csv('data/clean_anantpur_data.csv', index=False)

# Print success message
print("Data cleaning complete. Clean file saved to data/clean_anantpur_data.csv")