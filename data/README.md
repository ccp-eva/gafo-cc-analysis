# Data structure

`variable_name`: description

-   `subjid`: anonymized participant id
-   `community`: name of community
-   `age_group`: age group in years
-   `ageinyears`: age in years
-   `sex`: participant sex (m/f)
-   `screen`: screen in household (numeric, yes = 1, no = 0)
-   `touchscreen`: access to touchscreen (numeric, yes = 1, no = 0)
-   `household`: people living in the same household (numeric, incl. participant)
-   `children`: children living in the same household (numeric, incl. participant)
-   `younger_children`: children younger than the participant living in the same household (numeric)
-   `trialnr`: trial number starting from the first test trial (numeric)
-   `targetposition`: bin in which the balloon landed (factor, 1-10)
-   `targetcenterx`: x-coordinate of the balloon (numeric, 0 - 1920)
-   `targetcentralityx`: absolute distance of balloon's x-coordinate from the center (numeric, in pixels)
-   `clickdistfromtargetcenterx`: distance between touched location and balloon's x-coordinate (numeric, in pixels). Negative values indicate clicks to the left of the balloon, positive values to the right.
