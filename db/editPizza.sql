update pizza set 
    slices = $1, 
    description=$2 
where id = $3;
