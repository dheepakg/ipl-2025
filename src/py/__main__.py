from py.matchInfo import getMatchInfo
from py.overByOver import getScoreForEachOver
import json

from pathlib import Path

data_file_path = Path("../data/")
output_file_path = Path("../data/result.json")

files = list(data_file_path.glob("*.csv"))

# print(files[0].name)

dict_match_info = dict()

for csv_file in files:
    ipl_match_num = int(csv_file.name.split(".")[0]) - 1473437
    dict_match_info[ipl_match_num] = None
    dict_info = getMatchInfo(csv_file)
    # dict_match_info.update({ipl_match_num: getMatchInfo(csv_file)})

    inns_details = [getScoreForEachOver(csv_file, 1), getScoreForEachOver(csv_file, 2)]

    dict_info.update({"details": inns_details})
    # print(dict_info)
    dict_match_info.update({ipl_match_num: dict_info})


print(dict_match_info)

with open(output_file_path, "w") as fp:
    json.dump(dict_match_info, fp)
