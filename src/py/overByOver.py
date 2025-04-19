import polars as pl


def getScoreForEachOver(file_name: str, inns_num: int) -> dict:
    """Pass the csv file containing over-by-over score. Corresponding match info will be returned"""
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
    # df_info = df_data.select(['match_id','start_date','innings','batting_team','venue']).unique()
    # print(df_info)
    df_decimal_over = df_data.with_columns(
        pl.col("ball").cast(pl.Int32).alias("floats_as_integers").alias("prev_over")
    )
    df_over = df_decimal_over.with_columns(
        (pl.col("prev_over") + 1).alias("over_num")
    ).drop(["prev_over", "ball"])
    df_match = df_over.with_columns((pl.col("match_id") - 1473437).alias("id")).drop(
        ["match_id"]
    )
    df_wicket = df_match.with_columns(
        pl.when(pl.col("wicket_type").is_null()).then(0).otherwise(1).alias("wkt")
    ).drop("wicket_type")

    df_run_wicket = df_wicket.group_by(
        ["id", "start_date", "venue", "innings", "over_num", "batting_team"]
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

    df_innings = df_final.select(['innings','over_num', 'batting_team', 'total_runs', 'wkt']).filter(pl.col('innings') == inns_num)
    innings, team = df_innings.select(['innings','batting_team']).unique().rows()[0]

    over_by_over = df_innings.select(['over_num','total_runs','wkt']).to_dicts()
    dict_details = {}
    dict_details['innings'] = innings
    dict_details['batting_team'] = team
    dict_details['over_by_over'] = over_by_over
    return dict_details
