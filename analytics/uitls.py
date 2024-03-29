def calculate_1rm(reps, weight):
    rep_to_percentage = {
    1: 100, 2: 97, 3: 94, 4: 92, 5: 89, 6: 86, 7: 83, 8: 81, 9: 78, 10: 75,
    11: 73, 12: 71, 13: 70, 14: 68, 15: 67, 16: 65, 17: 64, 18: 63, 19: 61, 20: 60,
    21: 59, 22: 58, 23: 57, 24: 56, 25: 55, 26: 54, 27: 53, 28: 52, 29: 51, 30: 50
    }
    percentage = rep_to_percentage.get(reps, 100) / 100.0
    return weight / percentage