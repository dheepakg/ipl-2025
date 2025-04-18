import json
import polars as pl


with open("teams.json", "r") as file:
    team_name = json.load(file)


def getMatchInfo(match_id: str) -> dict:
    """
    Get match info for a given match ID.
    """
    # Read the CSV file
    df_csv = pl.read_csv(match_id)

    # Select relevant columns
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

    # Select unique match info
    df_info = df_data.select(
        ["match_id", "start_date", "innings", "batting_team", "venue"]
    ).unique()
    
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
    return dict_match_info


print(getMatchInfo("1473438.csv"))
