import pandas as pd

# Read the CSV file
df = pd.read_csv('data/messy_anantpur_data.csv')

# Check available columns and find the water level column
print("Available columns in CSV:", df.columns.tolist())

# Look for water level column (try common naming patterns)
water_level_col = None
possible_names = ['water_level_mbgl', 'water_level', 'depth', 'level', 'mbgl', 'water_depth']

for col in df.columns:
    if any(name.lower() in col.lower() for name in possible_names):
        water_level_col = col
        break

if water_level_col is None:
    print("Error: Could not find water level column.")
    print("Please ensure your CSV has a column with 'water_level', 'depth', 'level', or similar name.")
    print("Available columns:", df.columns.tolist())
    exit(1)

print(f"Using column '{water_level_col}' as water level data")

# Remove rows where water level is missing or blank
df = df.dropna(subset=[water_level_col])

# Convert to numeric, replacing any non-numeric values with NaN
df[water_level_col] = pd.to_numeric(df[water_level_col], errors='coerce')

# Remove rows where water level is negative (physically impossible values like -9999)
df = df[df[water_level_col] >= 0]

# Remove any remaining NaN values
df = df.dropna(subset=[water_level_col])

# Save the cleaned data
df.to_csv('data/clean_anantpur_data.csv', index=False)

# Print success message
print("Data cleaning complete. Clean file saved to data/clean_anantpur_data.csv")