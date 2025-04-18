import polars as pl

def getScoreForEachOver(file_name:str)->dict:
    """Pass the csv file containing over-by-over score. Corresponding match info will be returned
    """
    df_csv = pl.read_csv(file_name)
    df_data = df_csv.select(['match_id','start_date','venue','innings','ball','batting_team','runs_off_bat','extras','wicket_type'])
    # df_info = df_data.select(['match_id','start_date','innings','batting_team','venue']).unique()
    # print(df_info)
    df_decimal_over = df_data.with_columns( pl.col("ball").cast(pl.Int32).alias("floats_as_integers").alias('prev_over')  )
    df_over = df_decimal_over.with_columns((pl.col('prev_over')+1).alias('over_num')).drop(['prev_over','ball'])
    df_match = df_over.with_columns((pl.col('match_id')-1473437).alias('id')).drop(['match_id'])
    df_wicket = df_match.with_columns(
                pl.when( pl.col('wicket_type').is_null()).then(0).otherwise(1).alias('wkt')
                ).drop('wicket_type')

    df_run_wicket = df_wicket.group_by(
                ['id', 'start_date', 'venue', 'innings', 'over_num', 'batting_team']).agg(
            pl.col('runs_off_bat').sum().alias('runs'),
            pl.col('extras').sum().alias('extras'),
            pl.col('wkt').sum().alias('wkt')
            )

    df_final = df_run_wicket.with_columns((pl.col('runs')+pl.col(['extras'])).alias('total_runs')).drop(['extras','runs']).sort('innings','over_num')
    print(df_final)

getScoreForEachOver('1473438.csv')
