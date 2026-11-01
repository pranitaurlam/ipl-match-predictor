# IPL Match Winner Predictor

Predicts IPL match winning probability using machine learning, trained on historical match data (2007-2026).

**Live dashboard:** https://frontend-gamma-three-eabsug3sbm.vercel.app
## Project Structure

```
IPL/
├── data/
│   ├── raw/            # Original matches.csv, deliveries.csv from Kaggle
│   └── processed/       # Cleaned and feature-engineered datasets
├── notebooks/
│   ├── 01_data_loading.ipynb
│   ├── 02_data_cleaning.ipynb
│   ├── 03_eda.ipynb
│   ├── 04_advanced_eda.ipynb
│   ├── 05_preprocessing.ipynb
│   ├── 06_feature_engineering.ipynb
│   └── 07_model_training.ipynb
├── images/              # Saved charts from EDA
├── models/              # Trained models and encoders
├── src/                 # Reusable Python modules
└── requirements.txt
```
## Setup

```bash
pip install -r requirements.txt
```

Dataset: [IPL 2007-2026 Complete Ball-by-Ball Dataset](https://www.kaggle.com/datasets/vedantbhavsar43/ipl-2007-to-2026-complete-ball-by-ball-dataset) (Kaggle). Fetch via `kagglehub`:

```python
import kagglehub
path = kagglehub.dataset_download("vedantbhavsar43/ipl-2007-to-2026-complete-ball-by-ball-dataset")
```

Then copy `ipl_matches.csv` → `data/raw/matches.csv` and `ipl_ball_by_ball.csv` → `data/raw/deliveries.csv`.
## Week 1 Progress

- [x] Day 1: Project setup & dataset loading
- [x] Day 2: Data cleaning
- [x] Day 3: EDA
- [x] Day 4: Advanced EDA
- [x] Day 5: Data preprocessing
- [x] Day 6: Feature engineering
- [ ] Day 7: Review & documentation

## Model Training

`notebooks/07_model_training.ipynb` trains a Logistic Regression and a Decision Tree on 5 pre-match features (who bats first, plus team1-minus-team2 overall win %, head-to-head, venue win %, and last-5 form). Models are tuned with time-series cross-validation, trained on 2008-2023 and tested on 2024-2026, then refit on all seasons and saved to `models/` (`logistic_regression.joblib`, `decision_tree.joblib`, `model_metadata.json`).

Season-by-season accuracy averages ~53% (Logistic Regression) and ~50% (Decision Tree). Team history alone barely predicts IPL results; see the notebook summary for next steps.
