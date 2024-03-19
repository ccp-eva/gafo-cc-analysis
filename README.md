# A universal of human social cognition: Children from 17 communities process gaze in similar ways

## Abstract

Theoretical accounts assume that key features of human social cognition are universal. Here we focus on gaze following, the bedrock of social interactions and coordinated activities, to test this claim. In this comprehensive cross-cultural study spanning five continents and 17 distinct cultural communities, we examined the development of gaze following in early childhood. We identified key processing signatures through a computational model that assumes that participants follow an individual’s gaze by estimating a vector emanating from the eye-center through the pupil. Using a single reliable touchscreen-based task, we found these signatures in all communities, suggesting that children worldwide processed gaze in highly similar ways. Absolute differences in performance between groups are accounted for by a cross-culturally consistent relationship between children’s exposure to touchscreens and their performance in the task. These results provide strong evidence for a universal process underlying a foundational socio-cognitive ability in humans that can be reliably inferred even in the presence of cultural variation in overt behavior.

## Publication Links

-   [Preprint](https://#)

## Repository Structure

```         
.
├── data
    ├── gafo-cc-clean-data.csv  <-- tidy dataset
    └── README.md               <-- description of data structure

├── figures                     <-- figures in paper and supplement
├── model                       <-- data files
    ├── model-comparison.wppl   <-- code to run model comparison (incl. prior specification)
    ├── model-data              <-- data files by community with additional information for model comparison
    ├── node-moduls             <-- helper scripts for model comparison
    └── output                  <-- saved model outputs by community
        └── bf_comparison.rds   <-- saved log Bayes Factors for model comparisons by community
├── paper                       <-- reproducible manuscript file
├── saves                       <-- saved outputs
├── scripts                     <-- scripts to run cross-validation and process model outputs
└── supplement                  <-- reproducible supplemental material file
```
