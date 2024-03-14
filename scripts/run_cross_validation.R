library(tidyverse)
library(brms)

mdata <- read_csv("../data/mdata.csv")

bm_null <- readRDS("../saves/bm_cv_null.rds")
bm_cult <- readRDS("../saves/bm_cv_cult.rds")
bm_cult_age <- readRDS("../saves/bm_cv_cult_age.rds")

source("cross_validation.R")

results <- tibble()

cv_cult <- six_fold_cross_validation(mdata, bm_null, bm_cult, bm_cult_age, 100)

saveRDS(cv_cult, "../saves/cross_validation.rds")