six_fold_cross_validation <- function(data, m1, m2, m3, repeats) {
  
  
  N_ids = n_distinct(data$subjid)
  #Prepare results DF
  
  #Repeat the whole shebang several times
  for(i in 1:repeats) {
    
    # Split dataset into 6 bins
    bin_data <- data%>%distinct(community, subjid)%>%group_by(community) %>% mutate(bin = rep(sample(c(1:6),size = 6,replace = FALSE), length.out = n()))
    
    for(j in 1:6) {
      # Use bin j as "hold out" data
      testing_ids <- bin_data%>%filter(bin == j)%>%pull(subjid)
      training_ids <- bin_data%>%filter(bin != j)%>%pull(subjid)
      # Safety check - is partition complete and disjoint?
      stopifnot(length(testing_ids) + length(training_ids) == N_ids)
      stopifnot(length(intersect(testing_ids, training_ids)) == 0)
      # Create two separate dataframes
      testing_data <- filter(data, subjid %in% testing_ids)
      training_data <- filter(data, subjid %in% training_ids)
      
      # Train models
      up_m1 <- update(m1, newdata=training_data, cores=4,backend = "cmdstanr", threads = threading(8))
      up_m2 <- update(m2, newdata=training_data, cores=4,backend = "cmdstanr", threads = threading(8))
      up_m3 <- update(m3, newdata=training_data, cores=4,backend = "cmdstanr", threads = threading(8))
      
      
      # Sample predictions
      preds_m1 <- posterior_predict(up_m1, newdata=testing_data, allow_new_levels=TRUE, sample_new_levels="gaussian")
      preds_m2 <- posterior_predict(up_m2, newdata=testing_data, allow_new_levels=TRUE, sample_new_levels="gaussian")
      preds_m3 <- posterior_predict(up_m3, newdata=testing_data, allow_new_levels=TRUE, sample_new_levels="gaussian")
      
      # Evaluate predictive accuracy
      score_m1 <- mean(sqrt(colMeans((testing_data$click - t(preds_m1))**2)))
      score_m2 <- mean(sqrt(colMeans((testing_data$click - t(preds_m2))**2)))
      score_m3 <- mean(sqrt(colMeans((testing_data$click - t(preds_m3))**2)))
      
      m1_name <-  as.character(substitute(m1))
      m2_name <-  as.character(substitute(m2))
      m3_name <-  as.character(substitute(m3))
      
      # Record results
      row <- tibble(     repeats = i, 
                         bin = j,
                         
                         m1_score = score_m1,
                         m2_score = score_m2,
                         m3_score = score_m3,
                         
                         m3_beats_m2 = m3_score < m2_score,
                         m3_beats_m1 = m3_score < m1_score,
                         m2_beats_m1 = m2_score < m1_score,
                         
                         m1  = m1_name,
                         m2 = m2_name,
                         m3 = m3_name,
                         
      )
      
      results <- bind_rows(results, row)
      
      saveRDS(results, "../saves/cross_validation_result.rds")
    }
  }
  return(results)
}