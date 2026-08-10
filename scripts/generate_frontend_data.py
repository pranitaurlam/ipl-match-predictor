"""Generate static JSON data files for the frontend dashboard from the real,
processed IPL dataset. Run from anywhere; paths are relative to this file.

Outputs (frontend/src/data/):
  matches.json     - one row per match, minimal columns
  teams.json        - team identity + validated categorical color, ranked by matches played
  top_scorers.json  - all-time top 20 + top 15 run scorers for every season
"""
import json
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parent.parent
PROCESSED = ROOT / "data" / "processed"
RAW = ROOT / "data" / "raw"
OUT = ROOT / "frontend" / "src" / "data"
OUT.mkdir(parents=True, exist_ok=True)

# Categorical palette, fixed order, never cycled — one set per surface, since dark
# mode is *selected* (its own validated steps), not an automatic flip of dark hexes.
# Slots 1-8 are the dataviz-skill validated set (adjacent-pairs CVD-safe) for each
# mode. Slots 9-14 cover the remaining real franchises so no team is stuck on an
# indistinguishable gray; each set passes lightness, chroma, and contrast for its
# surface, but not the full all-pairs CVD floor (documented ceiling for 8+
# categorical hues) — mitigated by the visible text code on every chip/legend entry
# (the skill's "relief rule": labels stand in when color-only ID can't scale).
CATEGORICAL_DARK = [
    "#3987e5",  # 1 blue
    "#d95926",  # 2 orange
    "#199e70",  # 3 aqua
    "#c98500",  # 4 yellow
    "#d55181",  # 5 magenta
    "#008300",  # 6 green
    "#9085e9",  # 7 violet
    "#e66767",  # 8 red
    "#0e8fa8",  # 9 cyan (GT)
    "#6f8f10",  # 10 olive (LSG)
    "#c026d3",  # 11 fuchsia (PWI)
    "#a8530d",  # 12 amber (RPS)
    "#4a5fd6",  # 13 indigo (GL)
    "#c2185b",  # 14 crimson (KTK)
]
CATEGORICAL_LIGHT = [
    "#2a78d6",  # 1 blue
    "#eb6834",  # 2 orange
    "#1baf7a",  # 3 aqua
    "#eda100",  # 4 yellow
    "#e87ba4",  # 5 magenta
    "#008300",  # 6 green
    "#4a3aa7",  # 7 violet
    "#e34948",  # 8 red
    "#0089a3",  # 9 cyan (GT)
    "#5c7a0d",  # 10 olive (LSG)
    "#8e1f9e",  # 11 fuchsia (PWI)
    "#9c3d0a",  # 12 amber (RPS)
    "#4550c9",  # 13 indigo (GL)
    "#a01450",  # 14 crimson (KTK)
]
MUTED_COLOR_DARK = "#5b5a56"  # fallback if a 15th team ever appears
MUTED_COLOR_LIGHT = "#8a8880"

TEAM_CODES = {
    "Mumbai Indians": "MI",
    "Chennai Super Kings": "CSK",
    "Kolkata Knight Riders": "KKR",
    "Royal Challengers Bengaluru": "RCB",
    "Sunrisers Hyderabad": "SRH",
    "Delhi Capitals": "DC",
    "Rajasthan Royals": "RR",
    "Punjab Kings": "PBKS",
    "Gujarat Titans": "GT",
    "Lucknow Super Giants": "LSG",
    "Gujarat Lions": "GL",
    "Kochi Tuskers Kerala": "KTK",
    "Pune Warriors India": "PWI",
    "Rising Pune Supergiants": "RPS",
}


def main():
    matches = pd.read_csv(PROCESSED / "matches_cleaned.csv", parse_dates=["date"])

    # --- teams.json: rank by matches played, assign fixed categorical colors per surface ---
    played = pd.concat([matches["team1"], matches["team2"]]).value_counts()
    teams = []
    for rank, (name, count) in enumerate(played.items()):
        in_range = rank < len(CATEGORICAL_DARK)
        teams.append({
            "name": name,
            "code": TEAM_CODES.get(name, name[:3].upper()),
            "colorDark": CATEGORICAL_DARK[rank] if in_range else MUTED_COLOR_DARK,
            "colorLight": CATEGORICAL_LIGHT[rank] if in_range else MUTED_COLOR_LIGHT,
            "matches": int(count),
        })
    (OUT / "teams.json").write_text(json.dumps(teams, indent=2))

    # --- matches.json: minimal columns, one row per match ---
    matches_out = matches[[
        "id", "date", "season", "city", "venue",
        "team1", "team2", "toss_winner", "toss_decision", "winner", "player_of_match",
    ]].copy()
    matches_out["date"] = matches_out["date"].dt.strftime("%Y-%m-%d")
    matches_out = matches_out.rename(columns={
        "toss_winner": "tossWinner",
        "toss_decision": "tossDecision",
        "player_of_match": "playerOfMatch",
    })
    matches_out.to_json(OUT / "matches.json", orient="records", indent=2)

    # --- top_scorers.json: all-time + per-season leaderboards, computed once from
    # deliveries.csv (not shipped raw, 69MB) so recent breakout players (e.g. a 2025
    # debutant) aren't buried under career totals from 15+ year veterans, and every
    # season is browsable rather than just "current".
    deliveries_path = RAW / "deliveries.csv"
    if deliveries_path.exists():
        deliveries = pd.read_csv(
            deliveries_path, usecols=["batter", "batter_runs", "season"],
            dtype={"batter_runs": "int64"}, low_memory=False,
        )
        deliveries["season"] = deliveries["season"].astype(str).str.split("/").str[0].astype(int)
        latest_season = int(deliveries["season"].max())

        def top_scorers(df, n):
            return (
                df.groupby("batter")["batter_runs"].sum()
                .sort_values(ascending=False)
                .head(n)
                .reset_index()
                .rename(columns={"batter": "name", "batter_runs": "runs"})
                .to_dict(orient="records")
            )

        all_time = top_scorers(deliveries, 20)
        by_season = {
            str(season): top_scorers(group, 15)
            for season, group in deliveries.groupby("season")
        }

        (OUT / "top_scorers.json").write_text(json.dumps({
            "allTime": all_time,
            "bySeason": by_season,
            "currentSeasonYear": latest_season,
        }, indent=2))
        print(f"top_scorers.json: {len(all_time)} all-time, {len(by_season)} seasons")
    else:
        print(f"{deliveries_path} not found — skipping top_scorers.json")

    print(f"teams.json: {len(teams)} teams")
    print(f"matches.json: {len(matches_out)} matches")


if __name__ == "__main__":
    main()
