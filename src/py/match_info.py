import polars as pl
import math
import json

# Configure Polars
cfg = pl.Config()
cfg.set_tbl_rows(50)


file_name = "./../../data/1473438.csv"
file_name = "./1473438.csv"

df_csv = pl.read_csv(file_name)

df_data = df_csv.select(
    [
        "match_id",
        "start_date",
        "venue",
        "innings",
        "ball",
        "batting_team",
        "runs_off_bat",
        "extras",
        "wicket_type",
    ]
)

df_info = df_data.select(
    ["match_id", "start_date", "innings", "batting_team", "venue"]
).unique()

df_decimal_over = df_data.with_columns(
    pl.col("ball").cast(pl.Int32).alias("floats_as_integers").alias("prev_over")
)
df_over = df_decimal_over.with_columns(
    (pl.col("prev_over") + 1).alias("over_num")
).drop(["prev_over", "ball"])

df_wicket = df_over.with_columns(
    pl.when(pl.col("wicket_type").is_null()).then(0).otherwise(1).alias("wkt")
).drop("wicket_type")

df_run_wicket = df_wicket.group_by(
    ["match_id", "start_date", "venue", "innings", "over_num", "batting_team"]
).agg(
    pl.col("runs_off_bat").sum().alias("runs"),
    pl.col("extras").sum().alias("extras"),
    pl.col("wkt").sum().alias("wkt"),
)

df_final = (
    df_run_wicket.with_columns(
        (pl.col("runs") + pl.col(["extras"])).alias("total_runs")
    )
    .drop(["extras", "runs"])
    .sort("innings", "over_num")
)

team_name = {
    "Royal Challengers Bengaluru": "RCB",
    "Kolkata Knight Riders": "KKR",
    "Sunrisers Hyderabad": "SRH",
    "Rajasthan Royals": "RR",
    "Delhi Capitals": "DC",
    "Chennai Super Kings": "CSK",
    "Mumbai Indians": "MI",
    "Lucknow Super Giants": "LSG",
    "Punjab Kings": "PBKS",
    "Gujarat Titans": "GT",
}

match_num, venue = df_info.select(["match_id", "venue"]).unique().rows()[0]

teams = df_info.select(["batting_team"]).rows()

team1 = teams[0][0]
team2 = teams[1][0]

dict_match_info = {}
dict_match_info[match_num - 1473437] = {
    "venue": venue,
    "team1": {"name": team_name[team1], "winner": True},
    "team2": {"name": team_name[team2], "winner": False},
    "details": [],
}

print(dict_match_info)
